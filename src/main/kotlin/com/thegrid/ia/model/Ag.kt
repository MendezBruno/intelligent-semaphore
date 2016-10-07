package com.thegrid.ia.model

import com.thegrid.ia.model.Cromosoma
import com.thegrid.ia.cruzaStrategy.CruzaSimpleStrategy
import com.thegrid.ia.seleccionStrategy.SeleccionRankingStrategy
import com.thegrid.ia.seleccionStrategy.SeleccionStrategy
import java.util.*
import org.jetbrains.spek.api.Spek
/**
 * Created by Bruno on 05/10/16.
 */
class Ag {
    val cotaInferior = 22.0
    val cotaSuperior = 60.0
    final val cromosomasPordefault = 6
    var poblacionGlobal = mutableListOf<Cromosoma>()
    var poblacionInicial = mutableListOf<Cromosoma>()
    var poblacionCruzada = mutableListOf<Cromosoma>()
    var cruzaStrategy: CruzaSimpleStrategy = CruzaSimpleStrategy()
    var seleccionStrategy: SeleccionStrategy = SeleccionRankingStrategy()
    var coeficienteMutacion = 30

    fun generarPoblacionGlobal (cantSemaforos: Int, cantCromosomas: Int){
        var i = 0
        var j = 0
        do {
            var nuevoCromosoma = Cromosoma()
            do {
                var verdeH = cotaSuperior - Random().nextInt(cotaInferior.toInt())
                var verdeV = cotaSuperior - Random().nextInt(cotaInferior.toInt())
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
      for(i in 1..cromosomasPordefault) poblacionInicial.add(poblacionGlobal.get(Random().nextInt(poblacionGlobal.size)) )
    }


    fun generarPoblacionInicial (cantCromosomas: Int){
        for(i in 1..cantCromosomas) poblacionInicial.add(poblacionGlobal.get(Random().nextInt(poblacionGlobal.size)) )

    }

    fun seleccionarIndividuosDePoblacionInicial():MutableList<Cromosoma>{
        return seleccionStrategy.seleccionar(poblacionInicial,poblacionCruzada)
    }
    /*
    Suponemos que las aptitudes fueron calculadas y actualizadas en la simulacion antes de iterar.
    */
    fun iterar (){
        poblacionCruzada.addAll( cruzaStrategy.cruzarSeleccion(seleccionarIndividuosDePoblacionInicial())  )
        if (coeficienteMutacion > Random().nextInt(100)) mutar(poblacionCruzada)
        poblacionInicial = poblacionCruzada
        poblacionCruzada.clear()

    }

    private fun  mutar(poblacion: MutableList<Cromosoma>) {
        val cromosomaRandom = Random().nextInt(poblacion.size)
        val genRandom = Random().nextInt(poblacion[1].genes.size)
        poblacion[cromosomaRandom].genes[genRandom]= Random().nextInt(cotaSuperior.toInt()).toDouble()
    }

}