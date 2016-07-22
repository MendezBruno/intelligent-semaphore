package com.thegrid.communication.service

import com.google.appengine.repackaged.com.google.api.client.json.Json
import com.thegrid.communication.extension.MatrixId
import com.thegrid.communication.extension.RGB
import java.util.*

/**
 * Created by Surakituaka on 21/07/2016.
 */


class MapParser(val blockMap: HashMap<MatrixId, RGB>, semaphoreMap: HashMap<MatrixId, Boolean>) {

    fun parseToJson(): Json {


        return Json()
    }


}