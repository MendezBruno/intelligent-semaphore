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

    //Simulation vars
    val colorStatus = RGBA(0,0,0,1)
    var congestion = 0.0
    var congestionLevel = CongestionLevel.SIN_CONGESTION
    var velocity = 0.0
    var q_carFlow = 0.0
    var k_density = 0.0
    var a_lastCarsInput = 0
    var v_max = 60 //Podria cambiar si es calle/avenida
    var t1_lastCarInputDuration = 0.0
    var t_min = 6.0 //Calcular desde los atributos de la calle
    var previusEventTime = 0.0
    val timeForMaxCongestion = 20.0 // Segundos que "delatan" que hay congestión

    val changeListeners = mutableListOf<BlockListener>()
    //        set(value) = if(value + outgoingTurningCarsAmount + outgoingCrossingByCarsAmount < _carCapacity)
//            field = value

    val stk: Int
        get() = _incomingCarsAmount + outgoingTurningCarsAmount + outgoingCrossingByCarsAmount
    protected val _carCapacity: Int
    protected var _incomingCarsAmount = 0

//            else field = _carCapacity - outgoingCrossingByCarsAmount - outgoingTurningCarsAmount

    protected var _replayer: ReplaySubject<Int> = ReplaySubject(50)

    override var sendingCars = _replayer.map { this }

    init {
        street.addBlock(this)
        _carCapacity = (length / LongVehicule).toInt() * street.lanes
    }

    override fun setAsEntryBlock(node: NodeType) {
        throw UnsupportedOperationException("not implemented")
    }

    override fun startObservation() {
        throw UnsupportedOperationException("not implemented")
    }

    override fun executeEvent(time: Double): Double {
        t1_lastCarInputDuration = getLastCarInputDuration(previusEventTime, time)
        moveCarsToTheFront()
        val nextTime = if (nextTime() < t_min) t_min else nextTime()
        congestion = calcularCongestion(nextTime)
        changeColor()
        println("Cuadra MID - CrossProb: $_crossingProbability - TurnProb: $_turningProbability - STK:$stk")
        fireReplay()
        fireListeners()
        a_lastCarsInput = 0
        return nextTime
    }

    private fun calcularCongestion(nextTime: Double): Double {
        val congestion = (nextTime - t_min) / timeForMaxCongestion * 100
        return if (congestion > 100) 100.0 else congestion
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

    private fun nextTime(): Double {
        if (a_lastCarsInput == 0) return 4000.0
        return stk / a_lastCarsInput * t1_lastCarInputDuration / street.lanes
    }

    private fun update_q_flowCar() {
        if (t1_lastCarInputDuration == 0.0) return
        q_carFlow = a_lastCarsInput / t1_lastCarInputDuration
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
        val density = stk.toDouble() / _carCapacity
        colorStatus.set((density * 255).toInt(),(1 - density).toInt() * 255,0)

        congestionLevel = CongestionLevel.ofPercentage(congestion);
    }

    fun fireReplay() {
        _replayer.onNext(1)
    }

    open fun getLastCarInputDuration(previusEventTime: Double, now: Double): Double {
        return 0.0
    }
}