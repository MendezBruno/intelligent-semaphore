package com.thegrid.behavior.model

import com.thegrid.behavior.observer.SemaphoreListener

class SemaphoreNode : CornerNode {

    private val _hTime: Double
    private var _vTime: Double
    private var _vGreen: Boolean = true
    private var _changeListeners : MutableList<SemaphoreListener> = mutableListOf()

    constructor(id:String, hTime:Double, vTime:Double, vGreen: Boolean) : super(id){
        _hTime = hTime
        _vTime = vTime
        _vGreen = vGreen
    }

    public fun getChangeListeners() : MutableList<SemaphoreListener> {
        return _changeListeners;
    }

    public fun getVGreen() : Boolean {
        return _vGreen;
    }

    public fun setVGreen(isGreen: Boolean) {
        this._vGreen = isGreen;
        fireListeners();
    }

    private fun fireListeners() {
        var self = this
        _changeListeners.forEach { listener -> listener.fire(self) }
    }

    public fun equals(other: SemaphoreNode): Boolean {
        return this.id == other.id
    }

}