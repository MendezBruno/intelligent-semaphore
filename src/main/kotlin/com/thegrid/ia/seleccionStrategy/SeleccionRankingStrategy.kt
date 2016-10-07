package com.thegrid.ia.seleccionStrategy

import com.thegrid.ia.model.Cromosoma

/**
 * Created by bruno on 6/10/2016.
 */
class SeleccionRankingStrategy: SeleccionStrategy {
    override fun seleccionar(poblacionInicial: MutableList<Cromosoma>, poblacionCruzada: MutableList<Cromosoma>):MutableList<Cromosoma> {
        val rankingGanador = poblacionInicial.size/4*3
        val rankingPerdedor = poblacionInicial.size - rankingGanador
        poblacionInicial.sortedByDescending { it.aptitud }
        poblacionCruzada.addAll(poblacionInicial.dropLast(rankingPerdedor))
        return (poblacionInicial.sortedByDescending { it.aptitud }).drop(poblacionInicial.size/4*3).toMutableList()
    }
}