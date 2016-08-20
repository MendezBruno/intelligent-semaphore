package com.thegrid.communication.model

import com.google.api.server.spi.config.ApiResourceProperty

/**
 * Created by Ezequiel on 20/08/2016.
 */

class dataStreet {

    @ApiResourceProperty(name = "cantCarriles")
    public var linesAmout:Int=1;

    @ApiResourceProperty(name = "preferencia")
    public var preference:Int=0;

    @ApiResourceProperty(name = "sentido")
    public var sense:String="";

    @ApiResourceProperty(name = "sentidosPosibles")
    public var posibleSenses:Array<String> = arrayOf();

    @ApiResourceProperty(name = "cuadras")
    public var blocks:Array<dataBlock> = arrayOf();
}