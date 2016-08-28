package com.thegrid.behavior.model

import kotlin.properties.Delegates

open class CornerNode : NodeType {

    protected var _horizontalEntryBlock: BlockHorizontal by Delegates.notNull()
    protected var _horizontalEgressBlock: BlockHorizontal by Delegates.notNull()
    protected var _verticalEntryBlock: BlockVertical by Delegates.notNull()
    protected var _verticalEgressBlock: BlockVertical by Delegates.notNull()

    constructor(id: String) : super(id)

    override fun setHorizontalEntryBlock(block: BlockHorizontal) {
        _horizontalEntryBlock = block
    }

    override fun setHorizontalEgressBlock(block: BlockHorizontal) {
        _horizontalEgressBlock = block;
    }

    override fun setVerticalEgressBlock(block: BlockVertical) {
        _verticalEgressBlock = block
    }

    override fun setVerticalEntryBlock(block: BlockVertical) {
        _verticalEntryBlock = block
    }
}