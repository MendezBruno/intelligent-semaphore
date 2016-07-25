package com.thegrid.communication.service

import com.beust.klaxon.JsonArray
import com.beust.klaxon.JsonObject
import com.beust.klaxon.Parser
import com.thegrid.communication.model.MapState


/**
 * Created by Surakituaka on 21/07/2016.
 */


class MapParser(val map: MapState) {

    fun parseToJson(): String {

        var blockStatus = JsonArray<JsonObject>()
        var semaphoreStatus = JsonArray<JsonObject>()



        val blockKeys = map.blockStatus.keys
        for (key in blockKeys){
            val block = JsonObject()
            block.put(key.toString(),map.blockStatus[key])
            blockStatus.add(block)
        }

        val semaphoreKeys = map.semaphoreStatus.keys
        for (key in semaphoreKeys){
            val semaphore = JsonObject()
            semaphore.put(key.toString(),map.semaphoreStatus[key])
            semaphoreStatus.add(semaphore)
        }

        var map = JsonObject()

        map.map.put("blockStatus",blockStatus)
        map.map.put("semaphoreStatus",semaphoreStatus)


        return map.toJsonString()
    }

    companion object {
        fun createMapParser(jsonMap: String) : Any {
            return Parser().parse(jsonMap)!!
        }
    }


}