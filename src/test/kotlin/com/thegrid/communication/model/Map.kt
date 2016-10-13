package com.thegrid.communication.model

import com.github.salomonbrys.kotson.*
import com.google.gson.Gson
import com.thegrid.communication.services.MapConversor
import org.jetbrains.spek.api.Spek

/**
 * Created by Surakituaka on 05/08/2016.
 */

class TestMap: Spek({
    given("a json map") {

        val jsonMap: String ="{'callesHorizontales':[{'cantCarriles':2,'sentido':'Oeste-Este','cuadras':[{'longitud':100,'id':'cuadra-1','nodoOrigen':'nodo-1','nodoDestino':'nodo-3'},{'longitud':100,'id':'cuadra-2','nodoOrigen':'nodo-3','nodoDestino':'nodo-4'},{'longitud':100,'id':'cuadra-3','nodoOrigen':'nodo-4','nodoDestino':'nodo-5'},{'longitud':100,'id':'cuadra-4','nodoOrigen':'nodo-5','nodoDestino':'nodo-2'}],'preferencia':1,'sentidosPosibles':['Este-Oeste','Oeste-Este']},{'cantCarriles':2,'sentido':'Oeste-Este','cuadras':[{'longitud':100,'id':'cuadra-5','nodoOrigen':'nodo-6','nodoDestino':'nodo-8'},{'longitud':100,'id':'cuadra-6','nodoOrigen':'nodo-8','nodoDestino':'nodo-9'},{'longitud':100,'id':'cuadra-7','nodoOrigen':'nodo-9','nodoDestino':'nodo-10'},{'longitud':100,'id':'cuadra-8','nodoOrigen':'nodo-10','nodoDestino':'nodo-7'}],'preferencia':1,'sentidosPosibles':['Este-Oeste','Oeste-Este']},{'cantCarriles':2,'sentido':'Oeste-Este','cuadras':[{'longitud':100,'id':'cuadra-28','nodoOrigen':'nodo-25','nodoDestino':'nodo-22'},{'longitud':100,'id':'cuadra-29','nodoOrigen':'nodo-22','nodoDestino':'nodo-23'},{'longitud':100,'id':'cuadra-30','nodoOrigen':'nodo-23','nodoDestino':'nodo-24'},{'longitud':100,'id':'cuadra-31','nodoOrigen':'nodo-24','nodoDestino':'nodo-26'}],'preferencia':1,'sentidosPosibles':['Este-Oeste','Oeste-Este']}],'callesVerticales':[{'cantCarriles':2,'sentido':'Norte-Sur','cuadras':[{'longitud':100,'id':'cuadra-13','nodoOrigen':'nodo-16','nodoDestino':'nodo-3'},{'longitud':100,'id':'cuadra-14','nodoOrigen':'nodo-3','nodoDestino':'nodo-8'},{'longitud':100,'id':'cuadra-15','nodoOrigen':'nodo-8','nodoDestino':'nodo-22'},{'longitud':100,'id':'cuadra-25','nodoOrigen':'nodo-22','nodoDestino':'nodo-17'}],'preferencia':1,'sentidosPosibles':['Norte-Sur','Sur-Norte']},{'cantCarriles':2,'sentido':'Norte-Sur','cuadras':[{'longitud':100,'id':'cuadra-17','nodoOrigen':'nodo-18','nodoDestino':'nodo-4'},{'longitud':100,'id':'cuadra-18','nodoOrigen':'nodo-4','nodoDestino':'nodo-9'},{'longitud':100,'id':'cuadra-19','nodoOrigen':'nodo-9','nodoDestino':'nodo-23'},{'longitud':100,'id':'cuadra-26','nodoOrigen':'nodo-23','nodoDestino':'nodo-19'}],'preferencia':1,'sentidosPosibles':['Norte-Sur','Sur-Norte']},{'cantCarriles':2,'sentido':'Norte-Sur','cuadras':[{'longitud':100,'id':'cuadra-21','nodoOrigen':'nodo-20','nodoDestino':'nodo-5'},{'longitud':100,'id':'cuadra-22','nodoOrigen':'nodo-5','nodoDestino':'nodo-10'},{'longitud':100,'id':'cuadra-23','nodoOrigen':'nodo-10','nodoDestino':'nodo-24'},{'longitud':100,'id':'cuadra-27','nodoOrigen':'nodo-24','nodoDestino':'nodo-21'}],'preferencia':1,'sentidosPosibles':['Norte-Sur','Sur-Norte']}],'nodosEntrada':[{'id':'nodo-1','cantMaxima':1,'intervalo':5},{'id':'nodo-6','cantMaxima':1,'intervalo':5},{'id':'nodo-16','cantMaxima':1,'intervalo':5},{'id':'nodo-18','cantMaxima':1,'intervalo':5},{'id':'nodo-20','cantMaxima':1,'intervalo':5},{'id':'nodo-25','cantMaxima':1,'intervalo':5}],'nodosSalida':[{'id':'nodo-2','cantMaxima':1,'intervalo':5},{'id':'nodo-7','cantMaxima':1,'intervalo':5},{'id':'nodo-17','cantMaxima':1,'intervalo':5},{'id':'nodo-19','cantMaxima':1,'intervalo':5},{'id':'nodo-21','cantMaxima':1,'intervalo':5},{'id':'nodo-26','cantMaxima':1,'intervalo':5}],'nodosSemaforo':[{'id':'nodo-9','tiempoHorizontal':4,'tiempoVertical':4}],'nodosNoSemaforo':[{'id':'nodo-3','tiempoHorizontal':150,'tiempoVertical':150},{'id':'nodo-4','tiempoHorizontal':150,'tiempoVertical':150},{'id':'nodo-5','tiempoHorizontal':150,'tiempoVertical':150},{'id':'nodo-8','tiempoHorizontal':150,'tiempoVertical':150},{'id':'nodo-10','tiempoHorizontal':150,'tiempoVertical':150},{'id':'nodo-22','tiempoHorizontal':150,'tiempoVertical':150},{'id':'nodo-23','tiempoHorizontal':150,'tiempoVertical':150},{'id':'nodo-24','tiempoHorizontal':150,'tiempoVertical':150}],'nombre':'san telmo'}"

        on("creating a map object") {

            it("should return the the map with its name, streets, blocks and nodes") {
                //Simula ser el parser de GAE
                val frontendMap = Gson().fromJson<dataMap>(jsonMap);

                val map = MapConversor.convert(frontendMap);
                assert(map.name == "san telmo" && map.streets.count() == 6
                        && map.blocks.count() == 24 && map.id == "")
            }
        }
    }
})