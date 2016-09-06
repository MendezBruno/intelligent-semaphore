package com.thegrid.behavior.model

import rx.Observable
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
    private var _interval: Int
    private var _maxAmount: Int
    private var _entryBlock: Block? = null
    set(value) {
        value?.sendingCars?.subscribe { s ->
            //ToDO dormirse cada cierto tiempo definido en la fdp
            //ToDO y al despertarse restar la cantidad permitida
            //ToDO en la fdp. Solo hay una cuadra arribando...
        }
        field = value
    }

    constructor(id:String, interval:Int, maxAmount:Int) : super(id) {
        _maxAmount = maxAmount;
        _interval = interval;
    }

    override val crossingHorizontalOutgoingCars: Observable<Block>
        get() = throw UnsupportedOperationException()
    override val turningHorizontalOutgoingCars: Observable<Block>
        get() = throw UnsupportedOperationException()
    override val crossingVerticalOutgoingCars: Observable<Block>
        get() = throw UnsupportedOperationException()
    override val turningVerticalOutgoingCars: Observable<Block>
        get() = throw UnsupportedOperationException()

}