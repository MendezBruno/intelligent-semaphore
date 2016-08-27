package com.thegrid.behavior.model

import com.thegrid.communication.model.dataMap

data class Map(val name: String,
               val nodes: MutableList<NodeType>,
               val streets: MutableList<Street>,
               val semaphoreNodes: MutableList<SemaphoreNode>) {
    val blocks = streets.map { street -> street.blocks }.flatten().toMutableList()
}
