package com.thegrid.behavior.model

import com.thegrid.behavior.extensions.Probabilities
import com.thegrid.behavior.platform.IDispatcheable
import rx.Observable
import java.util.*

/**
 * Created by Surakituaka on 05/08/2016.
 */

//TODO EL NODO NO SE SUBSCRIBE MAS A LA CUADRA DE EGRESO SINO QUE TIENE QUE SER AL REVES

class EntryNode : NodeType, IDispatcheable {

    override fun executeEvent(time: Double): Double {
        infiniteCarsBlock.outgoingCrossingByCarsAmount += Random().nextInt(_maxAmount)
        infiniteCarsBlock.outgoingTurningCarsAmount += Random().nextInt(_maxAmount)
        println("[Tiempo:$time] Nodo id:$id autosEnCola:${infiniteCarsBlock.stk}")
        infiniteCarsBlock.fireReplay()
        return _interval.toDouble()
    }

    override var horizontalEntryBlock: BlockHorizontal
        set(value) = throw UnsupportedOperationException()
        get() = throw UnsupportedOperationException()
    override var verticalEntryBlock: BlockVertical
        set(value) = throw UnsupportedOperationException()
        get() = throw UnsupportedOperationException()

    private var _interval: Int
    private var _maxAmount: Int
    val infiniteCarsBlock : Block

    constructor(id:String, interval:Int, maxAmount:Int) : super(id) {
        _maxAmount = maxAmount
        _interval = interval

        //Calle ficticia
        infiniteCarsBlock = Block("", Street(0, Orientation.West,mutableListOf(),0),0,this)
    }

    override val crossingHorizontalOutgoingCars: Observable<Block>
        get() = infiniteCarsBlock.sendingCars
    override val turningHorizontalOutgoingCars: Observable<Block>
        get() = infiniteCarsBlock.sendingCars
    override val crossingVerticalOutgoingCars: Observable<Block>
        get() = infiniteCarsBlock.sendingCars
    override val turningVerticalOutgoingCars: Observable<Block>
        get() = infiniteCarsBlock.sendingCars

}