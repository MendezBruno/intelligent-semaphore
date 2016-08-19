package com.thegrid.communication.model

/**
 * Created by Surakituaka on 05/08/2016.
 */

class CornerNode(id: String) : NodeType(id) {

    private var _horizontalEntryBlock: Block? = null
    private var _verticalEntryBlock: Block? = null
    private var _horizontalEgressBlock: Block? = null
    private var _verticalEgressBlock: Block? = null


    override fun addEgressBlock(block: Block) {
        if (block.hasVerticalDirection()) _verticalEgressBlock = block
        else _horizontalEgressBlock = block
    }

    override fun addEntryBlock(block: Block) {
        if (block.hasVerticalDirection()) _verticalEntryBlock = block
        else _horizontalEntryBlock = block
    }

}