package com.thegrid.communication.model

import com.github.salomonbrys.kotson.fromJson
import com.google.gson.Gson
import com.thegrid.communication.services.MapConversor
import com.thegrid.ia.model.Ag
import com.thegrid.ia.model.Cromosoma
import org.jetbrains.spek.api.Spek

/**
 * Created by bruno on 06/10/16.
 */
class AgTests: Spek({

    given("Un AG") {
        val jsonMap =
                "{'callesHorizontales':[{'cantCarriles':3,'sentido':'Oeste-Este','cuadras':[" +
                        "{'longitud':100,'id':'cuadra-1','nodoOrigen':'nodo-1','nodoDestino':'nodo-3'}," +
                        "{'longitud':100,'id':'cuadra-2','nodoOrigen':'nodo-3','nodoDestino':'nodo-2'}],'preferencia':1,'sentidosPosibles':['Este-Oeste','Oeste-Este']}]," +
                        "'callesVerticales':[{'cantCarriles':2,'sentido':'Norte-Sur','cuadras':[" +
                        "{'longitud':100,'id':'cuadra-13','nodoOrigen':'nodo-16','nodoDestino':'nodo-3'}," +
                        "{'longitud':100,'id':'cuadra-14','nodoOrigen':'nodo-3','nodoDestino':'nodo-17'}],'preferencia':4,'sentidosPosibles':['Norte-Sur','Sur-Norte']}]," +
                        "'nodosEntrada':[" +
                        "{'id':'nodo-1','cantMaxima':'10','intervalo':'1'}," +
                        "{'id':'nodo-16','cantMaxima':'4','intervalo':'1'}]," +
                        "'nodosSalida':[" +
                        "{'id':'nodo-2','cantMaxima':'3','intervalo':'3'}," +
                        "{'id':'nodo-17','cantMaxima':'1','intervalo':'1'}]," +
                        "'nodosSemaforo':[{'id':'nodo-3','tiempoHorizontal':4,'tiempoVertical':4}]," +
                        "'nodosNoSemaforo':[],'nombre':'Prueba 1x1'}"

        val frontendMap = Gson().fromJson<dataMap>(jsonMap);
        var map = MapConversor.convert(frontendMap)
        val ag = Ag(map)
        on("El mismo ag") {
            it("Debe crear una poblacion global con n Cromosomas donde cada cromosoma tiene un size de cant semaforos por 2") {
                val cantSemaforos = 4
                val cantCromosomas = 5
                ag.generarPoblacionGlobal(cantSemaforos,cantCromosomas)
                assert(ag.poblacionGlobal.all{ it.genes.size == 8 });

            }
            it("Debe crear una poblacion incial con los cromosomas por defecto que son 6 actualmente "){
                ag.generarPoblacionInicial()
                assert(ag.poblacion.size == 6 )
                ag.poblacion.removeAll { true }
            }
            it("Debe crear una poblacion incial con una cantidad n de cromosomas definidas por parametro"){
                ag.generarPoblacionInicial(8)
                assert(ag.poblacion.size == 8 )
            }
        }
        on("un Cromosoma"){
            it("Debe cruzar de manera simple 2 cromosomas"){
                var cromosoma: Cromosoma = Cromosoma()
                var cromosoma2: Cromosoma = Cromosoma()
                cromosoma.genes.add(1.0)
                cromosoma.genes.add(2.0)
                cromosoma2.genes.add(3.0)
                cromosoma2.genes.add(4.0)
                ag.cruzaStrategy.cruzar(cromosoma,cromosoma2)
                assert(cromosoma.genes.contains(4.0))
                assert(cromosoma.genes.contains(1.0))
                assert(cromosoma2.genes.contains(2.0))
                assert(cromosoma2.genes.contains(3.0))
                assert(cromosoma.genes.size == 2)
                assert(cromosoma2.genes.size == 2)

            }
            it("Debe mutar") {
                ag.generarPoblacionInicial()
                ag.mutarPoblacion()
                assert(true)
            }
        }
    }

})