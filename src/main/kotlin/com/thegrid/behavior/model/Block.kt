package com.thegrid.behavior.model

import com.thegrid.behavior.extensions.Probabilities
import com.thegrid.behavior.observer.BlockListener
import com.thegrid.behavior.platform.IDispatcheable
import com.thegrid.behavior.services.EventList
import com.thegrid.behavior.services.model.PairDispatched
import com.thegrid.behavior.state.BlockState
import com.thegrid.communication.extension.RGBA
import rx.lang.kotlin.ReplaySubject
import rx.subjects.ReplaySubject
import kotlin.properties.Delegates

/**Es la cuadra que tiene relación
 * directa con una cuadra del json
 */
open class Block(
        val id: String,
        val street: Street,
        val length: Int,
        val entryNode: NodeType,
        val egressNode: NodeType,
        var blockState: BlockState) : BlockBase(), IDispatcheable {

    var crossingBlock by Delegates.notNull<IDispatcheable>()
    var turningBlock by Delegates.notNull<IDispatcheable>()
    protected open var _turningProbability: Double = 0.5 * TurningModifier       //Valor inicial
    protected open var _crossingProbability: Double = 1 - _turningProbability    //Valor inicial

    override fun id(): String {
        return id
    }

    val colorStatus = RGBA(0,0,0,1)
    var congestion = 0.0
    var congestionLevel = CongestionLevel.SIN_CONGESTION
    var q_carFlow = 0.0
    var k_density = 0.0
    var a_lastCarsInput = 0
    var v_max = 60.0 / 3.6 //Podria cambiar si es calle/avenida
    var velocity = v_max
    var t1_lastCarInputDuration = 0.0
    var t_min = 6.0 //Calcular desde los atributos de la calle
    var previusEventTime = 0.0
    var capacidad = (length / 5)*street.lanes
    val timeForMaxCongestion = 70.0 // Segundos que "delatan" que hay congestión

    val changeListeners = mutableListOf<BlockListener>()
    //        set(value) = if(value + outgoingTurningCarsAmount + outgoingCrossingByCarsAmount < _carCapacity)
//            field = value

    val stk: Int
        get() = _incomingCarsAmount + outgoingTurningCarsAmount + outgoingCrossingByCarsAmount
    protected val _carCapacity: Int
    var _incomingCarsAmount = 0

//            else field = _carCapacity - outgoingCrossingByCarsAmount - outgoingTurningCarsAmount

    protected var _replayer: ReplaySubject<Int> = ReplaySubject(50)

    override var sendingCars = _replayer.map { this }

    init {
        street.addBlock(this)
        _carCapacity = (length / LongVehicule).toInt() * street.lanes
        relateNodes()
    }

    override fun relateNodes() { }

    override fun startObservation() {
        throw UnsupportedOperationException("not implemented")
    }

    private var lastDurationExitCar: Double = 0.0

    override fun executeEvent(time: Double, futureEventsTable: EventList<PairDispatched<IDispatcheable>>): Double {
        t1_lastCarInputDuration = time - previusEventTime
        previusEventTime = time
        val prevStk = stk
        moveCarsToTheFront()
        println("tiempo dormido: $t1_lastCarInputDuration")
        println("autos que entraron mientras yo estaba dormido: $a_lastCarsInput")
        fireReplay()
        var autosSalida = prevStk - stk
//        autosSalida += Math.abs(autosQuePasaronACruzar - outgoingCrossingByCarsAmount).toDouble()
//        autosSalida += Math.abs(autosQuePasaronADoblar - outgoingTurningCarsAmount).toDouble()
      //  val q_salida = if(lastDurationExitCar==0.0) 0.0 else autosSalida / lastDurationExitCar
        val q_salida = blockState.calcularFlujoSalida(autosSalida, t1_lastCarInputDuration,capacidad,stk,v_max)
        val q_entrada = blockState.calcularFlujoEntrada(a_lastCarsInput, t1_lastCarInputDuration,capacidad,stk,v_max)
      //  val q_entrada = if(t1_lastCarInputDuration==0.0) 0.0 else a_lastCarsInput / t1_lastCarInputDuration
        q_carFlow = Math.abs(q_entrada + q_salida) / 2
       // velocity = if (stk == 0) v_max else (q_carFlow * length * street.lanes) / stk
        velocity = blockState.calcularVelocidad(q_carFlow,stk,capacidad,street,v_max)
        val eventDuration: Double
        if (outgoingCrossingByCarsAmount + outgoingTurningCarsAmount > 0) {
            val dispC = futureEventsTable.list.find { it.objectToDispatch.id() == crossingBlock.id() }!!.time
            val dispT = futureEventsTable.list.find { it.objectToDispatch.id() == turningBlock.id() }!!.time
            var nextTime = (if (dispC < dispT) dispC else dispT) + 1
            if (nextTime < time) {
                nextTime = time + 50
                println("## WARN: Tiempo de otra cuadra menor al actual")
            }
            eventDuration = nextTime - time
        } else {
            eventDuration = length / velocity
        }

        fireListeners()
        lastDurationExitCar = eventDuration
        congestion = calcularCongestion()
        changeColor()

        println("Cuadra: $id nivel de congestion: $congestionLevel congestion: $congestion vel:$velocity");
        println("Cuadra MID - CrossProb: $_crossingProbability - TurnProb: $_turningProbability - STK:$stk")
        println("Tiempo: $time Proximo tiempo: ${time+eventDuration}")
        println("Q entrada: $q_entrada")
        println("Q salida: $q_salida autosSalida: $autosSalida")
        println("flujo promedio: $q_carFlow")
        println("*************************************************************************")

        a_lastCarsInput = 0
        return eventDuration
    }

    private fun calcularCongestion(): Double {
        val new_t = if (velocity > 0.0) length / velocity else (timeForMaxCongestion + t_min)
        val numCon = (new_t - t_min) / timeForMaxCongestion * 100
        val congestion = if (numCon < 0) 0.0 else numCon
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
        //ve = ble
        //if(ve > vmax) t = tmin

        if (a_lastCarsInput == 0) return t_min
        return stk / a_lastCarsInput * t1_lastCarInputDuration / street.lanes
    }

    private fun update_q_flowCar() {
        if (t1_lastCarInputDuration == 0.0) return
        q_carFlow = a_lastCarsInput / t1_lastCarInputDuration
    }

    private fun moveCarsToTheFront() {
        val crossing = (_incomingCarsAmount * _crossingProbability).toInt()
        outgoingCrossingByCarsAmount += crossing
        outgoingTurningCarsAmount += _incomingCarsAmount - crossing
        _incomingCarsAmount = 0
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
//        val density = stk.toDouble() / _carCapacity
//        (density * 255).toInt(),(1 - density).toInt() * 255,0)
        congestionLevel = CongestionLevel.ofPercentage(congestion)
        when(congestionLevel) {
            CongestionLevel.SIN_CONGESTION -> colorStatus.set(179,179,179)
            CongestionLevel.LEVE -> colorStatus.set(248,255,25 )
            CongestionLevel.MEDIANA ->  colorStatus.set(255,179,102)
            CongestionLevel.PESADA -> colorStatus.set(255,77,77)
            else -> colorStatus.set (204,0,0 )}
    }

    fun fireReplay() {
        _replayer.onNext(1)
    }

    open fun getLastCarInputDuration(previusEventTime: Double, now: Double): Double {
        return 0.0
    }

    open fun relateOutgoingBlocks() { }
}


