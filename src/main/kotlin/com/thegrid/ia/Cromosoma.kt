package com.thegrid.ia

/**
 * Created by Bruno on 05/10/16.
 */
class Cromosoma {
    val genes = mutableListOf<Double>()


    fun cruzaSimple (cromosoma: Cromosoma ) {
        val mitadGenes = genes.size / 2
        var auxList = mutableListOf<Double>()
        auxList = genes.drop(mitadGenes).toMutableList()
        genes.addAll(0,cromosoma.genes.dropLast(mitadGenes))
        cromosoma.genes.addAll(auxList)
    }

}



