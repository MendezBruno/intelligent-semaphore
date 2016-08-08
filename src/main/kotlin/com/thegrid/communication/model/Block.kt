package com.thegrid.communication.model

/**
 * Created by Surakituaka on 01/08/2016.
 */

data class Block(val id: String, val street: Street, val length: Double, val entryNode: Node, val egressNode: Node) {

    val carCapacity: Int = 3 //TODO calcular segun length
    var backStraightCarAmount: Int = 0
    var backBendCarAmount: Int = 0
    var frontStraightCarAmount: Int = 0
    var frontBendCarAmount: Int = 0

    fun vBlock() : Boolean{
        return street.orientation == "Norte-Sur" || street.orientation == "Sur-Norte"
    }

}