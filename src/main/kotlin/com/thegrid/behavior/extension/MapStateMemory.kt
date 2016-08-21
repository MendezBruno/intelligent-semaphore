package com.thegrid.behavior.extension

import com.thegrid.behavior.model.Block
import com.thegrid.behavior.model.SemaphoreNode
import com.thegrid.behavior.observer.SemaphoreListener
import com.thegrid.communication.model.*
import com.thegrid.communication.model.Map
import java.util.*

class MapStateMemory {

    private var _cuadrasCache : MutableList<Block> = mutableListOf();
    private var _nodosCache : MutableList<SemaphoreNode> = mutableListOf();

    constructor(map : Map) {
        //Agrego este listener a todo los elementos q me interesan

        var listener = object : SemaphoreListener {
            override fun fire(sem: SemaphoreNode) {
                _nodosCache.add(sem);
            }

        }

        //foreach de todos los semaforos -> agrego listener
    }

    public fun getStatus() : MapState {
        //Updateo esto
        return MapState.SharedInstance;
    }
}

