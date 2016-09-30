package com.thegrid.behavior.state

import com.thegrid.behavior.model.IngenieriaTransito
import com.thegrid.behavior.model.Street

/**
 * Created by bruno on 29/09/16.
 */
class CuadraCongestionadaRojoState : BlockState(ingeniriaTransito = IngenieriaTransito()) {
    override fun calcularVelocidad(velocidad: Double, stk: Int, capacidad: Int, street: Street, v_max: Double) {
        throw UnsupportedOperationException()
    }

    override fun calcularFlujo(flujo: Double) {
        throw UnsupportedOperationException()
    }

    override fun cambiarEstado(nuevoEstado: BlockState) {
        throw UnsupportedOperationException()
    }
}