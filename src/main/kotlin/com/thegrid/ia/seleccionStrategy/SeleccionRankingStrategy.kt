package com.thegrid.ia.seleccionStrategy

import com.thegrid.ia.model.Cromosoma

/**
 * Created by bruno on 6/10/2016.
 */
class SeleccionRankingStrategy: SeleccionStrategy {
    override fun seleccionar(poblacionInicial: List<Cromosoma>): List<Cromosoma> {
        return (poblacionInicial.sortedByDescending { it.aptitud }).drop(poblacionInicial.size/4*3)
    }
}