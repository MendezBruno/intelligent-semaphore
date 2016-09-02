package com.thegrid.behavior.model

import com.thegrid.behavior.extension.MapStateMemory
import com.thegrid.communication.model.MapState
import kotlin.properties.Delegates

class Simulation(map : Map) {
    companion object {
        var SharedInstance : Simulation by Delegates.notNull<Simulation>()
    }

    val memory: MapStateMemory
    val map: Map
    val orquestador: Object = Object()
    val AG: Object = Object()
    val dispatcher: Object = Object()

    init {
        SharedInstance = this
        memory = MapStateMemory(map)
        this.map = map
    }

    fun simulate() {
        //TBD
    }

    fun getStatus(): MapState {
        return memory.getStatus()
    }
}