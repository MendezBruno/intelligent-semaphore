package com.thegrid.behavior.model

import freeFunctions.minimo

class BlockHorizontal(id: String, street: Street, length: Int, entryNode: NodeType, egressNode: NodeType)
: Block(id, street, length, entryNode, egressNode) {

    override fun setAsEntryBlock(node: NodeType) {
        node.setHorizontalEntryBlock(this);
    }

    override fun setAsEgressBlock(node : NodeType) {
        node.setHorizontalEgressBlock(this);
    }

    override fun startObservation() {
        entryNode.crossingHorizontalOutgoingCars.subscribe { previousBlock ->
            val amount = minimo(_incomingCarsAvailability, previousBlock.outgoingCrossingByCarsAmount)
            _incomingCarsAmount += amount
            previousBlock.outgoingCrossingByCarsAmount -= amount
        }
        entryNode.turningHorizontalOutgoingCars.subscribe { previousBlock ->
            val amount = minimo(_incomingCarsAvailability, previousBlock.outgoingTurningCarsAmount)
            _incomingCarsAmount += amount
            previousBlock.outgoingTurningCarsAmount -= amount
        }
    }
}