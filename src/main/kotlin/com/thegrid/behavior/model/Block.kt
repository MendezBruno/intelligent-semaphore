package com.thegrid.behavior.model

import com.thegrid.behavior.observer.BlockListener
import com.thegrid.communication.extension.RGBA

/**
 * Created by Surakituaka on 01/08/2016.
 */

data class Block(
        val id: String,
        val street: Street,
        val length: Int/*Double*/,
        val entryNode: NodeType,
        val egressNode: NodeType) {

    private val _carCapacity: Int = 3 //TODO calcular segun length, algo como Int(length/"valor promedio de largo de vehiculos)
    private val _changeListeners: MutableList<BlockListener> = mutableListOf()
    private var _backStraightCarAmount: Int = 0
    private var _backBendCarAmount: Int = 0
    private var _frontStraightCarAmount: Int = 0
    private var _frontBendCarAmount: Int = 0
    private val _colorStatus = RGBA(0,0,0,1)


    //TODO modificaciones de la cuadra
    public fun metodoDeInterfazQueModificaEstado() {

        //Calculo y asigno cosas

        var self = this
        _changeListeners.forEach { listener -> listener.fire(self) }
    }

    fun hasVerticalDirection() : Boolean{
        return street.orientation == Orientation.South || street.orientation == Orientation.North
    }

    public fun getChangeListeners() : MutableList<BlockListener> {
        return _changeListeners
    }


    public fun getBackStraightCarAmount() : Int {
        return _backStraightCarAmount
    }

    public fun getBackBendCarAmount() : Int {
        return _backBendCarAmount
    }

    public fun getFrontStraightCarAmount() : Int {
        return _frontStraightCarAmount
    }

    public fun getFrontBendCarAmount() : Int {
        return _frontBendCarAmount
    }

    public fun getColorStatus() : RGBA {
        return _colorStatus
    }

}