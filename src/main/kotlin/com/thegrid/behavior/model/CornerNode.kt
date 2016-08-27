package com.thegrid.behavior.model

class CornerNode : NodeType {

    private var _horizontalEntryBlock: Block? = null
    private var _verticalEntryBlock: Block? = null
    private var _horizontalEgressBlock: Block? = null
    private var _verticalEgressBlock: Block? = null

    constructor(id: String) : super(id)

    override fun addEgressBlock(block: Block) {
        if (block.hasVerticalDirection()) _verticalEgressBlock = block
        else _horizontalEgressBlock = block
    }

    override fun addEntryBlock(block: Block) {
        if (block.hasVerticalDirection()) _verticalEntryBlock = block
        else _horizontalEntryBlock = block
    }

}