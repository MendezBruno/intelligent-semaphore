package com.thegrid.behavior.platform

import com.thegrid.behavior.model.Block
import com.thegrid.behavior.model.NodeType
import com.thegrid.behavior.model.SemaphoreNode
import com.thegrid.behavior.services.EventList
import com.thegrid.behavior.services.model.PairDispatched
import org.omg.CORBA.Object
import java.sql.Timestamp
import java.time.Duration

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

    fun dispatchOn(timeStamp: Timestamp, dispatcheable : IDispatcheable) {
        _futureEventsTable.add(PairDispatched(timeStamp, dispatcheable))
    }

    fun processEvent() {
        val par = nextEvent
        if (par != null) {
            val dispatcheable = par.objectToDispatch
            val transcurrido = dispatcheable.executeEvent()
            val proximoT = par.timeStamp.toInstant() +
                    Duration.ofMinutes(transcurrido.toLong())

            dispatchOn(Timestamp.from(proximoT),dispatcheable)
        } else {
            _futureEventsTable.addedObjectObserver.take(1).subscribe { processEvent() }
        }
    }
}