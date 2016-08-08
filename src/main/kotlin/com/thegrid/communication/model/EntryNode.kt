package com.thegrid.communication.model

import com.thegrid.communication.extension.FDP

/**
 * Created by Surakituaka on 05/08/2016.
 */

class EntryNode(override val id: String, var FDPCarInput : FDP) : Node{
    var egressBlock: Block? = null

    override fun addEgressBlock(block: Block) {
        egressBlock = block
    }

    override fun addEntryBlock(block: Block) {
        throw UnsupportedOperationException("EntryNode doesn't have an EntryBlock")
    }

}