package com.thegrid.behavior.model

/**
 * Created by bruno on 29/09/16.
 */
class IngenieriaTransito {
    fun calcularVelocidadRespectoDensidad(v_max: Double, capacidad: Int, stk: Int): Double {
        return v_max * ( 1 - stk.toDouble()/capacidad.toDouble())
    }

    fun velocidadRespectoFlujo(q_carFlow: Double, v_max: Double, capacidad: Int, stk: Int): Double {
       val determinante = Math.sqrt(v_max*v_max - 4*(v_max/capacidad)*q_carFlow )/2

        if (stk > capacidad) return v_max / 2 - determinante else return v_max / 2 + determinante
    }

    private fun flujoMaximo(v_max: Double, capacidad: Int): Double {
        return v_max*capacidad/4
    }

    fun calcularCongestion(velocity: Double, length: Int, timeForMaxCongestion: Double, t_min: Double): Double {
        val new_t = if (velocity > 0.0) length / velocity else (timeForMaxCongestion + t_min)
        val numCon = (new_t - t_min) / timeForMaxCongestion * 100.0
        val congestion = if (numCon < 0) 0.0 else numCon
        return if (congestion > 100) 100.0 else congestion
    }

      /* @param maxValSaturacion es un tiempo entre 0 y 1  */
    fun tiempoCiclo (tCiclo: Double, maxValSaturacion: Double): Int{
        return ((1.5*tCiclo + 5) / (1 - maxValSaturacion)).toInt()
    }

    fun tiempoVerde (ciclo: Int, distanciaEntreIntersecciones: Int) : Int {
        return (3.6*distanciaEntreIntersecciones / ciclo).toInt()
    }

}