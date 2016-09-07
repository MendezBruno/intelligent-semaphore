package com.thegrid.behavior.model

import com.thegrid.behavior.extensions.Probabilities
import freeFunctions.minimo

class BlockVertical(id: String, street: Street, length: Int, entryNode: NodeType)
: Block(id, street, length, entryNode) {

    override fun setAsEntryBlock(node: NodeType) {
        node.verticalEntryBlock = this
    }

    override fun startObservation() {
        entryNode.crossingVerticalOutgoingCars.subscribe { previousBlock ->
            val amount = minimo(_carCapacity - stk, previousBlock.outgoingCrossingByCarsAmount)
            _incomingCarsAmount += amount
            previousBlock.outgoingCrossingByCarsAmount -= amount
        }
        entryNode.turningVerticalOutgoingCars.subscribe { previousBlock ->
            val amount = minimo(_carCapacity - stk, previousBlock.outgoingTurningCarsAmount)
            _incomingCarsAmount += amount
            previousBlock.outgoingTurningCarsAmount -= amount
        }
    }


    override fun setProbabilities(value: Probabilities) {
        _turningProbability = value.horizontalProbability * TurningModifier
        _crossingProbability = 1 - _turningProbability
    }

}
