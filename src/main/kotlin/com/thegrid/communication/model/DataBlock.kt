package com.thegrid.communication.model

import com.google.api.server.spi.config.ApiResourceProperty

class dataBlock() {

    public var id:String="";

    @ApiResourceProperty(name = "longitud")
    public var length:Int= 100;

    @ApiResourceProperty(name = "nodoOrigen")
    public var sourceNode:String= "";

    @ApiResourceProperty(name = "nodoDestino")
    public var destinyNode:String= "";
}