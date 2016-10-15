package com.thegrid.communication.model

import com.thegrid.ia.model.Cromosoma


/**
 * Created by bruno on 08/10/16.
 */
class Resultado {

    var tiempoCongestion = mutableListOf<TiempoCongestion>()
    var tiempoCongestionXcuadra = mutableListOf<TiempoCongestionXcuadra>()
    var tiempoCromosomaAptitud = mutableListOf<TiempoCromosomaAptitud>()
//    var resultadoDeAg = ResultadoAg


    class TiempoCongestion(var t:Double,var c:Double)
    class TiempoCongestionXcuadra (var cuadraId: String, var tiempoCongestionCuadra: TiempoCongestion )
    class TiempoCromosomaAptitud (var t: Double, var cromosoma: Cromosoma, aptitud: Int)
//    class ResultadoAg (var   )


    fun guardarTiempoCongestion(t:Double,c:Double){
        val tyc = TiempoCongestion(t,c)
        tiempoCongestion.add(tyc)

    }

    fun guardarTiempoCongestionXCuadra(cuadraId: String,t:Double,c:Double){
        val tyc = TiempoCongestion(t,c)
        val tycXc = TiempoCongestionXcuadra(cuadraId,tyc)
        tiempoCongestionXcuadra.add(tycXc)

    }

    fun guardarTiempoCromosomaAptitud(t: Double, cromosoma: Cromosoma, aptitud: Int){
        val tca = TiempoCromosomaAptitud(t,cromosoma,aptitud)
        tiempoCromosomaAptitud.add(tca)
    }

    fun  guardarTiempoVelocidad(time: Double, sensarVelocidadMapa: Double) {
    }

}
