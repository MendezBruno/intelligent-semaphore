package com.thegrid.communication.model

import com.beust.klaxon.*
import com.thegrid.communication.extension.MatrixId
import com.thegrid.communication.model.Street
import com.thegrid.communication.extension.RGBA
import com.thegrid.communication.service.MapStateParser
import java.util.*

/**
 * Created by Surakituaka on 01/08/2016.
 */

class Map private constructor() {

    private object Holder { val INSTANCE = Map() }

    companion object {
        val SharedInstance: Map by lazy { Holder.INSTANCE }
    }

    var mapState: MapState = MapState.SharedInstance
    var streets = hashMapOf<MatrixId,Street>()

    fun setMap(map: MapStructure) {
        mapState = extractMapState(map)

    }

    private fun extractMapState(mapState: MapStructure): MapState {/**
        val jsonObjectMap = MapStateParser.createParsedMap(mapStruct.map) as JsonObject
        val blocks = jsonObjectMap.array<JsonObject>("blockStatus") as JsonArray<JsonObject>
        val blockStatus = hashMapOf<MatrixId, RGBA>()

        for (block in blocks) {
            val color: JsonObject = block.obj("color")!!
            blockStatus.put(MatrixId(block.int("row")!!,block.int("column")!!), RGBA(color.int("R")!!, color.int("G")!!,
                    color.int("B")!!, color.int("A")!!))
        }

        return  blockStatus*/
    }





}
