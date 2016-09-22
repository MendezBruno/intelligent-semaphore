package com.thegrid.behavior.platform

import com.thegrid.behavior.services.EventList
import com.thegrid.behavior.services.model.PairDispatched

interface IDispatcheable {

    /**
     * @return lo que duró el evento
     */
    fun executeEvent(time: Double, futureEventsTable: EventList<PairDispatched<IDispatcheable>>): Double

    fun id() : String
}
