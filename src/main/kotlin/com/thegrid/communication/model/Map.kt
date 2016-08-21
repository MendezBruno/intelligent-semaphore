package com.thegrid.communication.model

import com.thegrid.behavior.model.Orientation
import com.thegrid.behavior.model.Street

data class Map(val name: String, val nodes: MutableList<NodeType>, val streets: MutableList<Street>) {

    val blocks = streets.map { street -> street.blocks }.flatten().toMutableList()

    companion object {

        fun createMapFromMapaFrontend(map: dataMap): Map {

            val nodes = mutableListOf<NodeType>()

            for (node in map.nodosEntrada) {
                nodes.add(EntryNode(node.id, node.intervalo, node.cantMaxima));
            }

            for (node in map.nodosSalida) {
                nodes.add(EgressNode(node.id, node.intervalo, node.cantMaxima))
            }

            for (node in map.nodosSemaforo) {
                nodes.add(SemaphoreNode(node.id, node.tiempoHorizontal, node.tiempoVertical))
            }

            for (node in map.nodosNoSemaforo) {
                nodes.add(CornerNode(node.id))
            }

            val streets = mutableListOf<Street>()

            for (kStreet in map.callesHorizontales.plus(map.callesVerticales)) {
                val street = Street(kStreet.cantCarriles,
                        Orientation.from(kStreet.sentido),
                        mutableListOf<Block>(),
                        kStreet.preferencia)

                for (kBlock in kStreet.cuadras) {
                    val block = Block(kBlock.id, street, kBlock.longitud,
                            nodes.filter { node -> node.id.equals(kBlock.nodoOrigen) }.first(),
                            nodes.filter { node -> node.id.equals(kBlock.nodoDestino) }.first())

                    block.street.addBlock(block)
                    block.entryNode.addEgressBlock(block)
                    block.egressNode.addEntryBlock(block)
                }
                streets.add(street)
            }

            return Map(map.nombre, nodes, streets)
        }
    }
}
