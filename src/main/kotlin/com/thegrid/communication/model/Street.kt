package com.thegrid.communication.model

import com.thegrid.communication.extension.MatrixId
import java.util.*

/**
 * Created by Surakituaka on 01/08/2016.
 */

data class Street(val id: MatrixId, val maxSpeed: Float, val lane: Int, val blocks: HashMap<MatrixId,Block>)