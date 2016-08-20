package com.thegrid.communication.model

import com.google.api.server.spi.config.ApiResourceProperty

class dataEdgeNode{
    public var id:String = "";

    @ApiResourceProperty(name = "cantMaxima")
    public var maxAmount = 5;

    @ApiResourceProperty(name = "intervalo")
    public var interval = 3;
}