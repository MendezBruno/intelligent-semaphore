package com.thegrid.behavior.state

import com.thegrid.behavior.model.Block
import com.thegrid.behavior.model.IngenieriaTransito
import com.thegrid.behavior.model.Street
import com.thegrid.behavior.services.Tef

open class CuadraNormal : BlockState(ingeniriaTransito = IngenieriaTransito()) {
    override fun calcularCongestion(block: Block): Double {
        return ingeniriaTransito.calcularCongestion(block.velocity,block.length,block.timeForMaxCongestion,block.t_min)
    }

    override fun calcularVelocidad(q_carFlow: Double, stk: Int, capacidad: Int, street: Street, v_max: Double):Double {
        val velOfCap = ingeniriaTransito.calcularVelocidadRespectoDensidad(v_max,capacidad,stk)
        val velOfCuca = ingeniriaTransito.velocidadRespectoFlujo(q_carFlow,v_max,capacidad, stk)
        println("*************************" )
        println("Estoy calculando velocidad en caudal normal" )
        println("la velocidad respecto a la capacidad es:  $velOfCap" )
        println("la velocidad respecto a cuca es:  $velOfCuca" )
        return velOfCap
    }

    override fun cambiarEstado(block : Block) :BlockState{
        return block.egressNode.getBlockState(block.getDirection())
    }

    override fun autosPuedenPasar(): Boolean {
        return true;
    }

    override fun getEventDuration(block :Block, tef: Tef): Double {
        return block.eventDurationifCornerNode(tef)
    }
}