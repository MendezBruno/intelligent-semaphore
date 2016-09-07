package com.thegrid.communication.model

class dataStreet {
    var cantCarriles = 1
    var preferencia = 0
    var sentido = ""
    var sentidosPosibles = mutableListOf<String>() //TODO para que sirve esto?
    var cuadras = mutableListOf<dataBlock>()
}