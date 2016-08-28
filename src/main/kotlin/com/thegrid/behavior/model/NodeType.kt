package com.thegrid.behavior.model

/**
 * Created by Surakituaka on 05/08/2016.
 */

abstract class NodeType(val id: String){

    override operator fun equals(other: Any?) =
            when(other) {
                is NodeType -> this.id == other.id
                else -> throw Exception("Not the same type")
            }

    override fun hashCode(): Int {
        return id.hashCode();
    }

    abstract fun setHorizontalEntryBlock(block: BlockHorizontal)
    abstract fun setHorizontalEgressBlock(block: BlockHorizontal)
    abstract fun setVerticalEgressBlock(block: BlockVertical)
    abstract fun setVerticalEntryBlock(block: BlockVertical)
}
