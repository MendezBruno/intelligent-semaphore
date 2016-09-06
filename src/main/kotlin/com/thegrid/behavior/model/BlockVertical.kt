package com.thegrid.behavior.model

import freeFunctions.minimo

class BlockVertical(id: String, street: Street, length: Int, entryNode: NodeType)
: Block(id, street, length, entryNode) {

    override fun setAsEntryBlock(node: NodeType) {
        node.verticalEntryBlock = this
    }

    override fun startObservation() {
        entryNode.crossingVerticalOutgoingCars.subscribe { previousBlock ->
            val amount = minimo(carCapacity-_stk, previousBlock.outgoingCrossingByCarsAmount)
            _incomingCarsAmount += amount
            previousBlock.outgoingCrossingByCarsAmount -= amount
        }
        entryNode.turningVerticalOutgoingCars.subscribe { previousBlock ->
            val amount = minimo(carCapacity-_stk, previousBlock.outgoingTurningCarsAmount)
            _incomingCarsAmount += amount
            previousBlock.outgoingTurningCarsAmount -= amount
        }
    }
}
