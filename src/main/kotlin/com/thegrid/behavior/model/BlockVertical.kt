package com.thegrid.behavior.model

import freeFunctions.minimo

class BlockVertical(id: String, street: Street, length: Int, entryNode: NodeType, egressNode: NodeType)
: Block(id, street, length, entryNode, egressNode) {

    override fun setAsEgressBlock(node: NodeType) {
        node.setVerticalEgressBlock(this);
    }

    override fun setAsEntryBlock(node: NodeType) {
        node.setVerticalEntryBlock(this);
    }

    override fun startObservation() {
        entryNode.crossingVerticalOutgoingCars.subscribe { previousBlock ->
            val amount = minimo(_incomingCarsAvailability, previousBlock.outgoingCrossingByCarsAmount)
            _incomingCarsAmount += amount
            previousBlock.outgoingCrossingByCarsAmount -= amount
        }
        entryNode.turningVerticalOutgoingCars.subscribe { previousBlock ->
            val amount = minimo(_incomingCarsAvailability, previousBlock.outgoingTurningCarsAmount)
            _incomingCarsAmount += amount
            previousBlock.outgoingTurningCarsAmount -= amount
        }
    }
}
