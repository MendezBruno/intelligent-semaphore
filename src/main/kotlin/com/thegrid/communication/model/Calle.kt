package com.thegrid.communication.model

/**
 * Created by Ezequiel on 20/08/2016.
 */

class Calle(cantCarriles:Int=1,
            preferencia:Int=0, sentido:String="",
            sentidosPosibles:Array<String> = arrayOf(),
            cuadras:Array<Cuadra> = arrayOf()) {
    public var cantCarriles = cantCarriles;
    public var preferencia = preferencia;
    public var sentido = sentido;
    public var sentidosPosibles = sentidosPosibles;
    public var cuadras = cuadras;
}