package com.thegrid.behavior.model

import com.thegrid.behavior.observer.SemaphoreListener

class SemaphoreNode : NodeType {

    private var _horizontalEntryBlock: Block? = null
    private var _verticalEntryBlock: Block? = null
    private var _horizontalEgressBlock: Block? = null
    private var _verticalEgressBlock: Block? = null
    private val _hTime: Double;
    private var _vTime: Double
    private var changeListeners : MutableList<SemaphoreListener> = mutableListOf();

    constructor(id:String, hTime:Double, vTime:Double) : super(id){
        _hTime = hTime;
        _vTime = vTime;
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
        return changeListeners;
    }
}