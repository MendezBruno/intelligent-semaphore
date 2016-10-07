package com.thegrid.ia.seleccionStrategy

import com.thegrid.ia.model.Cromosoma

/**
 * Created by bruno on 06/10/16.
 */
interface SeleccionStrategy {
    fun seleccionar(poblacionInicial:MutableList<Cromosoma>, poblacionCruzada: MutableList<Cromosoma>): MutableList<Cromosoma>
}