package com.thegrid.behavior.platform

import com.thegrid.behavior.model.EntryNode
import com.thegrid.behavior.services.MapStateMemory
import com.thegrid.behavior.model.Map
import com.thegrid.behavior.platform.Orchestrator
import com.thegrid.behavior.platform.TimeDispatcher
import com.thegrid.communication.model.MapState
import java.sql.Timestamp
import java.time.Instant
import kotlin.properties.Delegates

class Simulation(map : Map) {
    companion object {
        var SharedInstance : Simulation by Delegates.notNull<Simulation>()
    }

    val memory: MapStateMemory
    val map: Map
    val orquestador: Orchestrator
    val AG: Object = Object()
    val dispatcher: TimeDispatcher

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

        orquestador = Orchestrator(Runnable {
            while (true) {
                dispatcher.processEvent()
                Thread.sleep(1000)
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