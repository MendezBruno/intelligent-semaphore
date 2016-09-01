package com.thegrid.behavior.model

import rx.Observable
import kotlin.properties.Delegates

/**
 * Created by Surakituaka on 05/08/2016.
 */

class EgressNode : NodeType {
    private var _interval: Int
    private var _maxAmount: Int
    private var _entryBlock: Block? = null
    set(value) {
        value?.sendingCars?.subscribe { s ->
            //ToDO dormirse cada cierto tiempo definido en la fdp
            //ToDO y al despertarse restar la cantidad permitida
            //ToDO en la fdp. Solo hay una cuadra arribando...
        }
    }

    constructor(id:String, interval:Int, maxAmount:Int) : super(id) {
        _maxAmount = maxAmount;
        _interval = interval;
    }

    override val crossingHorizontalOutgoingCars: Observable<BlockBase>
        get() = throw UnsupportedOperationException()
    override val turningHorizontalOutgoingCars: Observable<BlockBase>
        get() = throw UnsupportedOperationException()
    override val crossingVerticalOutgoingCars: Observable<BlockBase>
        get() = throw UnsupportedOperationException()
    override val turningVerticalOutgoingCars: Observable<BlockBase>
        get() = throw UnsupportedOperationException()

    override fun setHorizontalEntryBlock(block: BlockHorizontal) {
        _entryBlock = block
    }

    override fun setVerticalEntryBlock(block: BlockVertical) {
        _entryBlock = block
    }

    override fun setHorizontalEgressBlock(block: BlockHorizontal) {
        throw UnsupportedOperationException("EgressNode doesn't have EgressBlock")
    }

    override fun setVerticalEgressBlock(block: BlockVertical) {
        throw UnsupportedOperationException("EgressNode doesn't have EgressBlock")
    }
}