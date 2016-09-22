package com.thegrid.behavior.model

import com.thegrid.behavior.extensions.Direction
import com.thegrid.behavior.extensions.Queue
import com.thegrid.behavior.freeFunctions.flip
import com.thegrid.behavior.observer.SemaphoreListener
import com.thegrid.behavior.platform.IDispatcheable
import com.thegrid.behavior.services.EventList
import com.thegrid.behavior.services.model.PairDispatched
import rx.lang.kotlin.observable

class SemaphoreNode : CornerNode, IDispatcheable {

    override fun id(): String {
        return id
    }

    var changeListeners = mutableListOf<SemaphoreListener>()
    var direction: Direction = Direction.vertical()
    set(value) {
        field = value
        fireListeners()
    }
    private val _hLogQueue = Queue<TimeLog>()
    private val _vLogQueue = Queue<TimeLog>()
    private val _hTime: Double
    private var _vTime: Double

    constructor(id:String, hTime:Double, vTime:Double, direction: Direction = Direction.vertical()) : super(id){
        _hTime = hTime
        _vTime = vTime
        this.direction = direction
    }

    override fun executeEvent(time: Double, futureEventsTable: EventList<PairDispatched<IDispatcheable>>): Double {
        direction = flip(direction)
        fireListeners()
        return when(direction) {
            Direction.Vertical -> {
                _vLogQueue.push(TimeLog(time,_vTime))
                _vTime
            }
            Direction.Horizontal -> {
                _vLogQueue.push(TimeLog(time,_hTime))
                _hTime
            }
        }
    }

    private fun getOnlineTime(start:Double, end:Double, logQueue: Queue<TimeLog>): Double {
        var time = 0.0
        while (!logQueue.isEmpty) {
            val log = logQueue.head()!!.data
            if (log.endTime() < end) {
                if (log.t <= start) time += log.endTime() - start
                if (log.t > start) time += log.duration
                logQueue.pop()
                continue
            }

            //A partir de aca se que el evento dura más alla que 'end'
            //Salgo del while
            if (log.t <= start) time += end - start
            else time += end - log.t
            break
        }
        return time
    }

    override fun getOnlineTimeH(start:Double, end:Double): Double {
        return getOnlineTime(start,end,_hLogQueue)
    }

    override fun getOnlineTimeV(start:Double, end:Double): Double {
        return getOnlineTime(start,end,_vLogQueue)
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

