package com.thegrid.communication.controller

import com.google.api.server.spi.config.Api
import com.google.api.server.spi.config.ApiMethod
import com.google.api.server.spi.config.ApiNamespace
import com.google.api.server.spi.config.Named
import com.google.api.server.spi.response.BadRequestException
import com.thegrid.behavior.platform.Simulation
import com.thegrid.communication.model.dataMap
import com.thegrid.communication.services.MapConversor
import javax.servlet.http.HttpServletRequest

@Api(name = "intelligentsemaphore", version = "v1",
    namespace = ApiNamespace(ownerDomain = "com.thegrid.intelligentsemaphore",
    ownerName = "com.thegrid.intelligentsemaphore", packagePath = ""))
class MapController {

    @ApiMethod(name = "map", path="map", httpMethod = ApiMethod.HttpMethod.POST)
    fun postMap(dataMap: dataMap, req: HttpServletRequest) {
        var map = MapConversor.convert(dataMap)
        if (map.id == "") {
            System.err.println("Se ha pasado un mapa sin id. Acción denegada")
            return
        }
        Simulation.SharedInstance?.reanudar()
        Simulation.SharedInstance?.correr = false
        Simulation(map)
    }

    @ApiMethod(name = "deleteRna", path="rna", httpMethod = ApiMethod.HttpMethod.DELETE)
    fun deleteRna(@Named("id") id: String) {
        Simulation.SharedInstance?.rna?.pers?.eliminar(id);
    }
}