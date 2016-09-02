package com.thegrid.behavior.services

import com.thegrid.behavior.model.Block
import com.thegrid.behavior.model.SemaphoreNode
import com.thegrid.behavior.services.model.PairDispatched
import org.omg.CORBA.Object
import java.security.Timestamp

/**
 * Created by CristianErik on 02/09/2016.
 */

class TimeDispatcher() {

    companion object {
        val SharedInstance: TimeDispatcher = TimeDispatcher()
    }

   val  futureEventsTable = mutableListOf<PairDispatched<Object>>()
        get() = futureEventsTable.sorted()

    fun dispatchOn(timeStamp: Timestamp, block: Block) {
        futureEventsTable
    }

    fun dispatchOn(timeStamp: Timestamp, block: SemaphoreNode) {

    }

}

