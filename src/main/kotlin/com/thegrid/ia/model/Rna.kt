package com.thegrid.ia.model

import com.thegrid.behavior.model.CongestionLevel
import com.thegrid.behavior.model.Map
import ar.org.neuroph.nnet.learning.BackPropagation
import ar.org.neuroph.core.NeuralNetwork
import ar.org.neuroph.core.data.DataSet
import ar.org.neuroph.core.learning.error.ErrorFunction
import ar.org.neuroph.nnet.MultiLayerPerceptron
import ar.org.neuroph.util.TransferFunctionType

/**
 * Created by bruno on 08/10/16.
 */
class Rna(val map: Map, debugMode: Boolean = false) {
    var setDeEntrenamiento: DataSet
    var iteracionesDeAprendizaje = 5
    var porcetajeDeCapasIntermedias = 0.70
    val datosDeSalida: Int
    val datosEntrada: Int
    val capaOculta: Int
    var neuralNetwork: NeuralNetwork<BackPropagation>
    val backPropagation = BackPropagation()
    val pers: PersDataSet
    var entrenada: Boolean = false

    init{
        datosEntrada = CongestionLevel.values().size + map.streets.size * 4   //cuatro por son dos nodos (Entrada , salida) y dos valores interval y max amount
        datosDeSalida = map.semaphoreNodes.size * 2
        setDeEntrenamiento = DataSet(datosEntrada, datosDeSalida)
        capaOculta = ((datosEntrada+datosDeSalida)*porcetajeDeCapasIntermedias).toInt()
        neuralNetwork = MultiLayerPerceptron(TransferFunctionType.SIGMOID, datosEntrada, capaOculta, datosDeSalida)

        if(debugMode) {
            pers = PersistenciaDataSetNormal(this)
        }
        else
            pers = PersistenciaDataSetGAE(this)
        try{
            importarDatoDeEntrenamiento()
        }catch(fnfE: Exception){
            fnfE.printStackTrace()
            exportarDataSet()
        }
    }

    fun exportarDataSet(){
        pers.persistir()
    }

    fun importarDatoDeEntrenamiento(){
        val data = pers.cargarRecuperar()
        if (data != null) {
            setDeEntrenamiento = data

        }
    }

    fun borrarMemoria(){
        setDeEntrenamiento.clear()
    }

    fun agregarValorDeEntrenamiento(datosEntrada: DoubleArray, datosSalida: DoubleArray){
        setDeEntrenamiento.addRow(datosEntrada, datosSalida)
        pers.persistirUnaRow(datosEntrada, datosSalida)
//        if (setDeEntrenamiento.rows.size % 10 == 0) entrenarRed()
    }

    fun entrenarRed(){
        println("CAntidad de fias para entreenar la red: " + setDeEntrenamiento.rows.size)
        println("CAntidad de datos del set de entrenamiento de la red: " + setDeEntrenamiento.size())
        if (setDeEntrenamiento.isEmpty){
            println("No me pudieron entrenar, no tengo datos")
        }
        else{
            println("Me estan entrenando,  tengo datos")
            backPropagation.setMaxIterations(iteracionesDeAprendizaje * setDeEntrenamiento.rows.size)
            backPropagation.maxError = 0.1
            backPropagation.learningRate = 0.5
            neuralNetwork.learn(setDeEntrenamiento, backPropagation)
            entrenada = true
        }

    }

    fun haztumagia(datosEntrada: DoubleArray): DoubleArray? {
        neuralNetwork.setInput(*datosEntrada);
        neuralNetwork.calculate();
        return desnormalizar(neuralNetwork.getOutput(),22.0,60.0)  //es la cota de los tiempos de los semaforos
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

    fun normalizar (datos: DoubleArray, cotaMinima: Double, cotaMaxima: Double): DoubleArray {
    val arrayNormal = DoubleArray(datos.size)
    var i = 0
        for (dato in datos){
            arrayNormal[i] = (dato - cotaMinima)/ (cotaMaxima - cotaMinima)
            i++
        }
        return arrayNormal
    }

    fun desnormalizar (datos: DoubleArray, cotaMinima: Double, cotaMaxima: Double): DoubleArray {
        val arrayDesnormalizado = DoubleArray(datos.size)
        var i = 0
        for (dato in datos){
            arrayDesnormalizado[i] = dato * (cotaMaxima - cotaMinima) + cotaMinima
            i++
        }
        return arrayDesnormalizado
    }
    //Seteo la cantidad de parametro de entrada y de salida que va a tener la red para este mapa
    fun getMaxError(): Double {return backPropagation.maxError}
    fun getLearninRate(): Double {return backPropagation.learningRate}
    fun getMinErrorChange(): Double {return backPropagation.minErrorChange}
    fun getCurrentIteracion(): Int {return backPropagation.currentIteration}
    fun getErrorFunction(): Double {return (backPropagation.errorFunction).getTotalError()}
    fun detenerEntrenamiento() {
        neuralNetwork.stopLearning()
    }

}

