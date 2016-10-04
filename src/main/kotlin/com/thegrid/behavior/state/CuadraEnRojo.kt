package com.thegrid.behavior.state

import com.thegrid.behavior.model.Block
import com.thegrid.behavior.model.IngenieriaTransito
import com.thegrid.behavior.model.Street
import com.thegrid.behavior.services.Tef

class CuadraEnRojo(ingeniriaTransito: IngenieriaTransito = IngenieriaTransito()) : BlockState(ingeniriaTransito) {
    override fun calcularVelocidad(q_carFlow: Double, stk: Int, capacidad: Int, street: Street, v_max: Double): Double {
        println("=====================================")
        println("*** Estoy en ROJO ***")
        println("=====================================")
        return 0.0
    }

    override fun cambiarEstado(block: Block): BlockState {
        return CuadraEnVerde();
    }

    override fun autosPuedenPasar(): Boolean {
        return false;
    }

    override fun getEventDuration(block: Block, tef: Tef): Double {
        return block.eventDurationifSemaphoreNode(tef)
    }
}

