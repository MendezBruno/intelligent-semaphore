package com.thegrid.communication.model

/**
 * Created by Surakituaka on 05/08/2016.
 */

class SemaphoreNode(id: String/*, var vGreen: Int, var hGreen: Int*/) : NodeType(id) {

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