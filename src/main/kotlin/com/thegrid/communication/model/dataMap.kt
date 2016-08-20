package com.thegrid.communication.model

import com.google.api.server.spi.config.ApiResourceProperty

class dataMap{

    private var name = "";

    @ApiResourceProperty(name = "nombre")
    public fun getName():String {
        return name;
    }

    @ApiResourceProperty(name = "nombre")
    public fun setName(name:String) {
        this.name = name;
    }

    @ApiResourceProperty(name = "callesHorizontales")
    public var hStreets: Array<dataStreet> = arrayOf();

    @ApiResourceProperty(name = "callesVerticales")
    public var vStreets: Array<dataStreet> = arrayOf();

    @ApiResourceProperty(name = "nodosEntrada")
    public var entryNodes: Array<dataEdgeNode> = arrayOf();

    @ApiResourceProperty(name = "nodosSalida")
    public var endNodes: Array<dataEdgeNode> = arrayOf();

    @ApiResourceProperty(name = "nodosSemaforo")
    public var semaphoreNodes: Array<dataSemaphoreNode> = arrayOf();

    @ApiResourceProperty(name = "nodosNoSemaforo")
    public var nonSemaphoreNodes: Array<dataControlNode> = arrayOf();
}