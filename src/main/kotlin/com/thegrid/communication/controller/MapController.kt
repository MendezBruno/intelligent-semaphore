package com.thegrid.communication.controller

import com.google.api.server.spi.config.Api
import com.google.api.server.spi.config.ApiMethod
import com.google.api.server.spi.config.ApiNamespace
import com.thegrid.communication.model.*

@Api(name = "intelligentsemaphore", version = "v1",
    namespace = ApiNamespace(ownerDomain = "com.thegrid.intelligentsemaphore",
    ownerName = "com.thegrid.intelligentsemaphore", packagePath = ""))
class MapController {
    @ApiMethod(name = "map", httpMethod = ApiMethod.HttpMethod.POST)
    fun postMap(map: dataMap): dataMap {
        return map;
    }

    @ApiMethod(name = "maptest", httpMethod = ApiMethod.HttpMethod.GET)
    fun getMapTest(): dataMap {
        val dBlock1 = dataBlock();
        dBlock1.id = "1";
        val dBlock2 = dataBlock();
        dBlock2.id = "2";
        val dStreet1 = dataStreet();
        dStreet1.cuadras = mutableListOf(dBlock1);
        dStreet1.sentidosPosibles = mutableListOf("Norte-Sur", "Sur-Norte");
        val dStreet2 = dataStreet();
        dStreet2.cuadras = mutableListOf(dBlock2);
        dStreet2.sentidosPosibles = mutableListOf("Norte-Sur", "Sur-Norte");
        val dSemaphoreNode = dataSemaphoreNode();
        val dNonSemaphoreNode = dataControlNode();
        val dEntryNode = dataEdgeNode();
        val dEndNode = dataEdgeNode();
        val dMap = dataMap();
        dMap.callesHorizontales = mutableListOf(dStreet1);
        dMap.callesVerticales = mutableListOf(dStreet2);
        dMap.nodosEntrada = mutableListOf(dEntryNode);
        dMap.nodosSalida = mutableListOf(dEndNode);
        dMap.nodosSemaforo = mutableListOf(dSemaphoreNode);
        dMap.nodosNoSemaforo = mutableListOf(dNonSemaphoreNode);
        dMap.nombre="San Telmo";
        return dMap;
    }
}