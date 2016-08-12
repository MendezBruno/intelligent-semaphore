package com.thegrid.behavior.model

import com.thegrid.communication.model.Block

/**
 * Created by Surakituaka on 01/08/2016.
 */

enum class Orientation(val way: String) {

    North("Sur-Norte"),
    South("Norte-Sur"),
    East("Oeste-Este"),
    West("Este-Oeste");

    companion object {
        fun from(findWay: String): Orientation = Orientation.values().first { it.way == findWay }
    }

}

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