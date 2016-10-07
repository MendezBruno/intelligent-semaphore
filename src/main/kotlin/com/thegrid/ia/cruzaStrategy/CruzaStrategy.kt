package com.thegrid.ia.cruzaStrategy

import com.thegrid.ia.model.Cromosoma

/**
 * Created by Bruno on 06/10/16.
 */
interface CruzaStrategy {
        fun cruzar (cromosomaPadre1: Cromosoma, cromosomaPadre2: Cromosoma)

        fun cruzarSeleccion(dePoblacionInicial: MutableList<Cromosoma>): Collection<Cromosoma>
}