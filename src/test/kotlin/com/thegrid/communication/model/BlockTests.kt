package com.thegrid.communication.model

import com.github.salomonbrys.kotson.*
import com.google.gson.Gson
import com.thegrid.behavior.model.*
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

                block.executeEvent(0.0, _futureEventsTable)
                semaphoreNode.executeEvent(5.0, _futureEventsTable)
                block.executeEvent(10.0, _futureEventsTable)
                semaphoreNode.executeEvent(12.0, _futureEventsTable)
                semaphoreNode.executeEvent(14.0, _futureEventsTable)
                block.executeEvent(16.0, _futureEventsTable)
            }
        }
    }
})