package com.thegrid.communication.model

/**
 * Created by Surakituaka on 05/08/2016.
 */

class SemaphoreNode(override val id: String/*, var vGreen: Int, var hGreen: Int*/) : Node {
    var hEntryBlock: Block? = null
    var vEntryBlock: Block? = null
    var hEgressBlock: Block? = null
    var vEgressBlock: Block? = null

    override fun addEgressBlock(block: Block) {
        if (block.vBlock())
            vEgressBlock = block
        else
            hEgressBlock = block
    }

    override fun addEntryBlock(block: Block) {
        if (block.vBlock())
            vEntryBlock = block
        else
            hEntryBlock = block
    }


}