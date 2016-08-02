package com.thegrid.communication.model

import com.thegrid.communication.extension.MatrixId

/**
 * Created by Surakituaka on 01/08/2016.
 */

data class Block(val id: MatrixId, val vertical: Boolean, val street: Street, val popularity: Float, val length: Float,
                 val carCapacity: Int, val backStraightCarAmount: Int, val backBendCarAmount: Int,
                 val frontStraightCarAmount: Int, val frontBendCarAmount: Int)