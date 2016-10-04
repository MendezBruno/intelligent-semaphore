package com.thegrid.behavior.model

import com.thegrid.behavior.platform.IDispatcheable
import com.thegrid.behavior.platform.Simulation
import com.thegrid.behavior.services.Tef
import rx.lang.kotlin.observable
import kotlin.properties.Delegates

open class CornerNode : NodeType {

    override var horizontalEntryBlock: BlockHorizontal by Delegates.notNull()
    override var verticalEntryBlock: BlockVertical by Delegates.notNull()
    override var horizontalEgressBlock: IDispatcheable by Delegates.notNull()
    override var verticalEgressBlock: IDispatcheable by Delegates.notNull()

    constructor(id: String) : super(id)

    override val crossingHorizontalOutgoingCars = observable<Block> { subscriber ->
        horizontalEntryBlock.sendingCars.subscribe { subscriber.onNext(it) }
    }

    override val turningHorizontalOutgoingCars = observable<Block> { subscriber ->
        verticalEntryBlock.sendingCars.subscribe { subscriber.onNext(it) }
    }

    override val crossingVerticalOutgoingCars = observable<Block> { subscriber ->
        verticalEntryBlock.sendingCars.subscribe { subscriber.onNext(it) }
    }

    override val turningVerticalOutgoingCars = observable<Block> { subscriber ->
        horizontalEntryBlock.sendingCars.subscribe { subscriber.onNext(it) }
    }

    override fun getNextTefTime(tef: Tef) : Double {
        val dispH = tef.list.find { it.objectToDispatch.id() == horizontalEgressBlock.id() }!!.time
        val dispV = tef.list.find { it.objectToDispatch.id() == verticalEgressBlock.id() }!!.time
        return (if (dispH < dispV) dispH else dispV) + 1
    }
}