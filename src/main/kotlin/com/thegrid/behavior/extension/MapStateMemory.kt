package com.thegrid.behavior.extension

import com.thegrid.behavior.model.Block
import com.thegrid.behavior.model.SemaphoreNode
import com.thegrid.behavior.observer.BlockListener
import com.thegrid.behavior.observer.SemaphoreListener
import com.thegrid.communication.model.Map
import com.thegrid.communication.model.MapState

class MapStateMemory {

    private var _cuadrasCache : MutableList<Block> = mutableListOf();
    private var _nodosCache : MutableList<SemaphoreNode> = mutableListOf();

    constructor(map : Map) {

        //Agrego este listener a todo los elementos q me interesan

        for (semaphore in map.semaphoreNodes){
            var semaphoreListener = object : SemaphoreListener {
                override fun fire(sem: SemaphoreNode) {
                    _nodosCache.add(sem);
                }
            }
            semaphore.getChangeListeners().add(semaphoreListener)
        }

        for (block in map.blocks){
            var blockListener = object : BlockListener {
                override fun fire(block: Block) {
                    _cuadrasCache.add(block);
                }
            }
            block.getChangeListeners().add(blockListener)
        }
    }

    public fun getStatus() : MapState {
        //Updateo esto
        return MapState.SharedInstance;
    }
}

