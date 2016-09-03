package com.thegrid.behavior.model

import com.thegrid.behavior.observer.BlockListener
import com.thegrid.behavior.platform.IDispatcheable
import com.thegrid.communication.extension.RGBA
import rx.Observable
import rx.lang.kotlin.observable
import java.util.*

/**Es la cuadra que tiene relación
 * directa con una cuadra del json
 */
abstract class Block(
        val id: String,
        val street: Street,
        val length: Int/*Double*/,
        val entryNode: NodeType) : BlockBase(), IDispatcheable {

    val colorStatus = RGBA(0,0,0,1)
    val carCapacity: Int = 3 //TODO calcular segun length, algo como Int(length/"valor promedio de largo de vehiculos)
    val changeListeners: MutableList<BlockListener> = mutableListOf()

    protected var _incomingCarsAmount: Int = 0
    protected val _incomingCarsAvailability: Int = carCapacity / 2 - _incomingCarsAmount
    protected val _outgoingCarsAvailability: Int = carCapacity / 2 - outgoingCrossingByCarsAmount - outgoingTurningCarsAmount
    protected var _timer: Observable<Int> = observable {  }
    override var sendingCars = _timer.doOnEach {
        moveCarsToTheFront()
        println(this.toString())
    }.map { this }

    init {
        street.addBlock(this)
    }

    override fun executeEvent(): Double {
        moveCarsToTheFront()
        fireListeners()
        return 5000-Random().nextDouble()
    }

    abstract fun setAsEntryBlock(node: NodeType)
    abstract fun startObservation()

    private fun fireListeners() {
        var self = this
        changeListeners.forEach { listener -> listener.fire(self) }
    }

    fun hasVerticalDirection() : Boolean{
        return street.orientation == Orientation.South || street.orientation == Orientation.North
    }

    private fun moveCarsToTheFront() {
        val totalAmount: Int
        if (_incomingCarsAmount <= _outgoingCarsAvailability) {
            totalAmount = _incomingCarsAmount
            _incomingCarsAmount = 0
        } else {
            _incomingCarsAmount -= _outgoingCarsAvailability
            totalAmount = _outgoingCarsAvailability
        }
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

    //Metodo a mode de ejemplo, sin mucho sentido
    fun setStock(stk:Int) {
        outgoingCrossingByCarsAmount = stk
        changeColor()
        fireListeners()
    }

    private fun changeColor() {
        when (outgoingCrossingByCarsAmount) {
            in 1..10 -> colorStatus.set(189,210,195)
            in 11..20 -> colorStatus.set(184,189,142)
            in 21..30 -> colorStatus.set(189,210,195)
            in 31..40 -> colorStatus.set(227,206,132)
            in 41..50 -> colorStatus.set(234,95,95)
        }
    }
}