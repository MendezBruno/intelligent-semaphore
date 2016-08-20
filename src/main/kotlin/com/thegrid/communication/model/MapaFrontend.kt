package com.thegrid.communication.model

/**
 * Created by Ezequiel on 20/08/2016.
 */

class MapaFrontend(nombre:String="",
                   callesHorizontales: Array<Calle> = arrayOf(),
                   callesVerticales: Array<Calle> = arrayOf(),
                   nodosEntrada: Array<NodoBorde> = arrayOf(),
                   nodosSalida: Array<NodoBorde> = arrayOf(),
                   nodosSemaforo: Array<NodoControl> = arrayOf(),
                   nodosNoSemaforo: Array<NodoControl> = arrayOf()) {
    public var callesHorizontales = callesHorizontales;
    public var callesVerticales = callesVerticales;
    public var nodosEntrada = nodosEntrada;
    public var nodosSalida = nodosSalida;
    public var nodosSemaforo = nodosSemaforo;
    public var nodosNoSemaforo = nodosNoSemaforo;
}