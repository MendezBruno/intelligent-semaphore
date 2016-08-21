package com.thegrid.communication.controller

import com.google.api.server.spi.config.Api
import com.google.api.server.spi.config.ApiMethod
import com.google.api.server.spi.config.ApiNamespace
import com.thegrid.communication.model.MapState
import com.thegrid.communication.model.dataBlockStatus
import com.thegrid.communication.model.dataSemaphoreStatus

@Api(name = "intelligentsemaphore", version = "v1",
        namespace = ApiNamespace(ownerDomain = "com.thegrid.intelligentsemaphore",
        ownerName = "com.thegrid.intelligentsemaphore", packagePath = ""))
class MapStateController{

    @ApiMethod(name = "mapstate", httpMethod = ApiMethod.HttpMethod.GET)
    fun getMapState(): MapState {
        var mapState = MapState.SharedInstance;
        mapState.blockStatus.add(dataBlockStatus());
        mapState.semaphoreStatus.add(dataSemaphoreStatus())
        return mapState;
    }
}