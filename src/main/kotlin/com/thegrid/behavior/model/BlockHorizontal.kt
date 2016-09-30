package com.thegrid.behavior.model

import com.thegrid.behavior.extensions.Probabilities
import com.thegrid.behavior.state.BlockState
import freeFunctions.minimo
import kotlin.properties.Delegates

class BlockHorizontal(id: String, street: Street, length: Int, entryNode: NodeType, egressNode: NodeType, blockState: BlockState)
: Block(id, street, length, entryNode, egressNode, blockState) {

    override fun relateOutgoingBlocks() {
        crossingBlock = egressNode.horizontalEgressBlock
        turningBlock = egressNode.verticalEgressBlock
    }

    override fun getLastCarInputDuration(previusEventTime: Double, now:Double): Double {
        return entryNode.getOnlineTimeH(previusEventTime, now)
    }

    override fun relateNodes() {
        entryNode.horizontalEgressBlock = this
        egressNode.horizontalEntryBlock = this
    }

    override fun startObservation() {
        entryNode.crossingHorizontalOutgoingCars.subscribe { previousBlock ->
            processCrossingHorizontalOutgoingCars(previousBlock)
        }
        entryNode.turningHorizontalOutgoingCars.subscribe { previousBlock ->
            processTurningHorizontalOutgoingCars(previousBlock)
        }
    }

    fun  processTurningHorizontalOutgoingCars(previousBlock: Block) {
        val amount = minimo(_carCapacity - stk, previousBlock.outgoingTurningCarsAmount)
        _incomingCarsAmount += amount
        a_lastCarsInput += amount
        previousBlock.outgoingTurningCarsAmount -= amount
    }

    fun processCrossingHorizontalOutgoingCars(previousBlock: Block) {
        val amount = minimo(_carCapacity - stk, previousBlock.outgoingCrossingByCarsAmount)
        _incomingCarsAmount += amount
        a_lastCarsInput += amount
        previousBlock.outgoingCrossingByCarsAmount -= amount
    }

    override fun setProbabilities(value: Probabilities) {
        _turningProbability = value.verticalProbability * TurningModifier
        _crossingProbability = 1 - _turningProbability
    }

}