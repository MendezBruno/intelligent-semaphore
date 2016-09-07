package com.thegrid.communication.services

import com.thegrid.behavior.model.*
import com.thegrid.behavior.model.Map
import com.thegrid.communication.model.dataMap

class MapConversor {
    companion object {
        fun convert(map: dataMap): Map {
            val nodes = mutableListOf<NodeType>()
            val semaphoreNodes = mutableListOf<SemaphoreNode>()

            for (node in map.nodosEntrada) {
                nodes.add(EntryNode(node.id, node.intervalo, node.cantMaxima));
            }

            for (node in map.nodosSalida) {
                nodes.add(EgressNode(node.id, node.intervalo, node.cantMaxima))
            }

            for (node in map.nodosSemaforo) {
                val sem = SemaphoreNode(node.id, node.tiempoHorizontal, node.tiempoVertical, true)
                nodes.add(sem)
                semaphoreNodes.add(sem)
            }

            for (node in map.nodosNoSemaforo) {
                nodes.add(CornerNode(node.id))
            }

            val streets = mutableListOf<Street>()

            for (kStreet in map.callesHorizontales) {
                val street = Street(kStreet.cantCarriles,
                        Orientation.from(kStreet.sentido),
                        mutableListOf<Block>(),
                        kStreet.preferencia)

                for (kBlock in kStreet.cuadras) {
                    val egressNode = nodes.filter { node -> node.id.equals(kBlock.nodoDestino) }.first()
                    val block = BlockHorizontal(kBlock.id, street, kBlock.longitud,
                            nodes.filter { node -> node.id.equals(kBlock.nodoOrigen) }.first())
                    egressNode.horizontalEntryBlock = block
                    block.setProbabilities(egressNode.getProbabilities())
                }
                streets.add(street)
            }

            for (kStreet in map.callesVerticales) {
                val street = Street(kStreet.cantCarriles,
                        Orientation.from(kStreet.sentido),
                        mutableListOf<Block>(),
                        kStreet.preferencia)

                for (kBlock in kStreet.cuadras) {
                    val egressNode = nodes.filter { node -> node.id.equals(kBlock.nodoDestino) }.first()
                    val block = BlockVertical(kBlock.id, street, kBlock.longitud,
                            nodes.filter { node -> node.id.equals(kBlock.nodoOrigen) }.first())
                    egressNode.verticalEntryBlock = block
                    block.setProbabilities(egressNode.getProbabilities())
                }
                streets.add(street)
            }

            return Map(map.nombre, nodes, streets, semaphoreNodes)
        }
    }
}