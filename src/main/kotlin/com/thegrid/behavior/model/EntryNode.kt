package com.thegrid.communication.model

/**
 * Created by Surakituaka on 05/08/2016.
 */

class EntryNode(id: String/*, var FDPCarInput : FDP*/) : NodeType(id) {

    private var _egressBlock: Block? = null

    override fun addEgressBlock(block: Block) {
        _egressBlock = block
    }

    override fun addEntryBlock(block: Block) {
        throw UnsupportedOperationException("EntryNode doesn't have an EntryBlock")
    }

}