package com.thegrid.behavior.platform

import com.thegrid.behavior.services.MapStateMemory
import com.thegrid.behavior.model.Map
import com.thegrid.communication.model.MapState
import com.thegrid.ia.model.Ag
import com.thegrid.ia.model.Cromosoma

class Simulation(map : Map, val debugMode : Boolean = false) {
    companion object {
        var SharedInstance : Simulation? = null
    }

    val lock : java.lang.Object = Object()
    val memory: MapStateMemory
    val map: Map
    val orquestador: Orchestrator
    val AG: Ag = Ag()
    val dispatcher: TimeDispatcher
    var timeSleep: Long = 1000
    var correr: Boolean = true
    var estoyInterrumpido : Boolean = false
    val seUsaIA = true;

    init {
        SharedInstance = this
        memory = MapStateMemory(map)
        dispatcher = TimeDispatcher()
        this.map = map


        map.nodes.forEach {
            if (it is IDispatcheable)
                dispatcher.dispatchOn(0.0, it)
        }
        map.blocks.forEach { dispatcher.dispatchOn(0.0, it) }

        if (debugMode) timeSleep = 500
        orquestador = iniciarSimulacion()
    }

    private fun iniciarSimulacion(): Orchestrator {
        return Orchestrator(Runnable {

                while (correr) {
                    try {
                        evaluarCromosomas(AG.poblacionInicial,20)
                        if (seUsaIA) AG.iterar()
                        Thread.sleep(timeSleep);

                        synchronized(lock) {
                            while (estoyInterrumpido){
                                println("estoy en el wait")
                                lock.wait()
                            }
                        }
                    } catch (e: InterruptedException){
                    }

                }


        }, debugMode)
    }


    fun simulate() {
        //TBD
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
        println("me interrumpieron")
        estoyInterrumpido = true
    }

    fun evaluarCromosomas(cromosomas: MutableList<Cromosoma>, iteraciones: Int) {
        for (cromosoma in cromosomas) {
            if (cromosoma.aptitud > 0.0) continue
            val tiempos = cromosoma.genes
            for((index,semaforo) in map.semaphoreNodes.withIndex()) {
                semaforo.setTimes(tiempos.get(index), tiempos.get(index))
            }
            for (i in 0..iteraciones) dispatcher.processEvent()

            //Evaluar el estado del mapa con sus atributos y setearlo en el cromosoma
            cromosoma.aptitud = 5.0
        }
    }
}