package com.thegrid.ia.seleccionStrategy

import com.thegrid.ia.model.Cromosoma

/**
 * Created by bruno on 6/10/2016.
 */
class SeleccionRankingStrategy: SeleccionStrategy {
    override fun seleccionar(poblacionInicial : MutableList<Cromosoma>) : MutableList<Cromosoma> {
        val rankingGanador = poblacionInicial.size/4*3
        return poblacionInicial
                .sortedByDescending { it.aptitud }
                .dropLast(rankingGanador)
                .toMutableList()
    }
}