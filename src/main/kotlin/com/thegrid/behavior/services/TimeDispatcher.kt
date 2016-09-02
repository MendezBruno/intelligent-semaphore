package com.thegrid.behavior.services

import com.thegrid.behavior.model.Block
import com.thegrid.behavior.model.SemaphoreNode
import com.thegrid.behavior.services.model.PairDispatched
import org.omg.CORBA.Object
import java.sql.Timestamp

/**
 * Created by CristianErik on 02/09/2016.
 */

class TimeDispatcher() {

    private val _futureEventsTable = mutableListOf<PairDispatched<Any>>()
    val nextEvent : PairDispatched<Any>
        get() = _futureEventsTable.sortedBy { it }.first()

    fun dispatchOn(timeStamp: Timestamp, dispatcheable : Any) {
        _futureEventsTable.add(PairDispatched(timeStamp, dispatcheable))
    }
}

