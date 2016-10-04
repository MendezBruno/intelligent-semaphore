package com.thegrid.behavior.state

import com.thegrid.behavior.model.Block

class CuadraDelFinal : CuadraNormal() {

    override fun cambiarEstado(block : Block) :BlockState{
        //Estado final
        return this
    }
}