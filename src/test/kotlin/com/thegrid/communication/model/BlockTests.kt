package com.thegrid.communication.model

import com.github.salomonbrys.kotson.*
import com.google.gson.Gson
import com.thegrid.behavior.model.*
import com.thegrid.behavior.platform.IDispatcheable
import com.thegrid.behavior.services.EventList
import com.thegrid.behavior.services.model.PairDispatched
import com.thegrid.communication.services.MapConversor
import org.jetbrains.spek.api.Spek

class BlockTests: Spek({
    given("una cuadra") {
        on("block executes its event") {

            it("should algo") {
                val street = Street(0, Orientation.West, mutableListOf(), 0)
                val semaphoreNode = SemaphoreNode("sem1", 1.0, 1.0)
                val fin = EgressNode("nodox",10,5)
                val block = Block("", street, 0, semaphoreNode, fin)

                val TEF = EventList<PairDispatched<IDispatcheable>>()
                TEF.add(PairDispatched(0.0,block))
                TEF.add(PairDispatched(0.0,semaphoreNode))

                block.executeEvent(0.0, TEF)
                semaphoreNode.executeEvent(5.0, TEF)
                block.executeEvent(10.0, TEF)
                semaphoreNode.executeEvent(12.0, TEF)
                semaphoreNode.executeEvent(14.0, TEF)
                block.executeEvent(16.0, TEF)
            }
        }
    }
})