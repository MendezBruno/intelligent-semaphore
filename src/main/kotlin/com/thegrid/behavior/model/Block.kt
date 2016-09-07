package com.thegrid.behavior.model

import com.thegrid.behavior.observer.BlockListener
import com.thegrid.behavior.platform.IDispatcheable
import com.thegrid.communication.extension.RGBA
import rx.lang.kotlin.ReplaySubject
import java.util.*

/**Es la cuadra que tiene relación
 * directa con una cuadra del json
 */
open class Block(
        val id: String,
        val street: Street,
        val length: Int/*Double*/,
        val entryNode: NodeType) : BlockBase(), IDispatcheable {

    override fun setAsEntryBlock(node: NodeType) {
        throw UnsupportedOperationException()
    }

    override fun startObservation() {
        throw UnsupportedOperationException()
    }

    val colorStatus = RGBA(0,0,0,1)
    val carCapacity: Int
    val changeListeners = mutableListOf<BlockListener>()

    protected var _incomingCarsAmount = 0
    protected val _stk: Int
        get() = _incomingCarsAmount + outgoingTurningCarsAmount + outgoingCrossingByCarsAmount
    protected var _replayer = ReplaySubject<Int>(50)
    override var sendingCars = _replayer.map { this }

    init {
        street.addBlock(this)
        carCapacity = (length/4).toInt() * street.lanes
    }

    override fun executeEvent(time: Double): Double {
        moveCarsToTheFront()
        changeColor()
        println("[Tiempo:$time] Cuadra id:$id stk:$_stk")
        fireReplay()
        fireListeners()
        return Random().nextInt(1000).toDouble()
    }

    private fun fireListeners() {
        var self = this
        changeListeners.forEach { listener -> listener.fire(self) }
    }

    fun getStk() : Int {
        return _stk
    }

    fun hasVerticalDirection() : Boolean{
        return street.orientation == Orientation.South || street.orientation == Orientation.North
    }

    private fun moveCarsToTheFront() {
        val totalAmount = _incomingCarsAmount
        _incomingCarsAmount = 0
        val leftAmount = (totalAmount * 0.5).toInt()
        outgoingCrossingByCarsAmount += leftAmount
        outgoingTurningCarsAmount += totalAmount - leftAmount
    }

    override fun equals(other: Any?): Boolean {
        if (other is Block)
            return this.id == other.id
        else return super.equals(other)
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }

    private fun changeColor() {
        when (_stk) {
            in 1..10 -> colorStatus.set(189,210,195)
            in 11..20 -> colorStatus.set(184,189,142)
            in 21..30 -> colorStatus.set(189,210,195)
            in 31..40 -> colorStatus.set(227,206,132)
            in 41..50 -> colorStatus.set(234,95,95)
        }
    }

    fun fireReplay() {
        _replayer.onNext(1)
    }
}