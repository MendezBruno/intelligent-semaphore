package com.thegrid.behavior.model

import freeFunctions.minimo
import rx.Observable
import java.util.*
import kotlin.properties.Delegates

/**
 * Created by Surakituaka on 05/08/2016.
 */

class EgressNode : NodeType {

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

    private var _interval: Int
    private var _maxAmount: Int
    private var _entryBlock: Block? = null
        set(value) {
            //TODO - Deberia hacerse el minimo entre el random ese y la cantidad de vehiculos que pueden pasar segun el tiempo
            val removedCars = Random().nextInt(_maxAmount)
            value?.sendingCars?.subscribe {
                it.outgoingCrossingByCarsAmount -= removedCars
                println("Cruce OUT - STK-OUT:$removedCars")
            }
            field = value
        }

    constructor(id:String, interval:Int, maxAmount:Int) : super(id) {
        _maxAmount = maxAmount
        _interval = interval
    }

}
