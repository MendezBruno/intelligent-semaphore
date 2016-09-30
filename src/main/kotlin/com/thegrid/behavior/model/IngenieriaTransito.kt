package com.thegrid.behavior.model

/**
 * Created by bruno on 29/09/16.
 */
class IngenieriaTransito {
    fun calcularVelocidadRespectoDensidad(v_max: Double, capacidad: Int, stk: Int): Double {
        return v_max - (v_max/stk)*capacidad

    }

    fun velocidadRespectoFlujo(q_carFlow: Double, v_max: Double, capacidad: Int, stk: Int): Double {
       val determinante = Math.sqrt(v_max*v_max - 4*(v_max/capacidad)*q_carFlow )/2

        if (stk > capacidad) return v_max / 2 - determinante else return v_max / 2 + determinante
    }

    private fun flujoMaximo(v_max: Double, capacidad: Int): Double {
        return v_max*capacidad/4
    }

}