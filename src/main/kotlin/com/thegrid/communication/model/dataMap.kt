package com.thegrid.communication.model

import com.google.api.server.spi.config.ApiResourceProperty

class dataMap{
    public var nombre = "";
    public var callesHorizontales: MutableList<dataStreet> = mutableListOf();
    public var callesVerticales: MutableList<dataStreet> = mutableListOf();
    public var nodosEntrada: MutableList<dataEdgeNode> = mutableListOf();
    public var nodosSalida: MutableList<dataEdgeNode> = mutableListOf();
    public var nodosSemaforo: MutableList<dataSemaphoreNode> = mutableListOf();
    public var nodosNoSemaforo: MutableList<dataControlNode> = mutableListOf();

    companion object
}