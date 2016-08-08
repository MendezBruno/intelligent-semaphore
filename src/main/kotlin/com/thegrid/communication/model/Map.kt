package com.thegrid.communication.model

import com.beust.klaxon.*
import com.thegrid.communication.extension.FDP
import com.thegrid.communication.service.MapParser

/**
 * Created by Surakituaka on 01/08/2016.
 */

data class Map(val name: String, val nodes: MutableList<Node>, val streets: MutableList<Street>) {

    val blocks: MutableList<Block> = mutableListOf(streets.flatMap{ street -> street.blocks }).flatten().toMutableList() //TODO no se si es necesario

    fun addNode(node: Node) = nodes.add(node)

    fun addBlock(block: Block) = blocks.add(block)

    companion object {

        fun createMapFromJSON(json: String) : Map {
            val klaxonMap = MapParser.CreateKlaxonMap(json) as JsonObject

            val mapName = klaxonMap.string("nombre")!!

            val entryNodes = klaxonMap.array<JsonObject>("nodosEntrada") as JsonArray<JsonObject>
            val egressNodes = klaxonMap.array<JsonObject>("nodosSalida") as JsonArray<JsonObject>
            val semaphoreNodes = klaxonMap.array<JsonObject>("nodosSemaforo") as JsonArray<JsonObject>
            val cornerNodes = klaxonMap.array<JsonObject>("nodosNoSemaforo") as JsonArray<JsonObject>

            val nodes = mutableListOf<Node>()

            for(kNode in entryNodes){
                nodes.add(EntryNode(kNode.string("id")!!, FDP(kNode.int("cantMaxima")!!, kNode.int("intervalo")!!)))
            }

            for(node in egressNodes){
                nodes.add(EgressNode(node.string("id")!!, FDP(node.int("cantMaxima")!!, node.int("intervalo")!!)))
            }

            for(node in semaphoreNodes){
                nodes.add(SemaphoreNode(node.string("id")!!,node.int("tiempoVertical")!!, node.int("tiempoHorizontal")!!))
            }

            for(node in cornerNodes){
                nodes.add(CornerNode(node.string("id")!!))
            }

            val streets = mutableListOf<Street>()

            val vStreets = klaxonMap.array<JsonObject>("callesVerticales") as JsonArray<JsonObject>
            val hStreets = klaxonMap.array<JsonObject>("callesHorizontales") as JsonArray<JsonObject>

            for(kStreet in vStreets){
                val street = Street(kStreet.double("velocidadMax")!!, kStreet.int("cantCarriles")!!,
                        kStreet.string("sentido")!!, mutableListOf<Block>(), kStreet.int("preferencia")!!)

                val kBlocks = kStreet.array<JsonObject>("cuadras") as JsonArray<JsonObject>

                for(kBlock in kBlocks){
                    val block = Block(kBlock.string("id")!!,street,kBlock.double("longitud")!!,
                            nodes.filter { node -> node.id.equals(kBlock.string("nodoOrigen")!!) }.first(),
                            nodes.filter { node -> node.id.equals(kBlock.string("nodoDestino")!!) }.first())

                    block.street.addBlock(block)
                    block.entryNode.addEgressBlock(block)
                    block.egressNode.addEntryBlock(block)
                }
                streets.add(street)
            }

            for(kStreet in hStreets){
                val street = Street(kStreet.double("velocidadMax")!!, kStreet.int("cantCarriles")!!,
                        kStreet.string("sentido")!!, mutableListOf<Block>(), kStreet.int("preferencia")!!)

                val kBlocks = kStreet.array<JsonObject>("cuadras") as JsonArray<JsonObject>

                for(kBlock in kBlocks){
                    val block = Block(kBlock.string("id")!!,street,kBlock.double("longitud")!!,
                            nodes.filter { node -> node.id.equals(kBlock.string("nodoOrigen")!!) }.first(),
                            nodes.filter { node -> node.id.equals(kBlock.string("nodoDestino")!!) }.first())

                    block.street.addBlock(block)
                    block.entryNode.addEgressBlock(block)
                    block.egressNode.addEntryBlock(block)
                }
                streets.add(street)
            }

            return Map(mapName,nodes,streets)
        }
    }
}
