package com.thegrid.communication.model

import com.beust.klaxon.JsonArray
import com.beust.klaxon.JsonObject
import com.beust.klaxon.array
import com.beust.klaxon.obj
import com.thegrid.communication.extension.MatrixId
import com.thegrid.communication.extension.RGB
import com.thegrid.communication.service.MapParser
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

    private fun extractBlocks(map: MapStructure): HashMap<MatrixId, RGB>{
        val obj = MapParser.createParsedMap(map.toString()) as JsonObject
        val blocks = obj.array<JsonObject>("blockStatus") as JsonArray<JsonObject>
        val blockStatus = hashMapOf<MatrixId, RGB>()

        for (block in blocks) {
            blockStatus.put(MatrixId.create(block.keys.first()), block[block.keys.first()] as RGB)
        }

        return  blockStatus
    }

    private fun extractSemaphores(map: MapStructure): HashMap<MatrixId, Boolean>{
        val parsedMap = MapParser.createParsedMap(map.toString()) as JsonObject
        val semaphores = parsedMap.array<JsonObject>("semaphoreStatus") as JsonArray<JsonObject>
        val semaphoreStatus = hashMapOf<MatrixId, Boolean>()

        for (semaphore in semaphores) {
            semaphoreStatus.put(MatrixId.create(semaphore.keys.first()), semaphore[semaphore.keys.first()] as Boolean)
        }

        return  semaphoreStatus
    }
}


