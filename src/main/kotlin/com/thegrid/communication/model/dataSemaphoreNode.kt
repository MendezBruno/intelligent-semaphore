package com.thegrid.communication.model

import com.google.api.server.spi.config.ApiResourceProperty

class dataSemaphoreNode{

    public var id:String="";

    @ApiResourceProperty(name = "tiempoHorizontal")
    public var hTime:Int=150;

    @ApiResourceProperty(name = "tiempoVertical")
    public var vTime:Int=150;
}