package com.thegrid.behavior.state

import com.thegrid.behavior.model.IngenieriaTransito
import com.thegrid.behavior.model.Street

/**
 * Created by bruno on 29/09/16.
 */
class CuadraCongestionadaState: BlockState(ingeniriaTransito = IngenieriaTransito()) {
    override fun calcularVelocidad(q_carFlow: Double, stk: Int, capacidad: Int, street: Street, v_max: Double): Double {
         if (q_carFlow == 0.0) return 0.0 else return ingeniriaTransito.calcularVelocidadRespectoDensidad(v_max,capacidad,stk)
    }

    override fun cambiarEstado(nuevoEstado: BlockState): BlockState {
        throw UnsupportedOperationException()
    }

    override fun calcularFlujoSalida(autosSalida: Int, t1_lastCarInputDuration: Double, capacidad: Int, stk: Int, v_max: Double): Double {
        throw UnsupportedOperationException()
    }

    override fun calcularFlujoEntrada(a_lastCarsInput: Int, t1_lastCarInputDuration: Double, capacidad: Int, stk: Int, v_max: Double): Double {
        throw UnsupportedOperationException()
    }


}