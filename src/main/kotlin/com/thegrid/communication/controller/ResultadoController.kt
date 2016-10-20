package com.thegrid.communication.controller

import com.google.api.server.spi.config.Api
import com.google.api.server.spi.config.ApiMethod
import com.google.api.server.spi.config.ApiNamespace
import com.google.api.server.spi.config.Named
import com.thegrid.behavior.platform.Simulation
import com.thegrid.communication.model.Resultado
import com.thegrid.ia.model.Cromosoma

/**
 * Created by bruno on 13/10/16.
 */
@Api(name = "intelligentsemaphore", version = "v1",
        namespace = ApiNamespace(ownerDomain = "com.thegrid.intelligentsemaphore",
                ownerName = "com.thegrid.intelligentsemaphore", packagePath = ""))

class ResultadoController {

    @ApiMethod(name = "getResultado", path = "resultados", httpMethod = ApiMethod.HttpMethod.GET)
    fun getResultado(): Resultado? {
        return Simulation.SharedInstance?.resultado?.getResultadoCompactado()
    }

    @ApiMethod(name = "getResultadoEstresante", path = "resultadoEstresante", httpMethod = ApiMethod.HttpMethod.GET)
    fun getResultadoEstresante(@Named("n") n: Integer) : Resultado {
        var r = Resultado()
        for (i in 0..n.toInt()) {
            r.tiempoCongestion.add(Resultado.TiempoCongestion(Double.MAX_VALUE, Double.MAX_VALUE))
            r.tiempoCongestionXcuadra.add(Resultado.TiempoCongestionXcuadra("cuadra-xxx", Resultado.TiempoCongestion(Double.MAX_VALUE, Double.MAX_VALUE)))
            var cromosoma = Cromosoma()
            cromosoma.aptitud = Double.MAX_VALUE
            for (j in 0..199) cromosoma.genes.add(Double.MAX_VALUE)
            r.tiempoCromosomaAptitud.add(Resultado.TiempoCromosomaAptitud(Double.MAX_VALUE, cromosoma, Int.MAX_VALUE))
            r.tiempoVelocidad.add(Resultado.TiempoVelocidad(Double.MAX_VALUE, Double.MAX_VALUE))
            r.tiempoVelocidadXCuadra.add(Resultado.TiempoVelocidadXcuadra("cuadra-xxx", Resultado.TiempoVelocidad(Double.MAX_VALUE, Double.MAX_VALUE)))
        }
        return r
    }

    @ApiMethod(name = "getResultadoEstresanteCompactado", path = "resultadoEstresanteCompactado", httpMethod = ApiMethod.HttpMethod.GET)
    fun getResultadoEstresanteCompactado(@Named("n") n: Integer) : Resultado {
        return getResultadoEstresante(n).getResultadoCompactado()
    }
}
