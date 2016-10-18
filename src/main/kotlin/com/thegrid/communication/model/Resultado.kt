package com.thegrid.communication.model

import com.thegrid.ia.model.Cromosoma


/**
 * Created by bruno on 08/10/16.
 */
class Resultado {

    var tiempoCongestion = mutableListOf<TiempoCongestion>()
    var tiempoCongestionXcuadra = mutableListOf<TiempoCongestionXcuadra>()
    var tiempoVelocidad = mutableListOf<TiempoVelocidad>()
    var tiempoVelocidadXCuadra = mutableListOf<TiempoVelocidadXcuadra>()
    var tiempoCromosomaAptitud = mutableListOf<TiempoCromosomaAptitud>()
//    var resultadoDeAg = ResultadoAg


    class TiempoCongestion(var t:Double,var c:Double)
    class TiempoCongestionXcuadra (var cuadraId: String, var tiempoCongestionCuadra: TiempoCongestion )
    class TiempoCromosomaAptitud (var t: Double, var cromosoma: Cromosoma,var aptitud: Int)
    class TiempoVelocidad (var t:Double, var vel:Double)
    class TiempoVelocidadXcuadra (var cuadraId: String, var tiempoVelocidadCuadra: TiempoVelocidad )
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

    fun  guardarTiempoVelocidad(time: Double, velocidad: Double) {
        val tyv = TiempoVelocidad(time,velocidad)
        tiempoVelocidad.add(tyv)
    }

    fun  guardarTiempoVelocidadXCuadra(id: String, time: Double, velocidad: Double) {
        val tyv = TiempoVelocidad(time,velocidad)
        val tyvXc = TiempoVelocidadXcuadra(id,tyv)
        tiempoVelocidadXCuadra.add(tyvXc)
    }

}


