package com.thegrid.communication.controller

/**
 * Created by bruno on 22/09/16.
 */
import com.google.api.server.spi.config.Api
import com.google.api.server.spi.config.ApiMethod
import com.google.api.server.spi.config.ApiNamespace
import com.thegrid.behavior.platform.Simulation
import com.thegrid.communication.model.dataEdgeNode

@Api(name = "intelligentsemaphore", version = "v1",
        namespace = ApiNamespace(ownerDomain = "com.thegrid.intelligentsemaphore",
                ownerName = "com.thegrid.intelligentsemaphore", packagePath = ""))
class NodoBordeUpdateController {
        @ApiMethod(name = "nodoBorde", path = "nodoBorde", httpMethod = ApiMethod.HttpMethod.POST)
        fun postUpdateNodoBorde(nodoBordeUpdate: dataEdgeNode) {
            println("+++++++++++++++++++++++++++++++++++++++++++++++++++++")
            println("Se cambia el nodo ${nodoBordeUpdate.id} " +
                    "intervalo: ${nodoBordeUpdate.intervalo} " +
                    "cant: ${nodoBordeUpdate.cantMaxima}")
            println("+++++++++++++++++++++++++++++++++++++++++++++++++++++")
            Simulation.SharedInstance?.map?.setFdpValue(nodoBordeUpdate)
        }
    }

