package com.thegrid.behavior.state

import com.thegrid.behavior.extensions.Direction
import com.thegrid.behavior.model.Block
import com.thegrid.behavior.model.IngenieriaTransito
import com.thegrid.behavior.model.Orientation
import com.thegrid.behavior.model.Street

class CaudalNormalState: BlockState(ingeniriaTransito = IngenieriaTransito()) {

    override fun calcularVelocidad(q_carFlow: Double, stk: Int, capacidad: Int, street: Street, v_max: Double):Double {
        val velOfCap = ingeniriaTransito.calcularVelocidadRespectoDensidad(v_max,capacidad,stk)
        val velOfCuca = ingeniriaTransito.velocidadRespectoFlujo(q_carFlow,v_max,capacidad, stk)
        println("*************************" )
        println("Estoy calculando velocidad en caudal normal" )
        println("la velocidad respecto a la capacidad es:  $velOfCap" )
        println("la velocidad respecto a cuca es:  $velOfCuca" )
        return velOfCuca
    }

    override fun cambiarEstado(block : Block) :BlockState{
        val orientation = block.street.orientation
        var direccion = Direction.Horizontal

        if (orientation == Orientation.North || orientation == Orientation.South) {
            direccion = Direction.Vertical
        }
        return block.egressNode.getBlockState(direccion)
    }
}