package com.thegrid.communication.model

import com.github.salomonbrys.kotson.fromJson
import com.google.gson.Gson
import com.thegrid.behavior.model.Map
import com.thegrid.communication.services.MapConversor

class GeneradorMocks {

    val mapaUnoPorUnoJson: String

    init {
        mapaUnoPorUnoJson =
            "{'callesHorizontales':[{'cantCarriles':3,'sentido':'Oeste-Este','cuadras':[" +
                "{'longitud':100,'id':'cuadra-1','nodoOrigen':'nodo-1','nodoDestino':'nodo-3'}," +
                "{'longitud':100,'id':'cuadra-2','nodoOrigen':'nodo-3','nodoDestino':'nodo-2'}],'preferencia':1,'sentidosPosibles':['Este-Oeste','Oeste-Este']}]," +
            "'callesVerticales':[{'cantCarriles':2,'sentido':'Norte-Sur','cuadras':[" +
                "{'longitud':100,'id':'cuadra-13','nodoOrigen':'nodo-16','nodoDestino':'nodo-3'}," +
                "{'longitud':100,'id':'cuadra-14','nodoOrigen':'nodo-3','nodoDestino':'nodo-17'}],'preferencia':4,'sentidosPosibles':['Norte-Sur','Sur-Norte']}]," +
            "'nodosEntrada':[" +
                "{'id':'nodo-1','cantMaxima':'10','intervalo':'20'}," +
                "{'id':'nodo-16','cantMaxima':'1','intervalo':'1'}]," +
            "'nodosSalida':[" +
                "{'id':'nodo-2','cantMaxima':'3','intervalo':'3'}," +
                "{'id':'nodo-17','cantMaxima':'1','intervalo':'1'}]," +
            "'nodosSemaforo':[{'id':'nodo-3','tiempoHorizontal':4,'tiempoVertical':4}]," +
            "'nodosNoSemaforo':[],'nombre':'Prueba 1x1'}"
    }

    fun getMapaUnoPorUno(): Map {
        val frontendMap = Gson().fromJson<dataMap>(mapaUnoPorUnoJson);
        return MapConversor.convert(frontendMap)
    }
}
