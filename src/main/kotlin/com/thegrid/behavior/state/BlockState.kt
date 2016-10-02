package com.thegrid.behavior.state

import com.thegrid.behavior.model.Block
import com.thegrid.behavior.model.IngenieriaTransito
import com.thegrid.behavior.model.Street

/**
 * Created by bruno on 29/09/16.
 */
abstract class BlockState(
        val ingeniriaTransito: IngenieriaTransito
) {
    abstract fun calcularVelocidad (q_carFlow: Double, stk: Int, capacidad: Int, street: Street, v_max: Double):Double
    abstract fun cambiarEstado(block: Block): BlockState
}