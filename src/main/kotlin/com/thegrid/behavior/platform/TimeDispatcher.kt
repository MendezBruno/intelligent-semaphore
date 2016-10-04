package com.thegrid.behavior.platform

import com.thegrid.behavior.services.EventList
import com.thegrid.behavior.services.model.PairDispatched
import com.thegrid.behavior.services.Tef
import com.thegrid.communication.model.tefRow

/**
 * Created by CristianErik on 02/09/2016.
 */

class TimeDispatcher() {

    private val _futureEventsTable = Tef()
    val nextEvent : PairDispatched<IDispatcheable>?
        get() {
            if (_futureEventsTable.isNotEmpty()) {
                _futureEventsTable.list.sort()
                return _futureEventsTable.removeAt(0)
            }
            else return null
        }

    init {
        processEvent()
    }

    fun dispatchOn(instant: Double, dispatcheable : IDispatcheable) {
        _futureEventsTable.add(PairDispatched(instant, dispatcheable))
    }

    var  time: Double = 0.0

    fun processEvent() {
        val par = nextEvent
        if (par != null) {
            val dispatcheable = par.objectToDispatch
            val transcurrido = dispatcheable.executeEvent(par.time, _futureEventsTable)

            time = par.time
            dispatchOn(time + transcurrido, dispatcheable)
        } else {
//            _futureEventsTable.addedObjectObserver.take(1).subscribe { processEvent() }
        }
    }

    fun getSummary(): MutableList<tefRow> {
        val summary = mutableListOf<tefRow>()
        _futureEventsTable.list.forEach {
            summary.add(tefRow(it.time, it.objectToDispatch.id()))
        }
        return summary
    }
}