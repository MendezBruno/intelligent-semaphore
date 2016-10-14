package com.thegrid.communication.controller

import com.google.api.server.spi.config.Api
import com.google.api.server.spi.config.ApiMethod
import com.google.api.server.spi.config.ApiNamespace
import com.thegrid.behavior.platform.Simulation
import com.thegrid.communication.model.Resultado

/**
 * Created by bruno on 13/10/16.
 */
@Api(name = "intelligentsemaphore", version = "v1",
        namespace = ApiNamespace(ownerDomain = "com.thegrid.intelligentsemaphore",
                ownerName = "com.thegrid.intelligentsemaphore", packagePath = ""))

class ResultadoController {

    @ApiMethod(name = "getResultado", path = "resultado", httpMethod = ApiMethod.HttpMethod.GET)
    fun getResultado(): Resultado {
        return Simulation.SharedInstance?.resultado!!
    }

}