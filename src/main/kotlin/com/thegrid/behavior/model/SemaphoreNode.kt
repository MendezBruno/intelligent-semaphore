package com.thegrid.behavior.model

import com.thegrid.behavior.observer.SemaphoreListener
import com.thegrid.behavior.platform.IDispatcheable

class SemaphoreNode : CornerNode, IDispatcheable {

    private val _hTime: Double
    private var _vTime: Double
    private var _vGreen = true
    private var _changeListeners = mutableListOf<SemaphoreListener>()

    constructor(id:String, hTime:Double, vTime:Double, vGreen: Boolean) : super(id){
        _hTime = hTime
        _vTime = vTime
        _vGreen = vGreen
    }

    override fun executeEvent(time: Double): Double {
        val time = if (_vGreen) _hTime else _vTime
        _vGreen = !_vGreen
        fireListeners()
        return time
    }

    fun getChangeListeners() : MutableList<SemaphoreListener> {
        return _changeListeners
    }

    fun getVGreen() : Boolean {
        return _vGreen
    }

    fun setVGreen(isGreen: Boolean) {
        this._vGreen = isGreen
        fireListeners()
    }

    private fun fireListeners() {
        _changeListeners.forEach { listener -> listener.fire(this) }
    }

    fun equals(other: SemaphoreNode): Boolean {
        return this.id == other.id
    }

}