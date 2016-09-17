package com.thegrid.communication.services

import com.thegrid.behavior.model.*
import com.thegrid.behavior.model.Map
import com.thegrid.communication.model.dataMap
import sun.rmi.runtime.Log

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
                val sem = SemaphoreNode(node.id, node.tiempoHorizontal, node.tiempoVertical)
                nodes.add(sem)
                semaphoreNodes.add(sem)
            }

            for (node in map.nodosNoSemaforo) {
                nodes.add(CornerNode(node.id))
            }

            val streets = mutableListOf<Street>()

            for (kStreet in map.callesHorizontales) {
                val orientation = Orientation.from(kStreet.sentido)
                val street = Street(kStreet.cantCarriles,
                        orientation,
                        mutableListOf<Block>(),
                        kStreet.preferencia)
                val right = orientation.itsRight()
                for (kBlock in kStreet.cuadras) {
                    val entryNode: NodeType
                    val egressNode: NodeType
                    if (right) {
                        entryNode = nodes.filter { node -> node.id.equals(kBlock.nodoOrigen) }.first()
                        egressNode = nodes.filter { node -> node.id.equals(kBlock.nodoDestino) }.first()
                    } else {
                        entryNode = nodes.filter { node -> node.id.equals(kBlock.nodoDestino) }.first()
                        egressNode = nodes.filter { node -> node.id.equals(kBlock.nodoOrigen) }.first()
                    }
                    val block = BlockHorizontal(kBlock.id, street, kBlock.longitud, entryNode)
                    egressNode.horizontalEntryBlock = block
//                    block.setProbabilities(egressNode.getProbabilities())
                }
                streets.add(street)
            }

            for (kStreet in map.callesVerticales) {
                val orientation = Orientation.from(kStreet.sentido)
                val street = Street(kStreet.cantCarriles,
                        orientation,
                        mutableListOf<Block>(),
                        kStreet.preferencia)

                val right = orientation.itsRight()
                for (kBlock in kStreet.cuadras) {
                    val entryNode: NodeType
                    val egressNode: NodeType
                    if (right) {
                        entryNode = nodes.filter { node -> node.id.equals(kBlock.nodoOrigen) }.first()
                        egressNode = nodes.filter { node -> node.id.equals(kBlock.nodoDestino) }.first()
                    } else {
                        entryNode = nodes.filter { node -> node.id.equals(kBlock.nodoDestino) }.first()
                        egressNode = nodes.filter { node -> node.id.equals(kBlock.nodoOrigen) }.first()
                    }
                    val block = BlockVertical(kBlock.id, street, kBlock.longitud, entryNode)
                    egressNode.verticalEntryBlock = block
                }
                streets.add(street)
            }

            for (node in nodes) {
                if (node is SemaphoreNode || node is CornerNode) {
                    node.verticalEntryBlock.setProbabilities(node.getProbabilities())
                    node.horizontalEntryBlock.setProbabilities(node.getProbabilities())
                }
            }

            return Map(map.nombre, nodes, streets, semaphoreNodes)
        }
    }
}