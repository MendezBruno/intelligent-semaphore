package com.thegrid.behavior.model

import com.google.appengine.repackaged.com.google.common.base.Randoms
import com.thegrid.behavior.extension.MapStateMemory
import com.thegrid.communication.model.Map
import java.util.*

class SimulationMock {

    private var _map : Map
    private var _memory: MapStateMemory

    private constructor(map : Map) {
        _map = map
        _memory = MapStateMemory(map)
    }

    public fun getMap(): Map {
        return _map
    }

    public fun getMemory(): MapStateMemory {
        return _memory
    }

    public fun nextStatus() {
        val r = Random();
        _map.blocks.filter { b -> r.nextBoolean() }
                .forEach { b -> b.setStock(r.nextInt(50)) }
        _map.semaphoreNodes.filter { s -> r.nextBoolean() }
                .forEach { s -> s.setVGreen(r.nextBoolean()) }
    }

    companion object {
        var SharedInstance: SimulationMock? = null

        public fun loadSimulation(map : Map) {
            SharedInstance = SimulationMock(map)
        }
    }
}