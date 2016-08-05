package com.thegrid.communication.model

import com.thegrid.communication.extension.FDP

/**
 * Created by Surakituaka on 01/08/2016.
 */

data class Street(val maxSpeed: Float, val lane: Int, val orientation: String, val blocks: Array<Block>,
                  val popularity: Float)