package com.thegrid.behavior.model

data class Street(
        /*val maxSpeed: Double, */
        val lanes: Int,
        val orientation: Orientation,
        val blocks: MutableList<Block>,
        val popularity: Int){

    fun addBlock(block: Block){
        blocks.add(block)
    }
}