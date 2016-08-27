package com.thegrid.behavior.model

/**
 * Created by Surakituaka on 05/08/2016.
 */

class EgressNode : NodeType {

    private var _entryBlock: Block? = null
    private var _interval: Int
    private var _maxAmount: Int

    constructor(id:String, interval:Int, maxAmount:Int) : super(id) {
        _maxAmount = maxAmount;
        _interval = interval;
    }

    override fun addEgressBlock(block: Block) {
        throw UnsupportedOperationException("EgressNode doesn't have EgressBlock")
    }

    override fun addEntryBlock(block: Block) {
        _entryBlock = block
    }
}