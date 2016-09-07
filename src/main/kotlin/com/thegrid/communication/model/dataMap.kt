package com.thegrid.communication.model

class dataMap {
    var nombre = ""
    var callesHorizontales = mutableListOf<dataStreet>()
    var callesVerticales = mutableListOf<dataStreet>()
    var nodosEntrada = mutableListOf<dataEdgeNode>()
    var nodosSalida = mutableListOf<dataEdgeNode>()
    var nodosSemaforo = mutableListOf<dataSemaphoreNode>()
    var nodosNoSemaforo = mutableListOf<dataControlNode>()
}