package com.thegrid.behavior.state

import com.thegrid.behavior.model.Block
import com.thegrid.behavior.model.IngenieriaTransito
import com.thegrid.behavior.model.Street
import com.thegrid.behavior.services.Tef

class CuadraEnVerde(ingeniriaTransito: IngenieriaTransito = IngenieriaTransito()) : BlockState(ingeniriaTransito) {


    override fun calcularVelocidad(q_carFlow: Double, stk: Int, capacidad: Int, street: Street, v_max: Double): Double {
        println("=====================================")
        println("*** Estoy en VERDE ***")
        println("=====================================")
        return ingeniriaTransito.calcularVelocidadRespectoDensidad(v_max,capacidad,stk) * 0.9
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