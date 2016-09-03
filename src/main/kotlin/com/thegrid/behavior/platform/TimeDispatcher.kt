package com.thegrid.behavior.platform

import com.thegrid.behavior.model.Block
import com.thegrid.behavior.model.NodeType
import com.thegrid.behavior.model.SemaphoreNode
import com.thegrid.behavior.services.EventList
import com.thegrid.behavior.services.model.PairDispatched
import org.omg.CORBA.Object
import java.sql.Timestamp

/**
 * Created by CristianErik on 02/09/2016.
 */

class TimeDispatcher() {

    private val _futureEventsTable = EventList<PairDispatched<Any>>()
    val nextEvent : PairDispatched<Any>?
        get() {
            if (_futureEventsTable.size > 0) return _futureEventsTable.sorted().first()
            else return null
        }

    init {
        processEvent()
    }

    fun dispatchOn(timeStamp: Timestamp, dispatcheable : Any) {
        _futureEventsTable.add(PairDispatched(timeStamp, dispatcheable))
    }

    private fun processEvent() {
        val dispatcher = nextEvent
        if (dispatcher != null) {
            when(dispatcher) {
                is Block -> return //TODO Aca deberiamos decirle un "dispatcher.doYourThing()"  
                is NodeType -> return
                //TODO- Probablemente deberiamos tener una sola interfaz de dispatcheable y nos evitamos el smart cast
            }
        } else {
            _futureEventsTable.addedObjectObserver.take(1).subscribe { processEvent() }
        }
    }

}


