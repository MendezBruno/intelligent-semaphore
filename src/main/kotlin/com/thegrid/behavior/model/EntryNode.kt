package com.thegrid.behavior.model

import com.thegrid.behavior.extensions.Probabilities
import com.thegrid.behavior.platform.IDispatcheable
import com.thegrid.behavior.services.EventList
import com.thegrid.behavior.services.model.PairDispatched
import com.thegrid.behavior.state.BlockState
import com.thegrid.behavior.state.CaudalNormalState
import rx.Observable
import java.util.*

/**
 * Created by Surakituaka on 05/08/2016.
 */

class EntryNode : NodeType, IDispatcheable {

    override fun id(): String {
        return id
    }

    override var horizontalEgressBlock: IDispatcheable
        get() = throw UnsupportedOperationException()
        set(value) {
        }
    override var verticalEgressBlock: IDispatcheable
        get() = throw UnsupportedOperationException()
        set(value) {
        }

    override var horizontalEntryBlock: BlockHorizontal
        set(value) = throw UnsupportedOperationException()
        get() = throw UnsupportedOperationException()
    override var verticalEntryBlock: BlockVertical
        set(value) = throw UnsupportedOperationException()
        get() = throw UnsupportedOperationException()

    override val crossingHorizontalOutgoingCars: Observable<Block>
        get() = infiniteCarsBlock.sendingCars
    override val turningHorizontalOutgoingCars: Observable<Block>
        get() = infiniteCarsBlock.sendingCars
    override val crossingVerticalOutgoingCars: Observable<Block>
        get() = infiniteCarsBlock.sendingCars
    override val turningVerticalOutgoingCars: Observable<Block>
        get() = infiniteCarsBlock.sendingCars

    var _interval: Int
    var _maxAmount: Int
    val infiniteCarsBlock : Block

    constructor(id:String, interval:Int, maxAmount:Int) : super(id) {
        _maxAmount = maxAmount
        _interval = interval

        //Calle ficticia
        val blockState : BlockState = CaudalNormalState()
        infiniteCarsBlock = Block("", Street(0, Orientation.West,mutableListOf(),0), 0, this, this, blockState)
    }

    override fun executeEvent(time: Double, futureEventsTable: EventList<PairDispatched<IDispatcheable>>): Double {
        val crossingCars = Random().nextInt(_maxAmount)
        val turningCars = Random().nextInt(_maxAmount)
        println("**************************")
        println("soy el nodo de entrada:$id")
        println("autos que siguen derecho:$crossingCars")
        println("autos que siguen doblan: $turningCars")
        println("mi tiempo es:$time")
        println("**************************")
        infiniteCarsBlock.outgoingCrossingByCarsAmount += crossingCars
        infiniteCarsBlock.outgoingTurningCarsAmount += turningCars
//        println("Cruce IN - STK-IN:${crossingCars + turningCars}")
        infiniteCarsBlock.fireReplay()
        return _interval.toDouble()
    }
}
