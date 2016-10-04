package com.thegrid.communication.model

import com.github.salomonbrys.kotson.*
import com.google.gson.Gson
import com.thegrid.behavior.model.*
import com.thegrid.behavior.platform.IDispatcheable
import com.thegrid.behavior.services.EventList
import com.thegrid.behavior.services.model.PairDispatched
import com.thegrid.behavior.services.Tef
import com.thegrid.communication.services.MapConversor
import org.jetbrains.spek.api.Spek

class BlockTests: Spek({
    given("una cuadra") {
        on("block executes its event") {

            it("should algo") {
                val street = Street(1, Orientation.West, mutableListOf(), 0)
                val semaphoreNode = SemaphoreNode("sem1", 2.0, 3.0)
                val fin = EgressNode("nodox",10,5)
                val injectCarsblock = Block("", street, 0, semaphoreNode, fin)
                val blockHorizontal = BlockHorizontal("", street, 100, semaphoreNode, fin )

                val crossingBlock : IDispatcheable = object : IDispatcheable {
                    override fun executeEvent(time: Double, tef: Tef): Double {
                        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
                    }

                    override fun id(): String {
                        return "crossing-id"
                    }
                }

                val turningBlock : IDispatcheable = object : IDispatcheable {
                    override fun executeEvent(time: Double, tef: Tef): Double {
                        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
                    }

                    override fun id(): String {
                        return "turning-id"
                    }
                }
                blockHorizontal.crossingBlock = crossingBlock
                blockHorizontal.turningBlock = turningBlock
                blockHorizontal.sendingCars.subscribe {
                    if (it.outgoingCrossingByCarsAmount > 1)
                        it.outgoingCrossingByCarsAmount -= 1
                    if (it.outgoingTurningCarsAmount > 1)
                        it.outgoingTurningCarsAmount -= 1
                }

                val par1 = PairDispatched(0.0,turningBlock)
                val par2 = PairDispatched(0.0,crossingBlock)
                val TEF = Tef()
                TEF.add(PairDispatched(0.0,blockHorizontal))
                TEF.add(PairDispatched(0.0,semaphoreNode))
                TEF.add(PairDispatched(0.0,fin))
                TEF.add(par1)
                TEF.add(par2)

                var tiempo = 0.0
                tiempo += blockHorizontal.executeEvent(tiempo, TEF)
                semaphoreNode.executeEvent(2.0, TEF)
                semaphoreNode.executeEvent(5.0, TEF)
                semaphoreNode.executeEvent(7.0, TEF)
                semaphoreNode.executeEvent(10.0, TEF)
                par1.time = 12.0
                par2.time = 13.0
                injectCarsblock.outgoingCrossingByCarsAmount = 150
                blockHorizontal.processCrossingHorizontalOutgoingCars(injectCarsblock)
                tiempo += blockHorizontal.executeEvent(tiempo, TEF)
                semaphoreNode.executeEvent(12.0, TEF)
                semaphoreNode.executeEvent(15.0, TEF)
                par1.time = 18.0
                par2.time = 20.0
                injectCarsblock.outgoingCrossingByCarsAmount = 11
                blockHorizontal.processCrossingHorizontalOutgoingCars(injectCarsblock)
                blockHorizontal.executeEvent(tiempo, TEF)
                semaphoreNode.executeEvent(17.0, TEF)
            }
        }
    }
})