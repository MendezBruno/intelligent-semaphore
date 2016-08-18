package com.thegrid.communication.model

import com.thegrid.behavior.model.Orientation
import com.thegrid.behavior.model.Street

/**
 * Created by Surakituaka on 01/08/2016.
 */

data class Block(
        val id: String,
        val street: Street,
        val length: Int/*Double*/,
        val entryNode: NodeType,
        val egressNode: NodeType) {

    private val _carCapacity: Int = 3 //TODO calcular segun length
    private var _incomingCarsAmount: Int = 0
    private var _outgoingLeftCarsAmount: Int = 0
    private var _outgoingRightCarsAmount: Int = 0
    private val _incomingCarsAvailability: Int =  _carCapacity / 2 - _incomingCarsAmount
    private val _outgoingCarsAvailability: Int = _carCapacity / 2 - _outgoingLeftCarsAmount - _outgoingRightCarsAmount

    fun hasVerticalDirection() : Boolean{
        return street.orientation == Orientation.South || street.orientation == Orientation.North
    }

    fun work() {
        takeCarsOut()
        moveCarsToTheFront()
    }

    private fun takeCarsOut(): Int {
        val leftLeavingAmount = min(_outgoingLeftCarsAmount, egressNode.leftAvailability)
        egressNode.takeLeftCars(leftLeavingAmount)
        _outgoingLeftCarsAmount -= leftLeavingAmount

        val rightLeavingAmount = min(_outgoingRightCarsAmount, egressNode.rightAvailability)
        egressNode.takeRightCars(rightLeavingAmount)
        _outgoingRightCarsAmount -= rightLeavingAmount
    }

    private fun moveCarsToTheFront() {
        val totalAmount: Int
        if (_incomingCarsAmount <= _outgoingCarsAvailability) {
            totalAmount = _incomingCarsAmount
            _incomingCarsAmount = 0
        } else {
            _incomingCarsAmount -= _outgoingCarsAvailability
            totalAmount = _outgoingCarsAvailability
        }
        val leftAmount = (totalAmount * 0.5).toInt()
        _outgoingLeftCarsAmount += leftAmount
        _outgoingRightCarsAmount += totalAmount - leftAmount
    }

    fun min(value1: Int, value2: Int) = if (value1 <= value2) value1 else value2

}