package com.thegrid.communication.model

/**
 * Created by Surakituaka on 21/07/2016.
 */

class MapState private constructor() {

    private object Holder { val INSTANCE = MapState() }

    companion object {
        val SharedInstance: MapState by lazy { Holder.INSTANCE }
    }

    public var blockStatus : MutableList<dataBlockStatus> = mutableListOf();
    public var semaphoreStatus : MutableList<dataSemaphoreStatus> = mutableListOf();
}


