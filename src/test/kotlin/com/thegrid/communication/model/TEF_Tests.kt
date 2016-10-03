package com.thegrid.communication.model

import com.thegrid.behavior.model.*
import com.thegrid.behavior.platform.IDispatcheable
import com.thegrid.behavior.platform.TimeDispatcher
import com.thegrid.behavior.services.EventList
import com.thegrid.behavior.services.model.PairDispatched
import com.thegrid.behavior.services.Tef
import org.jetbrains.spek.api.Spek

class TEF_Tests: Spek({
    given("una TEF") {
        on("ordenamiento") {

            it("debe ordenarse de menor a mayor") {
                val dispatcheable1 : IDispatcheable = object : IDispatcheable {
                    override fun executeEvent(time: Double, tef: Tef): Double {
                        return 50.0
                    }

                    override fun id(): String {
                        return ""
                    }
                }
                val dispatcheable2 : IDispatcheable = object : IDispatcheable {
                    override fun executeEvent(time: Double, tef: Tef): Double {
                        return 50.0
                    }

                    override fun id(): String {
                        return ""
                    }
                }
                val dispatcheable3 : IDispatcheable = object : IDispatcheable {
                    override fun executeEvent(time: Double, tef: Tef): Double {
                        return 50.0
                    }

                    override fun id(): String {
                        return ""
                    }
                }

                val timeDispatcher = TimeDispatcher()
                timeDispatcher.dispatchOn(3.0,dispatcheable1)
                timeDispatcher.dispatchOn(2.0,dispatcheable2)
                timeDispatcher.dispatchOn(1.0,dispatcheable3)

                timeDispatcher.processEvent()
                val assert1Arg = timeDispatcher.time
                assert(timeDispatcher.time == 1.0, { println("$assert1Arg no es igual a 1.0")});
                timeDispatcher.processEvent()
                val assert2Arg = timeDispatcher.time
                assert(timeDispatcher.time == 2.0, { println("$assert2Arg no es igual a 2.0")});
                timeDispatcher.processEvent()
                val assert3Arg = timeDispatcher.time
                assert(timeDispatcher.time == 3.0, { println("$assert3Arg no es igual a 3.0")});
            }
        }
    }
})
