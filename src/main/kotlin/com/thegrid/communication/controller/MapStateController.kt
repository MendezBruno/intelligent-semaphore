package com.thegrid.communication.controller

import com.google.api.server.spi.config.Api
import com.google.api.server.spi.config.ApiMethod
import com.google.api.server.spi.config.ApiNamespace
import com.thegrid.behavior.model.SimulationMock
import com.thegrid.behavior.platform.Simulation
import com.thegrid.communication.model.MapState

@Api(name = "intelligentsemaphore", version = "v1",
        namespace = ApiNamespace(ownerDomain = "com.thegrid.intelligentsemaphore",
        ownerName = "com.thegrid.intelligentsemaphore", packagePath = ""))
class MapStateController{

    @ApiMethod(name = "mapstate", path="mapState", httpMethod = ApiMethod.HttpMethod.GET)
    fun getMapState(): MapState? {
        return Simulation.SharedInstance?.memory?.getStatus()
    }
}