package com.thegrid.behavior.platform

import com.thegrid.behavior.services.EventList
import com.thegrid.behavior.services.model.PairDispatched

/**
 * Created by CristianErik on 02/09/2016.
 */

class TimeDispatcher() {

    private val _futureEventsTable = EventList<PairDispatched<IDispatcheable>>()
    val nextEvent : PairDispatched<IDispatcheable>?
        get() {
            if (_futureEventsTable.isNotEmpty()) {
                _futureEventsTable.sorted()
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

    fun processEvent() {
        val par = nextEvent
        if (par != null) {
            val dispatcheable = par.objectToDispatch
            val transcurrido = dispatcheable.executeEvent()

            dispatchOn(par.time + transcurrido, dispatcheable)
        } else {
//            _futureEventsTable.addedObjectObserver.take(1).subscribe { processEvent() }
        }
    }
}