package com.thegrid.behavior.platform

import com.googlecode.objectify.Objectify
import com.googlecode.objectify.ObjectifyService
import com.thegrid.behavior.model.CongestionLevel
import com.thegrid.behavior.model.EgressNode
import com.thegrid.behavior.model.EntryNode
import com.thegrid.behavior.services.MapStateMemory
import com.thegrid.behavior.model.Map
import com.thegrid.behavior.model.Resultado
import com.thegrid.communication.model.MapState
import com.thegrid.ia.model.Ag
import com.thegrid.ia.model.DataSetEntity
import com.thegrid.ia.model.DataSetRowEntity
import com.thegrid.ia.model.Rna

class Simulation(val map : Map, val debugMode : Boolean = false, debugSleepTime : Long = 1000) {

    companion object {
        var SharedInstance : Simulation? = null
        var resultados: Resultado = Resultado()
        val DEFAULT_TIME_SLEEP: Long = 1000
        val ITERACIONES_AG = 20
        val ITERACIONES_RNA = 20
        val APTITUD_ACEPTABLE = 400
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
    val ofy: Objectify

    init {
        SharedInstance = this
        map.nodes.forEach {
            if (it is IDispatcheable)
                dispatcher.dispatchOn(0.0, it)
        }
        map.blocks.forEach { dispatcher.dispatchOn(0.0, it) }
        orquestador = iniciarSimulacion()

        val dataSetRowEntity = DataSetRowEntity()
        dataSetRowEntity.entradas.addAll(listOf(2.0,20.1))
        dataSetRowEntity.salidas.addAll(listOf(2.0,20.1))
        val dataSetEntity = DataSetEntity()
        dataSetEntity.filas.add(dataSetRowEntity)
        dataSetEntity.id = "soy_uno_de_esos_hashes_complicados"

        ofy = ObjectifyService.ofy()!!
        ofy.save().entity(dataSetEntity).now()
        rna = Rna(map, debugMode)
    }

    private fun iniciarSimulacion(): Orchestrator {
        return Orchestrator(Runnable {
            while (correr) {
                println("La rna es $rna")
                try {
                    when(tipoEjecucion) {
                        TipoEjecucion.SIM -> procesar()
                        TipoEjecucion.AG -> procesarAG()
                        TipoEjecucion.RNA -> procesarRNA()
                    }
                } catch (e: InterruptedException){
                }
            }
        }, debugMode)
    }

    private fun procesarRNA() {
        for (i in 0..ITERACIONES_RNA) procesar()
        if (calcularAptitudMapa() < 1000) {
            val estadoMapa = calcularEstadoMapa()
            val tiempos = rna.haztumagia(estadoMapa)!!
            for((index,semaforo) in map.semaphoreNodes.withIndex()) {
                semaforo.setTimes(tiempos[index], tiempos[index+1])
            }
        }
    }

    fun calcularEstadoMapa(): DoubleArray {
        val estadoCongestion = CongestionLevel.values().map { 0.0 }.toDoubleArray()
        for (cuadra in map.blocks) {
            estadoCongestion[CongestionLevel.values().indexOf(cuadra.congestionLevel)]++
        }
        val estadoFlujos = DoubleArray(map.streets.size * 4)
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
        val estadoMapa = estadoCongestion + estadoFlujos
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
        for (cromosoma in AG.poblacion) {
            if (cromosoma.aptitud != 0.0) continue
            val tiempos = cromosoma.genes
            for((index,semaforo) in map.semaphoreNodes.withIndex()) {
                semaforo.setTimes(tiempos[index], tiempos[index+1])
            }
            for (i in 0..ITERACIONES_AG) {
                procesar()
            }

            cromosoma.aptitud = calcularAptitudMapa()

            if (cromosoma.aptitud >= APTITUD_ACEPTABLE) {
                if (rna == null) println("rna es null")
                if (cromosoma == null) println("cromosoma es null")
                if (cromosoma.genes == null) println("genes es null")
                rna.agregarValorDeEntrenamiento(calcularEstadoMapa(),cromosoma.genes.toDoubleArray())
            }
        }
        AG.iterar()
    }

    fun calcularAptitudMapa(): Double {
        //Evaluar el estado del mapa con sus atributos y setearlo en el cromosoma
        var aptitud = 0.0
        for (cuadra in map.blocks)
            aptitud += cuadra.congestionLevel.ponderacion
        return aptitud
    }

    fun procesar() {
        synchronized(lock) {
            while (estoyInterrumpido) {
                println("Me interrumpieron ")
                lock.wait()
            }
        }

        dispatcher.processEvent()
        Thread.sleep(timeSleep)
    }
}