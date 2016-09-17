package com.thegrid.behavior.model

import com.thegrid.behavior.extensions.Direction
import com.thegrid.behavior.freeFunctions.flip
import com.thegrid.behavior.observer.SemaphoreListener
import com.thegrid.behavior.platform.IDispatcheable
import rx.lang.kotlin.observable

class SemaphoreNode : CornerNode, IDispatcheable {
    var changeListeners = mutableListOf<SemaphoreListener>()
    var direction: Direction = Direction.vertical()
    set(value) {
        field = value
        fireListeners()
    }
    private val _hTime: Double
    private var _vTime: Double

    constructor(id:String, hTime:Double, vTime:Double, direction: Direction = Direction.vertical()) : super(id){
        _hTime = hTime
        _vTime = vTime
        this.direction = direction
    }

    override fun executeEvent(time: Double): Double {
        direction = flip(direction)
        fireListeners()
        return when(direction) {
            Direction.Vertical -> _vTime
            Direction.Horizontal -> _hTime
        }
    }

    override val crossingHorizontalOutgoingCars = observable<Block> { subscriber ->
        horizontalEntryBlock.sendingCars.subscribe { if(direction == Direction.Horizontal) subscriber.onNext(it) }
    }

    override val turningHorizontalOutgoingCars = observable<Block> { subscriber ->
        verticalEntryBlock.sendingCars.subscribe { if(direction == Direction.Horizontal) subscriber.onNext(it) }
    }

    override val crossingVerticalOutgoingCars = observable<Block> { subscriber ->
        verticalEntryBlock.sendingCars.subscribe { if(direction == Direction.Vertical) subscriber.onNext(it) }
    }

    override val turningVerticalOutgoingCars = observable<Block> { subscriber ->
        horizontalEntryBlock.sendingCars.subscribe { if(direction == Direction.Vertical) subscriber.onNext(it) }
    }

    fun equals(other: SemaphoreNode): Boolean {
        return this.id == other.id
    }

    private fun fireListeners() {
        changeListeners.forEach { listener -> listener.fire(this) }
    }

}
