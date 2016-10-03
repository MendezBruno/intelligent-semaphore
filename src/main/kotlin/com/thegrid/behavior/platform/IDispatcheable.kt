package com.thegrid.behavior.platform

import com.thegrid.behavior.services.EventList
import com.thegrid.behavior.services.model.PairDispatched
import com.thegrid.behavior.services.Tef

interface IDispatcheable {

    /**
     * @return lo que duró el evento
     */
    fun executeEvent(time: Double, tef: Tef): Double

    fun id() : String
}
