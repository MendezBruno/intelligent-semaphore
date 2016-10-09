package com.thegrid.communication.model

import com.github.salomonbrys.kotson.fromJson
import com.google.gson.Gson
import com.thegrid.communication.services.MapConversor
import com.thegrid.ia.model.Ag
import com.thegrid.ia.model.Rna
import org.jetbrains.spek.api.Spek
import java.util.*

/**
 * Created by bruno on 09/10/16.
 */
class RnaTest : Spek({

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

        on("Rna") {
            it("debe crear un Red a partir de un mapa, crear un path si no exite para persistir el modelo") {
                var rna: Rna = Rna(map)
                assert(!rna.equals(null))

            }
            it("de guardar 2 valores "){
                var rna: Rna = Rna(map)
                val random: Random = Random()
                val datosEntrada: DoubleArray = DoubleArray(rna.datosEntrada,{Math.abs(random.nextDouble())})
                val datosSalida: DoubleArray = DoubleArray(rna.datosDeSalida,{Math.abs(random.nextDouble())})
                val datosEntrada1: DoubleArray = DoubleArray(rna.datosEntrada,{Math.abs(random.nextDouble())})
                val datosSalida1: DoubleArray = DoubleArray(rna.datosDeSalida,{Math.abs(random.nextDouble())})
                val datosEntrada2: DoubleArray = DoubleArray(rna.datosEntrada,{Math.abs(random.nextDouble())})
                val datosSalida2: DoubleArray = DoubleArray(rna.datosDeSalida,{Math.abs(random.nextDouble())})
                val datosEntrada3: DoubleArray = DoubleArray(rna.datosEntrada,{Math.abs(random.nextDouble())})
                val datosSalida3: DoubleArray = DoubleArray(rna.datosDeSalida,{Math.abs(random.nextDouble())})
                rna.agregarValorDeEntrenamiento(datosEntrada,datosSalida)
                rna.agregarValorDeEntrenamiento(datosEntrada1,datosSalida1)
                rna.agregarValorDeEntrenamiento(datosEntrada2,datosSalida2)
                rna.agregarValorDeEntrenamiento(datosEntrada3,datosSalida3)
                assert(rna.setDeEntrenamiento.size() == 4)
            }
            it("se debe entrenar y devolver un valor posible con un Array de double con un tamaño de datos salida"){
                var rna: Rna = Rna(map)
                val random: Random = Random()
                val datosEntrada: DoubleArray = DoubleArray(rna.datosEntrada,{Math.abs(random.nextDouble())})
                val datosSalida: DoubleArray = DoubleArray(rna.datosDeSalida,{Math.abs(random.nextDouble())})
                val datosEntrada1: DoubleArray = DoubleArray(rna.datosEntrada,{Math.abs(random.nextDouble())})
                val datosSalida1: DoubleArray = DoubleArray(rna.datosDeSalida,{Math.abs(random.nextDouble())})
                val datosEntrada2: DoubleArray = DoubleArray(rna.datosEntrada,{Math.abs(random.nextDouble())})
                val datosSalida2: DoubleArray = DoubleArray(rna.datosDeSalida,{Math.abs(random.nextDouble())})
                val datosEntrada3: DoubleArray = DoubleArray(rna.datosEntrada,{Math.abs(random.nextDouble())})
                val datosSalida3: DoubleArray = DoubleArray(rna.datosDeSalida,{Math.abs(random.nextDouble())})
                rna.agregarValorDeEntrenamiento(datosEntrada,datosSalida)
                rna.agregarValorDeEntrenamiento(datosEntrada1,datosSalida1)
                rna.agregarValorDeEntrenamiento(datosEntrada2,datosSalida2)
                rna.agregarValorDeEntrenamiento(datosEntrada3,datosSalida3)
                rna.entrenarRed()
                rna.exportarListaDeDatos()
                assert(rna.haztumagia(datosEntrada)?.size == rna.datosDeSalida)
                println(rna.backPropagation.maxError)
                println(rna.backPropagation.learningRate)
                println(rna.backPropagation.minErrorChange)
                println(rna.backPropagation.currentIteration)
                println(rna.backPropagation.errorFunction)
            }

        }

    }

})