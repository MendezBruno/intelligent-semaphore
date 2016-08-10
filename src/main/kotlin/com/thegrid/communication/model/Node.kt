package com.thegrid.communication.model

/**
 * Created by Surakituaka on 05/08/2016.
 */

interface Node{
    val id: String

    fun addEntryBlock(block: Block)
    fun addEgressBlock(block: Block)
}