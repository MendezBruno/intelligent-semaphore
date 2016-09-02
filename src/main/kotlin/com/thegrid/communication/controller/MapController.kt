package com.thegrid.communication.controller

import com.google.api.server.spi.config.Api
import com.google.api.server.spi.config.ApiMethod
import com.google.api.server.spi.config.ApiNamespace
import com.thegrid.behavior.model.SimulationMock
import com.thegrid.behavior.model.Map
import com.thegrid.behavior.plattform.Simulation
import com.thegrid.communication.model.dataMap
import com.thegrid.communication.services.MapConversor

@Api(name = "intelligentsemaphore", version = "v1",
    namespace = ApiNamespace(ownerDomain = "com.thegrid.intelligentsemaphore",
    ownerName = "com.thegrid.intelligentsemaphore", packagePath = ""))
class MapController {

    @ApiMethod(name = "map", path="map", httpMethod = ApiMethod.HttpMethod.POST)
    fun postMap(dataMap: dataMap) {
        var map = MapConversor.convert(dataMap)
//        SimulationMock.loadSimulation(map)
        Simulation(map)
    }
}