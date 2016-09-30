package com.thegrid.behavior.state

import com.thegrid.behavior.model.IngenieriaTransito
import com.thegrid.behavior.model.Street

/**
 * Created by bruno on 29/09/16.
 */
class CaudalNormalState: BlockState(ingeniriaTransito = IngenieriaTransito()) {
    override fun calcularFlujoSalida(autosSalida: Int, t1_lastCarInputDuration: Double, capacidad: Int, stk: Int, v_max: Double): Double {
        throw UnsupportedOperationException()
    }

    override fun calcularFlujoEntrada(a_lastCarsInput: Int, t1_lastCarInputDuration: Double, capacidad: Int, stk: Int, v_max: Double): Double {
        throw UnsupportedOperationException()
    }


    override fun calcularVelocidad(q_carFlow: Double, stk: Int, capacidad: Int, street: Street, v_max: Double):Double {
        val velOfCap = ingeniriaTransito.calcularVelocidadRespectoDensidad(v_max,capacidad,stk)
        val velOfCuca = ingeniriaTransito.velocidadRespectoFlujo(q_carFlow,v_max,capacidad, stk)
        println("*************************" )
        println("Estoy calculando velocidad en caudal normal" )
        println("la velocidad respecto a la capacidad es:  $velOfCap" )
        println("la velocidad respecto a cuca es:  $velOfCuca" )
        return velOfCuca
    }

    override fun cambiarEstado(nuevoEstado: BlockState) :BlockState{
        throw UnsupportedOperationException()
    }
}