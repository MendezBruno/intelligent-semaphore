package com.thegrid.communication.controller

import com.google.api.server.spi.config.Api
import com.google.api.server.spi.config.ApiMethod
import com.google.api.server.spi.config.ApiNamespace
import com.google.api.server.spi.config.Named
import com.thegrid.communication.model.SimulacionUpdate
import com.thegrid.behavior.platform.Simulation
import com.thegrid.behavior.platform.Orchestrator
import com.thegrid.behavior.platform.TipoEjecucion
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
            "REANUDAR" -> Simulation.SharedInstance?.reanudar()
            "DETENER" -> Simulation.SharedInstance?.pausar()
            "AVANZAR" -> Simulation.SharedInstance?.dispatcher?.processEvent()
            "BAJAR" -> Simulation.SharedInstance?.restarTiempo(simulacionUpdate.nuevoTiempo)
            "DETENERRED" -> Simulation.SharedInstance?.rna?.detenerEntrenamiento()
            else -> Simulation.SharedInstance?.sumarTiempo (simulacionUpdate.nuevoTiempo)
        }
    }
    @ApiMethod(name = "getTEF", path = "tef", httpMethod = ApiMethod.HttpMethod.GET)
    fun getTEF(): MutableList<tefRow>? {
        return Simulation.SharedInstance?.dispatcher?.getSummary()
    }
    @ApiMethod(name = "putModo", path = "modoUpdate", httpMethod = ApiMethod.HttpMethod.PUT)
    fun putModo(@Named("modo") modoUpdate: TipoEjecucion) {
        val sharedInstance = Simulation.SharedInstance
        if (sharedInstance != null){
            System.err.println("Modo de ejecucion cambiado a $modoUpdate")
            sharedInstance.tipoEjecucion = modoUpdate
        } else
            System.err.println("Cambiar tipoEjecucion: No hay simulacion en ejecucion")
    }
}


