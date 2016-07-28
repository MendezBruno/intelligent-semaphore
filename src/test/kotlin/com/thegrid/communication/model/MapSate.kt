package com.thegrid.communication.model

import com.thegrid.communication.extension.MatrixId
import com.thegrid.communication.extension.RGBA
import com.thegrid.communication.service.MapParser
import org.jetbrains.spek.api.Spek

/**
 * Created by Surakituaka on 27/07/2016.
 */

class TestMapState: Spek({
    given("a maptatet") {
        var blockStatus = hashMapOf<MatrixId, RGBA>()
        var semaphoreStatus = hashMapOf<MatrixId, String>()
        val mapState: MapState = MapState.SharedInstance

        blockStatus.put(MatrixId(1,1), RGBA(255,255,255,0))
        blockStatus.put(MatrixId(2,2), RGBA(100,100,100,0))

        semaphoreStatus.put(MatrixId(1,1),"HORIZONTAL")
        semaphoreStatus.put(MatrixId(2,2),"VERTICAL")

        mapState.blockStatus = blockStatus
        mapState.semaphoreStatus = semaphoreStatus


        on("parsing to json") {
            val parser: MapParser = MapParser(mapState)
            var inputStreamMap = parser.parseToJson()

            val reader = inputStreamMap.reader()
            var jsonMap = reader.readText()

           // println(jsonMap)

            it("should return the parsed map") {
                val parsedMap: String ="{\"blockStatus\":[{\"row\":1,\"column\":1,\"color\":{\"R\":255,\"G\":255,\"B\":255," +
                        "\"A\":0}},{\"row\":2,\"column\":2,\"color\":{\"R\":100,\"G\":100,\"B\":100,\"A\":0}}]," +
                        "\"semaphoreStatus\":[{\"row\":1,\"column\":1,\"state\":\"HORIZONTAL\"},{\"row\":2,\"column" +
                        "\":2,\"state\":\"VERTICAL\"}]}"

                assert(jsonMap.equals(parsedMap))
            }
        }

        on("creating a mapState from json"){
            val parser: MapParser = MapParser(mapState)
            val mapStructure: MapStructure = MapStructure(parser.parseToJson())

            var newMapState: MapState = MapState.SharedInstance
            newMapState.setMap(mapStructure)

            //newMapState.blockStatus.forEach { matrixId, rgb -> println(matrixId.toString() +" ||| "+ rgb.toString())  }

            it("should return the map as object"){
                assert(newMapState.blockStatus.contains(MatrixId(1,1)))
            }
        }
    }
})