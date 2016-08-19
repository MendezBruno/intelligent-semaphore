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
    private var _backStraightCarAmount: Int = 0
    private var _backBendCarAmount: Int = 0
    private var _frontStraightCarAmount: Int = 0
    private var _frontBendCarAmount: Int = 0

    fun hasVerticalDirection() : Boolean{
        return street.orientation == Orientation.South || street.orientation == Orientation.North
    }

}