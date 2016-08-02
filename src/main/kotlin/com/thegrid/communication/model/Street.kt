package com.thegrid.communication.model

import com.thegrid.communication.extension.FDP
import com.thegrid.communication.extension.MatrixId

/**
 * Created by Surakituaka on 01/08/2016.
 */

data class Street(val id: MatrixId, val maxSpeed: Float, val lane: Int, val blocks: Array<Block>, val popularity: Float,
                  val FDPCarInput : FDP, val FDPCarOutput: FDP)