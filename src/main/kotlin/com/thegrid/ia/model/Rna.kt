package com.thegrid.ia.model

import com.thegrid.behavior.model.CongestionLevel
import org.neuroph.nnet.learning.BackPropagation
import com.thegrid.behavior.model.Map
import org.neuroph.core.NeuralNetwork
import org.neuroph.core.data.DataSet
import org.neuroph.nnet.MultiLayerPerceptron
import org.neuroph.util.TransferFunctionType
import java.io.FileNotFoundException
import java.util.*

/**
 * Created by bruno on 08/10/16.
 */
class Rna(val map: Map) {
    val backPropagation = BackPropagation()
    var setDeEntrenamiento: DataSet
    var iteracionesDeAprendizaje = 50
    var porcetajeDeCapasIntermedias = 0.70
    val datosDeSalida: Int
    val datosEntrada: Int
    val capaOculta: Int
    var neuralNetwork: NeuralNetwork<BackPropagation>

    init{
        datosEntrada = CongestionLevel.values().size + map.streets.size * 4   //cuatro por son dos nodos (Entrada , salida) y dos valores interval y max amount
        datosDeSalida = map.semaphoreNodes.size * 2
        setDeEntrenamiento = DataSet(datosEntrada, datosDeSalida)
        capaOculta = ((datosEntrada+datosDeSalida)*porcetajeDeCapasIntermedias).toInt()
        neuralNetwork = MultiLayerPerceptron(TransferFunctionType.SIGMOID, datosEntrada, capaOculta, datosDeSalida)
        try{
            importarDatoDeEntrenamiento()
        }catch(fnfE: FileNotFoundException){
            exportarDataSet()
        }

    }



    fun exportarListaDeDatos(){
        setDeEntrenamiento.saveAsTxt(map.name+".txt", ",  ,")
    }

    fun exportarDataSet(){
        setDeEntrenamiento.save(map.name+".xml")
    }

    fun persistirDatos(){
        setDeEntrenamiento.save()
    }

    fun importarDatoDeEntrenamiento(){
        setDeEntrenamiento = DataSet.load(map.name+".xml")
    }

    fun agregarValorDeEntrenamiento(datosEntrada: DoubleArray, datosSalida: DoubleArray){
        setDeEntrenamiento.addRow(datosEntrada, datosSalida);
        persistirDatos()
    }

    fun entrenarRed(){
        backPropagation.setMaxIterations(iteracionesDeAprendizaje * setDeEntrenamiento.size());
        neuralNetwork.learn(setDeEntrenamiento, backPropagation);
    }

    fun haztumagia(datosEntrada: DoubleArray): DoubleArray? {
        neuralNetwork.setInput(*datosEntrada);
        neuralNetwork.calculate();
        return neuralNetwork.getOutput();
    }




    fun setaerFuncionDeTransferencia(funcion:String) {
        when (funcion) {
            "GAUSSIAN" -> neuralNetwork = MultiLayerPerceptron(TransferFunctionType.SIGMOID, datosEntrada, capaOculta, datosDeSalida)
            "LINEAR" -> neuralNetwork = MultiLayerPerceptron(TransferFunctionType.LINEAR, datosEntrada, capaOculta, datosDeSalida)
            "LOG" -> neuralNetwork = MultiLayerPerceptron(TransferFunctionType.LOG, datosEntrada, capaOculta, datosDeSalida)
            "RAMP" -> neuralNetwork = MultiLayerPerceptron(TransferFunctionType.RAMP, datosEntrada, capaOculta, datosDeSalida)
            "SGN" -> neuralNetwork = MultiLayerPerceptron(TransferFunctionType.SGN, datosEntrada, capaOculta, datosDeSalida)
            "SIGMOID" -> neuralNetwork = MultiLayerPerceptron(TransferFunctionType.SIGMOID, datosEntrada, capaOculta, datosDeSalida)
            "SIN" -> neuralNetwork = MultiLayerPerceptron(TransferFunctionType.SIN, datosEntrada, capaOculta, datosDeSalida)
            "STEP" -> neuralNetwork = MultiLayerPerceptron(TransferFunctionType.STEP, datosEntrada, capaOculta, datosDeSalida)
            "TANH" -> neuralNetwork = MultiLayerPerceptron(TransferFunctionType.TANH, datosEntrada, capaOculta, datosDeSalida)
            "TRAPEZOID" -> neuralNetwork = MultiLayerPerceptron(TransferFunctionType.TRAPEZOID, datosEntrada, capaOculta, datosDeSalida)

        }
    }

    //Seteo la cantidad de parametro de entrada y de salida que va a tener la red para este mapa


}
