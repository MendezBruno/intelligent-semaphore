package com.thegrid.behavior.model

import com.github.salomonbrys.kotson.fromJson
import com.google.appengine.repackaged.com.google.common.base.Randoms
import com.google.gson.Gson
import com.thegrid.behavior.extensions.Direction
import com.thegrid.behavior.services.MapStateMemory
import com.thegrid.behavior.model.Map
import com.thegrid.communication.model.dataMap
import com.thegrid.communication.services.MapConversor
import org.omg.CORBA.portable.Delegate
import java.util.*
import kotlin.properties.Delegates

class SimulationMock {

    private var _map : Map
    private var _memory: MapStateMemory

    private constructor(map : Map) {
        _map = map
        _memory = MapStateMemory(map)
    }

    fun getMap(): Map {
        return _map
    }

    fun getMemory(): MapStateMemory {
        return _memory
    }

    fun nextStatus() {
        val r = Random()
        _map.blocks.filter { r.nextBoolean() }
                .forEach { it.outgoingTurningCarsAmount = (r.nextInt(50)) }
        _map.semaphoreNodes.filter { r.nextBoolean() }
                .forEach { it.direction = r.nextDirection() }
    }

    companion object {
        var SharedInstance: SimulationMock by Delegates.notNull()
        fun loadSimulation(map : Map) {
            SharedInstance = SimulationMock(map)
        }
    }
}

private fun Random.nextDirection(): Direction {
    if (this.nextBoolean()) return Direction.vertical() else return Direction.horizontal()
}