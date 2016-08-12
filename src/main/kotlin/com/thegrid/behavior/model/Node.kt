package com.thegrid.communication.model

/**
 * Created by Surakituaka on 05/08/2016.
 */

abstract class NodeType(val id: String){

    abstract fun addEntryBlock(block: Block)

    abstract fun addEgressBlock(block: Block)

    override operator fun equals(other: Any?) =
            when(other) {
                is NodeType -> this.id == other.id
                else -> throw Exception("Not the same type")
            }
}
