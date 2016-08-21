package com.thegrid.communication.model

import com.google.api.server.spi.config.ApiResourceProperty

class dataMap{
    public var nombre = "";
    public var callesHorizontales: Array<dataStreet> = arrayOf();
    public var callesVerticales: Array<dataStreet> = arrayOf();
    public var nodosEntrada: Array<dataEdgeNode> = arrayOf();
    public var nodosSalida: Array<dataEdgeNode> = arrayOf();
    public var nodosSemaforo: Array<dataSemaphoreNode> = arrayOf();
    public var nodosNoSemaforo: Array<dataControlNode> = arrayOf();
}