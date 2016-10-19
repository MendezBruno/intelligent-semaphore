package com.thegrid.communication.model

import com.google.appengine.repackaged.org.codehaus.jackson.map.ObjectMapper
import com.thegrid.communication.controller.ResultadoController
import org.jetbrains.spek.api.Spek

class ResultadoTest : Spek({
    given("Un resultado grande") {
        on("Compactar el resultado") {
            it("no debe desbordar") {
                val r = ResultadoController().getResultadoEstresante(Integer(10))
                println(r)
                ObjectMapper().writeValueAsString(r)
                ObjectMapper().writeValueAsString(r.getResultadoCompactado())
            }
        }
    }
})