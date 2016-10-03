package com.thegrid.behavior.state

import com.thegrid.behavior.model.Block
import com.thegrid.behavior.model.IngenieriaTransito
import com.thegrid.behavior.model.Street
import com.thegrid.behavior.services.Tef

class CuadraEnVerde(ingeniriaTransito: IngenieriaTransito = IngenieriaTransito()) : BlockState(ingeniriaTransito) {


    override fun calcularVelocidad(q_carFlow: Double, stk: Int, capacidad: Int, street: Street, v_max: Double): Double {
        return 0.0
    }

    override fun autosPuedenPasar() : Boolean {
        return true;
    }

    override fun cambiarEstado(block: Block): BlockState {
        return CuadraEnRojo()
    }

    override fun getEventDuration(block: Block, tef: Tef): Double {
        return block.eventDurationifSemaphoreNode(tef)
    }
}