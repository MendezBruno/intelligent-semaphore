package com.thegrid.communication.service

import com.beust.klaxon.JsonArray
import com.beust.klaxon.JsonObject
import com.beust.klaxon.Parser
import com.thegrid.communication.model.MapState
import java.io.InputStream

/**
 * Created by Surakituaka on 21/07/2016.
 */

class MapParser(val map: MapState) {

    fun parseToJson(): String {

        var blockStatus = JsonArray<JsonObject>()
        var semaphoreStatus = JsonArray<JsonObject>()
        val blockKeys = map.blockStatus.keys

        for (key in blockKeys){
            val color = JsonObject()
            color.put("R", map.blockStatus[key]?.r)
            color.put("G", map.blockStatus[key]?.g)
            color.put("B", map.blockStatus[key]?.b)
            color.put("A", map.blockStatus[key]?.a)

            val block = JsonObject()
            block.put("row",key.row)
            block.put("column",key.column)
            block.put("color",color)
            blockStatus.add(block)
        }

        val semaphoreKeys = map.semaphoreStatus.keys
        for (key in semaphoreKeys){
            val semaphore = JsonObject()
            semaphore.put("row",key.row)
            semaphore.put("column",key.column)
            semaphore.put("state",map.semaphoreStatus[key])
            semaphoreStatus.add(semaphore)
        }

        var parsedMap = JsonObject()

        parsedMap.map.put("blockStatus",blockStatus)
        parsedMap.map.put("semaphoreStatus",semaphoreStatus)

        return parsedMap.toJsonString()
    }

    companion object {
        fun createParsedMap(jsonMap: InputStream) : Any {
            return Parser().parse(jsonMap)!!
        }
    }
}