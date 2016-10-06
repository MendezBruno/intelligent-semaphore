package com.thegrid.ia.model.seleccionStrategy

import com.thegrid.ia.model.Cromosoma

/**
 * Created by bruno on 06/10/16.
 */
interface SeleccionStrategy {
    fun seleccionar(poblacionInicial: List<Cromosoma>): List<Cromosoma>
}