package com.thegrid.behavior.model

import com.thegrid.communication.model.dataEdgeNode
import com.thegrid.communication.model.dataMap

data class Map(var id: String,
               var name: String,
               val nodes: MutableList<NodeType>,
               val streets: MutableList<Street>,
               val semaphoreNodes: MutableList<SemaphoreNode>) {
    val blocks = streets.map { street -> street.blocks }.flatten().toMutableList()

    init {
        streets.forEach {
            it.blocks.forEach { it.startObservation() }
        }
    }

    fun setFdpValue(nodoBordeUpdate: dataEdgeNode) {
        val nodo = nodes.find {it.id == nodoBordeUpdate.id}
        if (nodo is EgressNode){nodo._interval = nodoBordeUpdate.intervalo
                                nodo._maxAmount = nodoBordeUpdate.cantMaxima}
        if (nodo is EntryNode){nodo._interval = nodoBordeUpdate.intervalo.toInt()
            nodo._maxAmount = nodoBordeUpdate.cantMaxima}
    }
}
