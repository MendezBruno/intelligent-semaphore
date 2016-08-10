package com.thegrid.communication.model

/**
 * Created by Surakituaka on 05/08/2016.
 */

class EgressNode(override val id: String/*, var FDPCarOutput: FDP*/) : Node{
    var entryBlock: Block? = null

    override fun addEgressBlock(block: Block) {
        throw UnsupportedOperationException("EgressNode doesn't have EgressBlock")
    }

    override fun addEntryBlock(block: Block) {
        entryBlock = block
    }

}