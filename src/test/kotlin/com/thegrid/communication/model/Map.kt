package com.thegrid.communication.model

import org.jetbrains.spek.api.Spek

/**
 * Created by Surakituaka on 05/08/2016.
 */

class TestMap: Spek({
    given("a json map") {

        val jsonMap: String ="{nombre:\"San telmo\"," +
                "nodosEntrada:[" +
                "{" +
                "id:\"nodo-1\",cantMaxima:1,intervalo:5" +
                "}," +
                "{" +
                "id:\"nodo-2\"," +
                "cantMaxima:1," +
                "intervalo:5" +
                "}," +
                "{" +
                "id:\"nodo-3\"," +
                "cantMaxima:1," +
                "intervalo:5" +
                "}," +
                "{" +
                "id:\"nodo-4\"," +
                "cantMaxima:1," +
                "intervalo:5" +
                "}" +
                "]," +
                "nodosSalida:[" +
                "{" +
                "id:\"nodo-5\"," +
                "cantMaxima:1," +
                "intervalo:5" +
                "}," +
                "{" +
                "id:\"nodo-6\"," +
                "cantMaxima:1," +
                "intervalo:5" +
                "}," +
                "{" +
                "id:\"nodo-7\"," +
                "cantMaxima:1," +
                "intervalo:5" +
                "}," +
                "{" +
                "id:\"nodo-8\"," +
                "cantMaxima:1," +
                "intervalo:5" +
                "}" +
                "]," +
                "nodosSemaforo: [" +
                "{" +
                "id:\"nodo-9\"," +
                "tiempoVertical: 120," +
                "tiempoHorizontal: 120" +
                "}" +
                "]," +
                "nodosNoSemaforo:[" +
                "{" +
                "id:\"nodo-10\"" +
                "}," +
                "{" +
                "id:\"nodo-11\"" +
                "}," +
                "{" +
                "id:\"nodo-12\"" +
                "}" +
                "]," +
                "callesVerticales:[" +
                "{" +
                "cantCarriles:2," +
                "sentido:\"Norte-Sur\"," +
                "preferencia:2," +
                "cuadras:[" +
                "{" +
                "id:\"cuadra-1\"," +
                "longitud: 100," +
                "nodoOrigen:\"nodo-1\"," +
                "nodoDestino:\"nodo-9\"" +
                "}," +
                "{" +
                "id:\"cuadra-2\"," +
                "longitud:100," +
                "nodoOrigen:\"nodo-9\"," +
                "nodoDestino:\"nodo-10\"" +
                "}," +
                "{" +
                "id:\"cuadra-3\"," +
                "preferencia:1," +
                "longitud:100," +
                "nodoOrigen:\"nodo-10\"," +
                "nodoDestino:\"nodo-5\"" +
                "}" +
                "]" +
                "}," +
                "{" +
                "cantCarriles:2," +
                "sentido:\"Norte-Sur\"," +
                "preferencia:2," +
                "cuadras: [" +
                "{" +
                "id:\"cuadra-4\"," +
                "longitud:100," +
                "nodoOrigen:\"nodo-2\"," +
                "nodoDestino:\"nodo-11\"" +
                "}," +
                "{" +
                "id:\"cuadra-5\"," +
                "longitud:100," +
                "nodoOrigen:\"nodo-11\"," +
                "nodoDestino:\"nodo-12\"" +
                "}," +
                "{" +
                "id:\"cuadra-6\"," +
                "longitud: 100," +
                "nodoOrigen:\"nodo-12\"," +
                "nodoDestino:\"nodo-6\"" +
                "}" +
                "]" +
                "}" +
                "]," +
                "callesHorizontales:[" +
                "{" +
                "cantCarriles:2," +
                "sentido:\"Oeste-Este\"," +
                "preferencia:2," +
                "cuadras:[" +
                "{" +
                "id:\"cuadra-7\"," +
                "longitud:100," +
                "nodoOrigen:\"nodo-4\"," +
                "nodoDestino:\"nodo-9\"" +
                "," +
                "{" +
                "id:\"cuadra-8\"," +
                "longitud:100," +
                "nodoOrigen:\"nodo-9\"," +
                "nodoDestino:\"nodo-11\"" +
                "}," +
                "{" +
                "id:\"cuadra-9\"," +
                "longitud:100," +
                "nodoOrigen:\"nodo-11\"," +
                "nodoDestino:\"nodo-7\"" +
                "}" +
                "]" +
                "}," +
                "{" +
                "cantCarriles:2," +
                "sentido:\"Oeste-Este\"," +
                "preferencia:2," +
                "cuadras:[" +
                "{" +
                "id:\"cuadra-10\"," +
                "longitud:100," +
                "nodoOrigen:\"nodo-4\"," +
                "nodoDestino:\"nodo-10\"" +
                "}," +
                "{" +
                "id:\"cuadra-11\"," +
                "longitud:100," +
                "nodoOrigen:\"nodo-10\"," +
                "nodoDestino:\"nodo-12\"" +
                "}," +
                "{" +
                "id:\"cuadra-12\"," +
                "longitud:100," +
                "nodoOrigen:\"nodo-12\"," +
                "nodoDestino:\"nodo-8\"" +
                "}" +
                "]" +
                "}" +
                "]" +
                "}"

        on("creating a map object") {


            it("should return the the map with its name, streets, blocks and nodes") {
                assert(true)
            }
        }
    }
})