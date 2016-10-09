package com.thegrid.ia.cruzaStrategy

import com.thegrid.ia.model.Cromosoma

/**
 * Created by Bruno on 06/10/16.
 */
class CruzaSimpleStrategy: CruzaStrategy() {
    override fun cruzar (cromosomaPadre1: Cromosoma, cromosomaPadre2: Cromosoma) {
        val mitadGenes = cromosomaPadre1.genes.size / 2
        val otramitad = cromosomaPadre1.genes.size - mitadGenes
        var hijo1 = mutableListOf<Double>()
        var hijo2 = mutableListOf<Double>()
        hijo1 = cromosomaPadre1.genes.drop(mitadGenes).toMutableList()
        hijo1.addAll(cromosomaPadre2.genes.dropLast(otramitad))
        hijo2 = cromosomaPadre2.genes.drop(mitadGenes).toMutableList()
        hijo2.addAll(cromosomaPadre1.genes.dropLast(otramitad).toMutableList())
//        genes.addAll(0,cromosoma.genes.dropLast(mitadGenes))
//        cromosoma.genes.addAll(auxList)
        cromosomaPadre1.genes = hijo2
        cromosomaPadre2.genes = hijo1
    }
}