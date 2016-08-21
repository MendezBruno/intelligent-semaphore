package com.thegrid.communication.model

class dataStreet {
    public var cantCarriles:Int=1;
    public var preferencia:Int=0;
    public var sentido:String="";
    public var sentidosPosibles:Array<String> = arrayOf();
    public var cuadras:Array<dataBlock> = arrayOf();
}