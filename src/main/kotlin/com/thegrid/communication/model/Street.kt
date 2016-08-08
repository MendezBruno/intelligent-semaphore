package com.thegrid.communication.model

/**
 * Created by Surakituaka on 01/08/2016.
 */

data class Street(val maxSpeed: Double, val lanes: Int, val orientation: String, val blocks: MutableList<Block>,
                  val popularity: Int){

    fun addBlock(block: Block){
        blocks.add(block)
    }
}