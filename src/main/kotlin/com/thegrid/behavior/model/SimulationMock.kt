package com.thegrid.behavior.model

import com.thegrid.behavior.extension.MapStateMemory
import com.thegrid.communication.model.Map

class SimulationMock {

    private var _map : Map;
    private var _memory: MapStateMemory

    private constructor(map : Map) {
        _map = map;
        _memory = MapStateMemory(map);
    }

    public fun getMap(): Map {
        return _map;
    }

    public fun getMemory(): MapStateMemory {
        return _memory;
    }

    companion object {
        var SharedInstance: SimulationMock? = null;

        public fun loadSimulation(map : Map) {
            SharedInstance = SimulationMock(map);
        }
    }
}