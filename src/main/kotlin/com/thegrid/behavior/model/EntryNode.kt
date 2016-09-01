package com.thegrid.behavior.model

import rx.Observable
import rx.lang.kotlin.observable

/**
 * Created by Surakituaka on 05/08/2016.
 */

class EntryNode : NodeType {
    private var _egressBlock: Block? = null
    private var _interval: Int
    private var _maxAmount: Int
    val infiniteCarsBlock : BlockBase
    val emitter = observable<BlockBase>{}
    constructor(id:String, interval:Int, maxAmount:Int) : super(id) {
        _maxAmount = maxAmount;
        _interval = interval;

        //ToDO dormirse cada cierto tiempo definido en la fdp
        //ToDO y al despertarse agregar a la infiniteCarsBlock la
        //ToDO cantidad especificada en la fdp

        //Calle ficticia
        infiniteCarsBlock = object: BlockBase() {
            override var sendingCars: Observable<Block>
                get() = throw UnsupportedOperationException()
                set(value) {
                }
        }
    }

    override val crossingHorizontalOutgoingCars: Observable<BlockBase>
        get() = emitter
    override val turningHorizontalOutgoingCars: Observable<BlockBase>
        get() = emitter
    override val crossingVerticalOutgoingCars: Observable<BlockBase>
        get() = emitter
    override val turningVerticalOutgoingCars: Observable<BlockBase>
        get() = emitter

    override fun setHorizontalEgressBlock(block: BlockHorizontal) {
        _egressBlock = block
    }

    override fun setVerticalEgressBlock(block: BlockVertical) {
        _egressBlock = block
    }

    override fun setHorizontalEntryBlock(block: BlockHorizontal) {
        throw UnsupportedOperationException("EntryNode doesn't have an EntryBlock")
    }

    override fun setVerticalEntryBlock(block: BlockVertical) {
        throw UnsupportedOperationException("EntryNode doesn't have an EntryBlock")
    }
}