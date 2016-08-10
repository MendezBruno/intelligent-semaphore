package com.thegrid.communication.service

import com.beust.klaxon.Parser
import java.io.InputStream

/**
 * Created by Surakituaka on 05/08/2016.
 */

class MapParser() {

    companion object {
        fun CreateKlaxonMap(jsonMap: String) : Any {
            val streamMap: InputStream = jsonMap.byteInputStream()

            return Parser().parse(streamMap)!!
        }
    }
}