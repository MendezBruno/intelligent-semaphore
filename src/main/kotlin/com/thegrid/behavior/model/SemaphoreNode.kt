package com.thegrid.behavior.model

import com.thegrid.behavior.observer.SemaphoreListener

class SemaphoreNode : NodeType {

    private var _horizontalEntryBlock: Block? = null
    private var _verticalEntryBlock: Block? = null
    private var _horizontalEgressBlock: Block? = null
    private var _verticalEgressBlock: Block? = null
    private val _hTime: Double
    private var _vTime: Double
    private var _vGreen: Boolean = true
    private var _changeListeners : MutableList<SemaphoreListener> = mutableListOf()

    constructor(id:String, hTime:Double, vTime:Double, vGreen: Boolean) : super(id){
        _hTime = hTime
        _vTime = vTime
        _vGreen = vGreen
    }

    override fun addEgressBlock(block: Block) {
        if (block.hasVerticalDirection()) _verticalEgressBlock = block
        else _horizontalEgressBlock = block
    }

    override fun addEntryBlock(block: Block) {
        if (block.hasVerticalDirection()) _verticalEntryBlock = block
        else _horizontalEntryBlock = block
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