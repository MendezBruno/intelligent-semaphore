package com.thegrid.communication.model

import com.google.appengine.repackaged.com.google.api.client.json.Json
import com.thegrid.communication.extension.MatrixId
import com.thegrid.communication.extension.RGB
import java.util.*
import kotlin.*

/**
 * Created by Surakituaka on 21/07/2016.
 */


class MapState private constructor() {

    private object Holder { val INSTANCE = MapState() }

    companion object {
        val SharedInstance: MapState by lazy { Holder.INSTANCE }
    }

    var blockStatus = hashMapOf<MatrixId, RGB>()
    var semaphoreStatus = hashMapOf<MatrixId, Boolean>()


    fun setMap(map: MapStructure) {
        blockStatus = extractBlocks(map)
        semaphoreStatus = extractSemaphores(map)
    }

    private fun extractBlocks(map: MapStructure): HashMap<MatrixId, RGB> = hashMapOf()

    private fun extractSemaphores(map: MapStructure): HashMap<MatrixId, Boolean> = hashMapOf()

}


