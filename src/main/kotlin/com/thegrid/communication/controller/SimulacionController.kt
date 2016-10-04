package com.thegrid.communication.controller

import com.google.api.server.spi.config.Api
import com.google.api.server.spi.config.ApiMethod
import com.google.api.server.spi.config.ApiNamespace
import com.thegrid.communication.model.SimulacionUpdate
import com.thegrid.behavior.platform.Simulation
import com.thegrid.behavior.platform.Orchestrator
import com.thegrid.communication.model.tefRow

/**
 * Created by bruno on 22/09/16.
 */
@Api(name = "intelligentsemaphore", version = "v1",
        namespace = ApiNamespace(ownerDomain = "com.thegrid.intelligentsemaphore",
                ownerName = "com.thegrid.intelligentsemaphore", packagePath = ""))
class SimulacionController {
    @ApiMethod(name = "simulacionUpdate", path = "simulacionUpdate", httpMethod = ApiMethod.HttpMethod.POST)
    fun postUpdateSimulacion(simulacionUpdate: SimulacionUpdate) {
        when (simulacionUpdate.operacion) {
            "REANUDAR" -> Simulation.SharedInstance?.reanudar()   //todo Pedir permiso para ejecutar la reanudacion posta del hilo
            "DETENER" -> Simulation.SharedInstance?.pausar()  //todo pedir permiso para ejectar la la detencion posta del hilo
//            "REANUDAR" -> Simulation.SharedInstance?.restarTiempo(0)
//            in "DETENER" -> Simulation.SharedInstance?.sumarTiempo(999900000)
            "AVANZAR" -> Simulation.SharedInstance?.dispatcher?.processEvent()
            "BAJAR" -> Simulation.SharedInstance?.restarTiempo(simulacionUpdate.nuevoTiempo)
            else -> Simulation.SharedInstance?.sumarTiempo (simulacionUpdate.nuevoTiempo)
        }
    }

    @ApiMethod(name = "getTEF", path = "tef", httpMethod = ApiMethod.HttpMethod.GET)
    fun getTEF(): MutableList<tefRow>? {
        return Simulation.SharedInstance?.dispatcher?.getSummary()
    }
}


