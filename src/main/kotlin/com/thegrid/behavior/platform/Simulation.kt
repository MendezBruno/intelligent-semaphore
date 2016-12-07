package com.thegrid.behavior.platform

import com.googlecode.objectify.Objectify
import com.googlecode.objectify.ObjectifyService
import com.thegrid.behavior.model.CongestionLevel
import com.thegrid.behavior.model.EgressNode
import com.thegrid.behavior.model.EntryNode
import com.thegrid.behavior.services.MapStateMemory
import com.thegrid.behavior.model.Map
import com.thegrid.communication.model.Resultado
import com.thegrid.communication.controller.OfyHelper
import com.thegrid.communication.model.MapState
import com.thegrid.ia.model.Ag
import com.thegrid.ia.model.DataSetEntity
import com.thegrid.ia.model.DataSetRowEntity
import com.thegrid.ia.model.Rna

class Simulation(val map : Map, val debugMode : Boolean = false, debugSleepTime : Long = 1000) {

    companion object {
        var SharedInstance : Simulation? = null
        val DEFAULT_TIME_SLEEP: Long = 1000
        val ITERACIONES_AG = 20000    //cuantos Procesar hago en realidad
        val ITERACIONES_RNA = 4000
        val APTITUD_ACEPTABLE = 500
    }

    val lock : java.lang.Object = Object()
    val memory: MapStateMemory = MapStateMemory(map)
    val orquestador: Orchestrator
    val AG = Ag(map)
    val rna : Rna
    val dispatcher: TimeDispatcher = TimeDispatcher()
    var correr: Boolean = true
    var estoyInterrumpido : Boolean = false
    var tipoEjecucion = TipoEjecucion.SIM
    var timeSleep = if (debugMode) debugSleepTime else DEFAULT_TIME_SLEEP
    var resultado: Resultado

    init {
        SharedInstance = this
        map.nodes.forEach {
            if (it is IDispatcheable)
                dispatcher.dispatchOn(0.0, it)
        }
        map.blocks.forEach { dispatcher.dispatchOn(0.0, it) }


        resultado = Resultado()
        resultado.cant_Cuadras = map.blocks.size

        orquestador = iniciarSimulacion()
        rna = Rna(map, debugMode)

    }



    private fun iniciarSimulacion(): Orchestrator {
        return Orchestrator(Runnable {
            System.err.println("> Comienzo de la ejecución")
            while (correr) {
                println("La rna es $rna")
                ObjectifyService.begin()
                try {
                    when(tipoEjecucion) {
                        TipoEjecucion.SIM -> procesar()
                        TipoEjecucion.AG -> procesarAG()
                        TipoEjecucion.RNA -> procesarRNA()
                    }
                } catch (e: InterruptedException){
                }
            }
            System.err.println("> Fin de la ejecución")
        }, debugMode)
    }

    private fun procesarRNA() {
        if (!rna.entrenada){
            println("Entreno y guardo los datos de la RNA")
            rna.entrenarRed()
            resultado.guardarDatosRna(rna.getMaxError(),rna.getLearninRate(),rna.getMinErrorChange(),rna.getCurrentIteracion(),rna.getErrorFunction())
        }
        for (i in 0..ITERACIONES_RNA) {
            if (!correr) break
            procesar()
        }
        val aptitudActual = calcularAptitudMapa()
        if (aptitudActual < 2000) {
            val estadoMapa = calcularEstadoMapa()
            val tiempos = rna.haztumagia(estadoMapa)!!
            for((index,semaforo) in map.semaphoreNodes.withIndex()) {
                semaforo.setTimes(tiempos[index], tiempos[index+1])
            }
            resultado.guardarTiempoRna(dispatcher.time, true , aptitudActual, tiempos)
        }else {
            resultado.guardarTiempoRna(dispatcher.time, false , aptitudActual, DoubleArray(1))
        }
    }

    fun calcularEstadoMapa(): DoubleArray {
        val estadoCongestion = CongestionLevel.values().map { 0.0 }.toDoubleArray()
        for (cuadra in map.blocks) {
            estadoCongestion[CongestionLevel.values().indexOf(cuadra.congestionLevel)]++

        }
        var estadoFlujos = DoubleArray(map.streets.size * 4)
        var i = 0
        for (nodo in map.nodes) {
            if (nodo is EntryNode) {
                estadoFlujos[i] = nodo._interval.toDouble()
                estadoFlujos[i + 1] = nodo._maxAmount.toDouble()
                i += 2
            }
            if (nodo is EgressNode) {
                estadoFlujos[i] = nodo._interval.toDouble()
                estadoFlujos[i + 1] = nodo._maxAmount.toDouble()
                i += 2
            }
        }

        val estadoMapa = rna.normalizar(estadoCongestion,0.0,map.blocks.size.toDouble()) + rna.normalizar(estadoFlujos,1.0,10.0)
        return estadoMapa
    }

    fun getStatus(): MapState {
        return memory.getStatus()
    }

    fun restarTiempo(i: Int) {
        if (timeSleep - i < 0  ) timeSleep = 100  else timeSleep -= i
        println("el tiempo de sleep es: ${timeSleep} " )
    }

    fun sumarTiempo(i: Int) {
        timeSleep += i
        println("el tiempo de sleep es: ${timeSleep} " )
    }

    fun reanudar() {
        synchronized (lock) {
            println("me reanudaron")
            estoyInterrumpido = false
            lock.notify()
        }
    }

    fun pausar() {
//        println("me interrumpieron")
        estoyInterrumpido = true
    }

    fun procesarAG() {
        resultado.guardarPoblacionPorIteracion(dispatcher.time, AG.poblacion)
        for (cromosoma in AG.poblacion) {
            if (cromosoma.aptitud != 0.0) continue
            val tiempos = cromosoma.genes
            for((index,semaforo) in map.semaphoreNodes.withIndex()) {
                semaforo.setTimes(tiempos[index], tiempos[index+1])
            }
            for (i in 0..ITERACIONES_AG) {
                if (!correr) break
                procesar()
            }

            cromosoma.aptitud = calcularAptitudMapa()
            resultado.guardarTiempoCromosomaAptitud(dispatcher.time,cromosoma,cromosoma.aptitud.toInt())

            if (cromosoma.aptitud >= APTITUD_ACEPTABLE) {
                if (rna == null) println("rna es null")
                if (cromosoma == null) println("cromosoma es null")
                if (cromosoma.genes == null) println("genes es null")
                rna.agregarValorDeEntrenamiento(calcularEstadoMapa(), rna.normalizar(cromosoma.genes.toDoubleArray(),Ag.cotaInferior,Ag.cotaSuperior ))
            }
        }
        AG.iterar(resultado, dispatcher.time)
    }

    fun calcularAptitudMapa(): Double {
        //Evaluar el estado del mapa con sus atributos y setearlo en el cromosoma
        var aptitud = 0.0
        var congetionTotal = 0.0
        for (cuadra in map.blocks) {
            aptitud += cuadra.congestionLevel.ponderacion
            congetionTotal += cuadra.congestion
            resultado.guardarTiempoCongestionXCuadra(cuadra.id,dispatcher.time,cuadra.congestion)
        }
        resultado.guardarTiempoCongestion(dispatcher.time,congetionTotal)
        resultado.guardarTiempoAptitud(dispatcher.time,aptitud)
        return aptitud


    }

    fun procesar() {
        synchronized(lock) {
            while (estoyInterrumpido) {
                println("Me interrumpieron ")
                lock.wait()
            }
        }

        resultado.tiempo_simulado = dispatcher.time.toInt()
        if (dispatcher.time % 20 == 0.0 && dispatcher.time != 0.0) resultado.guardarTiempoVelocidad(dispatcher.time, sensarVelocidadMapa())

        dispatcher.processEvent()
        Thread.sleep(timeSleep)
    }

    private fun  sensarVelocidadMapa(): Double {
        var velocidad = 0.0
        for (cuadra in map.blocks) {
            velocidad += cuadra.velocity
            resultado.guardarTiempoVelocidadXCuadra(cuadra.id,dispatcher.time,cuadra.velocity)
        }

        return velocidad/map.blocks.size
    }
}