package com.thegrid.behavior.model

import com.thegrid.behavior.extensions.Probabilities
import com.thegrid.behavior.state.BlockState
import freeFunctions.minimo

class BlockVertical(id: String, street: Street, length: Int, entryNode: NodeType, egressNode: NodeType, blockState: BlockState)
: Block(id, street, length, entryNode, egressNode, blockState) {

    override fun relateOutgoingBlocks() {
        crossingBlock = egressNode.verticalEgressBlock
        turningBlock = egressNode.horizontalEgressBlock
    }

    override fun getLastCarInputDuration(previusEventTime: Double, now: Double): Double {
        return entryNode.getOnlineTimeV(previusEventTime, now)
    }

    override fun relateNodes() {
        entryNode.verticalEgressBlock = this
        egressNode.verticalEntryBlock = this
    }

    override fun startObservation() {
        entryNode.crossingVerticalOutgoingCars.subscribe { previousBlock ->
            val amount = minimo(_carCapacity - stk, previousBlock.outgoingCrossingByCarsAmount)
            _incomingCarsAmount += amount
            a_lastCarsInput += amount
            previousBlock.outgoingCrossingByCarsAmount -= amount
        }
        entryNode.turningVerticalOutgoingCars.subscribe { previousBlock ->
            val amount = minimo(_carCapacity - stk, previousBlock.outgoingTurningCarsAmount)
            _incomingCarsAmount += amount
            a_lastCarsInput += amount
            previousBlock.outgoingTurningCarsAmount -= amount
        }
    }


    override fun setProbabilities(value: Probabilities) {
        _turningProbability = value.horizontalProbability * TurningModifier
        _crossingProbability = 1 - _turningProbability
    }

}
