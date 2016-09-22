package com.thegrid.behavior.model

import com.thegrid.behavior.platform.IDispatcheable
import com.thegrid.behavior.services.EventList
import com.thegrid.behavior.services.model.PairDispatched
import freeFunctions.minimo
import rx.Observable
import java.util.*
import kotlin.properties.Delegates

/**
 * Created by Surakituaka on 05/08/2016.
 */

class EgressNode : NodeType, IDispatcheable {

    override fun id(): String {
        return id
    }

    override var horizontalEgressBlock: IDispatcheable
        get() = this
        set(value) {
        }
    override var verticalEgressBlock: IDispatcheable
        get() = this
        set(value) {
        }

    override var horizontalEntryBlock: BlockHorizontal
        get() = throw UnsupportedOperationException()
        set(value) { _entryBlock = value }

    override var verticalEntryBlock: BlockVertical
        get() = throw UnsupportedOperationException()
        set(value) { _entryBlock = value }

    override val crossingHorizontalOutgoingCars: Observable<Block>
        get() = throw UnsupportedOperationException()
    override val turningHorizontalOutgoingCars: Observable<Block>
        get() = throw UnsupportedOperationException()
    override val crossingVerticalOutgoingCars: Observable<Block>
        get() = throw UnsupportedOperationException()
    override val turningVerticalOutgoingCars: Observable<Block>
        get() = throw UnsupportedOperationException()

    private var _interval: Double
    private var _maxAmount: Int
    private var _entryBlock by Delegates.notNull<Block>()

    override fun executeEvent(time: Double, futureEventsTable: EventList<PairDispatched<IDispatcheable>>): Double {
        println("maxAmount: "+_maxAmount)
        var removedCars = Random().nextInt(_maxAmount)
        println("Cruce OUT - STK-OUT:$removedCars")
        val crossing = _entryBlock.outgoingCrossingByCarsAmount
        val turning = _entryBlock.outgoingTurningCarsAmount
        if (crossing < removedCars) {
            _entryBlock.outgoingCrossingByCarsAmount = 0
            removedCars -= crossing
        } else {
            _entryBlock.outgoingCrossingByCarsAmount -= removedCars
            return _interval
        }
        if (turning < removedCars) {
            _entryBlock.outgoingTurningCarsAmount = 0
            removedCars -= crossing
        } else {
            _entryBlock.outgoingTurningCarsAmount -= removedCars
            return _interval
        }
        return _interval
    }

    constructor(id:String, interval:Int, maxAmount:Int) : super(id) {
        _maxAmount = maxAmount
        _interval = interval.toDouble()
    }
}