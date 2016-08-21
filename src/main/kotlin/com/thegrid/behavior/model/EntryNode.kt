package com.thegrid.communication.model

/**
 * Created by Surakituaka on 05/08/2016.
 */

class EntryNode : NodeType {

    private var _egressBlock: Block? = null
    private var _interval: Int
    private var _maxAmount: Int

    constructor(id:String, interval:Int, maxAmount:Int) : super(id) {
        _maxAmount = maxAmount;
        _interval = interval;
    }

    override fun addEgressBlock(block: Block) {
        _egressBlock = block
    }

    override fun addEntryBlock(block: Block) {
        throw UnsupportedOperationException("EntryNode doesn't have an EntryBlock")
    }

}