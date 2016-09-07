package com.thegrid.behavior.model

import com.thegrid.behavior.extensions.Probabilities
import com.thegrid.behavior.observer.BlockListener
import com.thegrid.behavior.platform.IDispatcheable
import com.thegrid.communication.extension.RGBA
import rx.lang.kotlin.ReplaySubject
import rx.subjects.ReplaySubject
import java.util.*

/**Es la cuadra que tiene relación
 * directa con una cuadra del json
 */
open class Block(
        val id: String,
        val street: Street,
        val length: Int/*Double*/,
        val entryNode: NodeType) : BlockBase(), IDispatcheable {

    protected open var _turningProbability: Double = 0.5 * TurningModifier       //Valor inicial
    protected open var _crossingProbability: Double = 1 - _turningProbability    //Valor inicial

    val colorStatus = RGBA(0,0,0,1)
    val changeListeners = mutableListOf<BlockListener>()
    val stk: Int
        get() = _incomingCarsAmount + outgoingTurningCarsAmount + outgoingCrossingByCarsAmount

    protected val _carCapacity: Int
    protected var _incomingCarsAmount = 0
    protected var _replayer: ReplaySubject<Int> = ReplaySubject(50)

    override var sendingCars = _replayer.map { this }

    init {
        street.addBlock(this)
        _carCapacity = (length / LongVehicule).toInt() * street.lanes
    }

    override fun setAsEntryBlock(node: NodeType) {
        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun startObservation() {
        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun executeEvent(time: Double): Double {
        moveCarsToTheFront()
        changeColor()
        println("[Tiempo:$time] Cuadra id:$id stk:$stk")
        fireReplay()
        fireListeners()
        return Random().nextInt(1000).toDouble()
    }

    open fun setProbabilities(value: Probabilities) {
        throw UnsupportedOperationException()
    }

    private fun fireListeners() {
        var self = this
        changeListeners.forEach { listener -> listener.fire(self) }
    }

    fun hasVerticalDirection() : Boolean{
        return street.orientation == Orientation.South || street.orientation == Orientation.North
    }

    private fun moveCarsToTheFront() {
//        apply {
            outgoingCrossingByCarsAmount += (_incomingCarsAmount * _crossingProbability).toInt()
            outgoingTurningCarsAmount += (_incomingCarsAmount * _turningProbability).toInt()
            _incomingCarsAmount = 0
//        }
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
        when (stk) {
            in 0.0..(_carCapacity * 0.2) -> colorStatus.set(0,255,0)
            in (_carCapacity * 0.2)..(_carCapacity * 0.4) -> colorStatus.set(200,255,0)
            in (_carCapacity * 0.4)..(_carCapacity * 0.6) -> colorStatus.set(255,255,0)
            in (_carCapacity * 0.6)..(_carCapacity * 0.8) -> colorStatus.set(255,150,0)
            in (_carCapacity * 0.8)..(_carCapacity * 1.00)  -> colorStatus.set(255,0,0)
        }
    }

    fun fireReplay() {
        _replayer.onNext(1)
    }
}