package com.thegrid.ia.cruzaStrategy

import com.thegrid.ia.model.Cromosoma

/**
 * Created by Bruno on 06/10/16.
 */
abstract class CruzaStrategy {
        abstract fun cruzar (cromosomaPadre1: Cromosoma, cromosomaPadre2: Cromosoma)

        fun cruzarSeleccion(dePoblacionInicial: MutableList<Cromosoma>): Collection<Cromosoma> {
                if (dePoblacionInicial.isEmpty())
                        return dePoblacionInicial
                var num = 0
                var pMax = dePoblacionInicial.size - 1
                while (num != pMax) {
                        dePoblacionInicial[num].aptitud = 0.0
                        dePoblacionInicial[pMax].aptitud = 0.0
                        cruzar(dePoblacionInicial[num],dePoblacionInicial[pMax])
                        num++
                        pMax--
                }
                return dePoblacionInicial
        }
}