package com.thegrid.communication.model

import com.beust.klaxon.*
import com.thegrid.communication.extension.MatrixId
import com.thegrid.communication.extension.RGBA
import com.thegrid.communication.service.MapParser
import java.util.*

/**
 * Created by Surakituaka on 21/07/2016.
 */


class MapState private constructor() {

    private object Holder { val INSTANCE = MapState() }

    companion object {
        val SharedInstance: MapState by lazy { Holder.INSTANCE }
    }

    var blockStatus = hashMapOf<MatrixId, RGBA>()
    var semaphoreStatus = hashMapOf<MatrixId, String>()

    fun setMap(map: MapStructure) {
        blockStatus = extractBlocks(map)
        semaphoreStatus = extractSemaphores(map)
    }

    private fun extractBlocks(mapStruct: MapStructure): HashMap<MatrixId, RGBA> {
        val jsonObjectMap = MapParser.createParsedMap(mapStruct.map) as JsonObject
        val blocks = jsonObjectMap.array<JsonObject>("blockStatus") as JsonArray<JsonObject>
        val blockStatus = hashMapOf<MatrixId, RGBA>()

        for (block in blocks) {
            val color: JsonObject = block.obj("color")!!
            blockStatus.put(MatrixId(block.int("row")!!,block.int("column")!!), RGBA(color.int("R")!!, color.int("G")!!,
                    color.int("B")!!, color.int("A")!!))
        }

        return  blockStatus
    }

    private fun extractSemaphores(mapStruct: MapStructure): HashMap<MatrixId, String>{
        val jsonObjectMap = MapParser.createParsedMap(mapStruct.map) as JsonObject
        val semaphores = jsonObjectMap.array<JsonObject>("semaphoreStatus") as JsonArray<JsonObject>
        val semaphoreStatus = hashMapOf<MatrixId, String>()

        for (semaphore in semaphores) {
            semaphoreStatus.put(MatrixId(semaphore.int("row")!!,semaphore.int("column")!!), semaphore.string("state")!!)
        }

        return  semaphoreStatus
    }
}


