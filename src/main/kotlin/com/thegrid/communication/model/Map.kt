package com.thegrid.communication.model

/**
 * Created by Surakituaka on 01/08/2016.
 */

data class Map(val name: String, val nodes: MutableList<Node>, val blocks: MutableList<Block>,
               val streets: MutableList<Street>) {

    fun addNode(node: Node) = nodes.add(node)

    fun addBlock(block: Block) = blocks.add(block)










}
