package com.thegrid.ia.model

import com.thegrid.behavior.model.Map
import com.thegrid.communication.model.Resultado
import com.thegrid.ia.cruzaStrategy.CruzaSimpleStrategy
import com.thegrid.ia.seleccionStrategy.SeleccionRankingStrategy
import com.thegrid.ia.seleccionStrategy.SeleccionStrategy
import java.util.*
/**
 * Created by Bruno on 05/10/16.
 */
class Ag(val map : Map) {
    companion object {
        val CANT_MAX_CROMOSOMAS = 500
        val cotaInferior = 22.0
        val cotaSuperior = 60.0

    }

    val cromosomasPordefault = 6
    var poblacionGlobal = mutableListOf<Cromosoma>()
    var poblacion = mutableListOf<Cromosoma>()
    var cruzaStrategy: CruzaSimpleStrategy = CruzaSimpleStrategy()
    var seleccionStrategy: SeleccionStrategy = SeleccionRankingStrategy()
    var coeficienteMutacion = 30

    private val i1 = 200

    init {
        generarPoblacionGlobal(map.semaphoreNodes.size, CANT_MAX_CROMOSOMAS)
        generarPoblacionInicial()
    }

    fun generarPoblacionGlobal (cantSemaforos: Int, cantCromosomas: Int){
        var i = 0
        var j = 0
        do {
            var nuevoCromosoma = Cromosoma()
            do {
                var verdeH = cotaSuperior - Random().nextInt((cotaSuperior - cotaInferior).toInt())
                var verdeV = cotaSuperior - Random().nextInt((cotaSuperior - cotaInferior).toInt())
                nuevoCromosoma.genes.add(verdeH)
                nuevoCromosoma.genes.add(verdeV)
                i++
            } while (i < cantSemaforos)
            poblacionGlobal.add(nuevoCromosoma)
            j++
            i = 0
        }while (j < cantCromosomas)
    }

    fun generarPoblacionInicial (){
        generarPoblacionInicial(cromosomasPordefault)
    }

    fun generarPoblacionInicial (cantCromosomas: Int){
        val random = Random()
        for(i in 1..cantCromosomas) {
            poblacion.add(poblacionGlobal.get(random.nextInt(poblacionGlobal.size)) )
        }
    }

    fun seleccionarIndividuosDePoblacionInicial():MutableList<Cromosoma>{
        return seleccionStrategy.seleccionar(poblacion)
    }
    /*
    Suponemos que las aptitudes fueron calculadas y actualizadas en la simulacion antes de iterar.
    */
    fun iterar(resultado: Resultado, time: Double) {
        cruzaStrategy.cruzarSeleccion(seleccionarIndividuosDePoblacionInicial())
        if (coeficienteMutacion > Random().nextInt(100)) {
            mutarPoblacion()
            resultado.agregarTiempoMutar(time,"muto")
        }else{
            resultado.agregarTiempoMutar(time,"no muto")
        }
    }

    fun mutarPoblacion() {
        val random = Random()
        val cromosomaRandom = poblacion[random.nextInt(poblacion.size)]
        val genes = cromosomaRandom.genes
        genes[random.nextInt(genes.size)] = cotaSuperior - random.nextInt((cotaSuperior - cotaInferior).toInt())
    }
}