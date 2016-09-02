package com.thegrid.behavior.plattform

import com.thegrid.behavior.model.EntryNode
import com.thegrid.behavior.services.MapStateMemory
import com.thegrid.behavior.model.Map
import com.thegrid.behavior.plattform.Orquestar
import com.thegrid.behavior.services.TimeDispatcher
import com.thegrid.communication.model.MapState
import kotlin.properties.Delegates

class Simulation(map : Map) {
    companion object {
        var SharedInstance : Simulation by Delegates.notNull<Simulation>()
    }

    val memory: MapStateMemory
    val map: Map
    val orquestador: Orquestar
    val AG: Object = Object()
    val dispatcher: TimeDispatcher

    init {
        SharedInstance = this
        memory = MapStateMemory(map)
        dispatcher = TimeDispatcher()
        this.map = map

        val nodosEntrada = map.nodes.filter {
            it is EntryNode
        }.forEach {
            dispatcher.dispatchOn()
        }

        orquestador = Orquestar(Runnable {
            while (true) {
                println("asd")
                Thread.sleep(5000)
            }
        })
    }

    fun simulate() {
        //TBD
    }

    fun getStatus(): MapState {
        return memory.getStatus()
    }
}