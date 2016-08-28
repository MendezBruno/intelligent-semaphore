package com.thegrid.behavior.model

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

    override fun setHorizontalEgressBlock(block: BlockHorizontal) {
        _egressBlock = block
    }

    override fun setVerticalEgressBlock(block: BlockVertical) {
        _egressBlock = block
    }

    override fun setHorizontalEntryBlock(block: BlockHorizontal) {
        throw UnsupportedOperationException("EntryNode doesn't have an EntryBlock")
    }

    override fun setVerticalEntryBlock(block: BlockVertical) {
        throw UnsupportedOperationException("EntryNode doesn't have an EntryBlock")
    }
}