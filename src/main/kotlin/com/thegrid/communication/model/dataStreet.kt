package com.thegrid.communication.model

class dataStreet {
    public var cantCarriles:Int=1
    public var preferencia:Int=0
    public var sentido:String=""
    public var sentidosPosibles: MutableList<String> = mutableListOf() //TODO para que sirve esto?
    public var cuadras:MutableList<dataBlock> = mutableListOf()
}