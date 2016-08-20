package com.thegrid.communication.controller

import com.google.api.server.spi.config.Api
import com.google.api.server.spi.config.ApiMethod
import com.google.api.server.spi.config.ApiNamespace
import com.thegrid.communication.model.*

/**
 * Created by Surakituaka on 01/08/2016.
 */

@Api(name = "intelligentsemaphore", version = "v1",
        namespace = ApiNamespace(ownerDomain = "helloworld.example.com",
                ownerName = "helloworld.example.com", packagePath = ""))
class MapController {
    @ApiMethod(name = "mapa", httpMethod = ApiMethod.HttpMethod.POST)
    fun postMapa(mapa:MapaFrontend): MapaFrontend {
        return mapa;
    }

    @ApiMethod(name = "mapatest", httpMethod = ApiMethod.HttpMethod.GET)
    fun getMapaTest(): MapaFrontend {
        return MapaFrontend("San telmo",
                arrayOf(Calle(10,5,"Norte-Sur",
                        arrayOf("Norte-Sur", "Sur-Norte"),
                        arrayOf(Cuadra("4",100,"7","8")))),
                arrayOf(Calle(10,5,"Norte-Sur",
                        arrayOf("Norte-Sur", "Sur-Norte"),
                        arrayOf(Cuadra("4",100,"9","10")))),
                arrayOf(NodoBorde("7")),
                arrayOf(NodoBorde("8")),
                arrayOf(NodoControl("9")),
                arrayOf(NodoControl("10")));
    }
}