package com.thegrid.communication.model

/**
 * Created by Surakituaka on 05/08/2016.
 */

class EgressNode(id: String/*, var FDPCarOutput: FDP*/) : NodeType(id) {

    private var _entryBlock: Block? = null

    override fun addEgressBlock(block: Block) {
        throw UnsupportedOperationException("EgressNode doesn't have EgressBlock")
    }

    override fun addEntryBlock(block: Block) {
        _entryBlock = block
    }

}