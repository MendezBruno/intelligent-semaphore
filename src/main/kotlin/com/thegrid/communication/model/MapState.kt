package com.thegrid.communication.model

/**
 * Created by Surakituaka on 21/07/2016.
 */

class MapState() {

    public val blockStatus : MutableList<dataBlockStatus> = mutableListOf()
    public val semaphoreStatus : MutableList<dataSemaphoreStatus> = mutableListOf()
}


