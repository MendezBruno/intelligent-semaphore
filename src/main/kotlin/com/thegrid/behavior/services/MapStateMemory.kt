package com.thegrid.behavior.services

import com.thegrid.behavior.model.Block
import com.thegrid.behavior.model.SemaphoreNode
import com.thegrid.behavior.observer.BlockListener
import com.thegrid.behavior.observer.SemaphoreListener
import com.thegrid.behavior.model.Map
import com.thegrid.communication.model.MapState
import com.thegrid.communication.model.dataBlockStatus
import com.thegrid.communication.model.dataSemaphoreStatus

class MapStateMemory {

    private val _mapState : MapState = MapState()
    private var _cuadrasCache : MutableSet<Block> = mutableSetOf()
    private var _nodosCache : MutableSet<SemaphoreNode> = mutableSetOf()

    constructor(map : Map) {

        //Agrego este listener a todo los elementos q me interesan

        for (semaphore in map.semaphoreNodes){
            var semaphoreListener = object : SemaphoreListener {
                override fun fire(sem: SemaphoreNode) {
                    _nodosCache.add(sem)
                }
            }
            semaphore.changeListeners.add(semaphoreListener)
        }

        for (block in map.blocks){
            var blockListener = object : BlockListener {
                override fun fire(block: Block) {
                    _cuadrasCache.add(block)
                }
            }
            block.changeListeners.add(blockListener)
        }
    }

    fun getStatus() : MapState {
        _mapState.blockStatus.clear()
        _mapState.semaphoreStatus.clear()

        for (block in _cuadrasCache){
            val dataBlock = dataBlockStatus(block.id,
                    block.outgoingCrossingByCarsAmount +
                            block.outgoingTurningCarsAmount,
                    block.colorStatus,
                    block.congestion)
            _mapState.blockStatus.add(dataBlock)
        }

        for (semaphore in _nodosCache){
            val status = semaphore.direction.text
            val dataSemaphoreStatus = dataSemaphoreStatus(semaphore.id, status)
            _mapState.semaphoreStatus.add(dataSemaphoreStatus)
        }

        _nodosCache.clear()
        _cuadrasCache.clear()

        return _mapState
    }
}

