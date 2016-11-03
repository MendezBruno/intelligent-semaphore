package com.thegrid.communication.model

import com.google.appengine.repackaged.org.codehaus.jackson.annotate.JsonIgnore
import com.google.appengine.repackaged.org.codehaus.jackson.annotate.JsonIgnoreProperties
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
    var tiempoAptitud = mutableListOf<TiempoAptidud>()
    var cant_Cuadras = 0;
    val cota_max = 6600
//    var resultadoDeAg = ResultadoAg


    class TiempoCongestion(var t:Double,var c:Double)
    class TiempoCongestionXcuadra (var cuadraId: String, var tiempoCongestionCuadra: TiempoCongestion )
    class TiempoCromosomaAptitud (var t: Double, var cromosoma: Cromosoma,var aptitud: Int)
    class TiempoVelocidad (var t:Double, var vel:Double)
    class TiempoVelocidadXcuadra (var cuadraId: String, var tiempoVelocidadCuadra: TiempoVelocidad )
    class TiempoAptidud(time: Double, aptitud: Double)
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

    fun guardarTiempoAptitud(time: Double, aptitud: Double) {

    }

    @JsonIgnore
    fun getResultadoCompactado(): Resultado {
        val r = Resultado()
        var sobrante : Int
        var frec : Long

        sobrante = tiempoCongestion.size - cota_max
        frec = Math.round(tiempoCongestion.size / sobrante.toDouble())
        for (i in 0..tiempoCongestion.size-1) {
            if (sobrante < 0 || i % frec != 0.toLong()) r.tiempoCongestion.add(tiempoCongestion[i])
        }

//        sobrante = tiempoCongestionXcuadra.size - cota_max
        frec = Math.round(tiempoCongestionXcuadra.size / cota_max.toDouble())
        for (i in 0..tiempoCongestionXcuadra.size-1) {
//            if (sobrante < 0 || i % frec != 0.toLong()) r.tiempoCongestionXcuadra.add(tiempoCongestionXcuadra[i])
            if (i % frec != 0.toLong()) r.tiempoCongestionXcuadra.add(tiempoCongestionXcuadra[i])
        }

        sobrante = tiempoVelocidad.size - cota_max
        frec = Math.round(tiempoVelocidad.size / sobrante.toDouble())
        for (i in 0..tiempoVelocidad.size-1) {
            if (sobrante < 0 || i % frec != 0.toLong()) r.tiempoVelocidad.add(tiempoVelocidad[i])
        }

//        sobrante = tiempoVelocidadXCuadra.size - cota_max
        frec = Math.round(tiempoVelocidadXCuadra.size / cota_max.toDouble())
        for (i in 0..tiempoVelocidadXCuadra.size-1) {
//            if (sobrante < 0 || i % frec != 0.toLong()) r.tiempoVelocidadXCuadra.add(tiempoVelocidadXCuadra[i])
            if (i % frec != 0.toLong()) r.tiempoVelocidadXCuadra.add(tiempoVelocidadXCuadra[i])
        }

        sobrante = tiempoCromosomaAptitud.size - cota_max
        frec = Math.round(tiempoCromosomaAptitud.size / sobrante.toDouble())
        for (i in 0..tiempoCromosomaAptitud.size-1) {
            if (sobrante < 0 || i % frec != 0.toLong()) r.tiempoCromosomaAptitud.add(tiempoCromosomaAptitud[i])
        }
        r.cant_Cuadras = cant_Cuadras
        return r
    }


}