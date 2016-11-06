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
    var tiempoResultadoRna = mutableListOf<TiempoResultadoRna>()
    var tiempoPoblacion = mutableListOf<TiempoPoblacion>()
    var tiempoQueMuta = mutableListOf<TiempoQueMuta>()

    var cant_Cuadras = 0;
    var tiempo_simulado =0;
    val cota_max = 6600
    var datosRna: DatosRna = DatosRna(0.0,0.0,0.0,0,0.0)

    class TiempoCongestion(var t:Double,var c:Double)
    class TiempoCongestionXcuadra (var cuadraId: String, var tiempoCongestionCuadra: TiempoCongestion )
    class TiempoCromosomaAptitud (var t: Double, var cromosoma: Cromosoma,var aptitud: Int)
    class TiempoVelocidad (var t:Double, var vel:Double)
    class TiempoVelocidadXcuadra (var cuadraId: String, var tiempoVelocidadCuadra: TiempoVelocidad )
    class TiempoAptidud(var time: Double,var aptitud: Double)
    class TiempoResultadoRna (var time: Double,var cambio: Boolean, var aptitud: Double ,var tiempoSemafors: DoubleArray )
    class TiempoPoblacion (var time: Double, var poblacion: MutableList<Cromosoma>)
    class TiempoQueMuta (var time: Double,var itero :String )
    class DatosRna (var getMaxError: Double,var getLearninRate: Double, var getMinErrorChange: Double, var getCurrentIteracion: Int, var getErrorFunction: Double  )




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
        val tya = TiempoAptidud(time,aptitud)
        tiempoAptitud.add(tya)
    }


    fun guardarTiempoRna(time: Double, hayCambio: Boolean, aptitud: Double, tiempos: DoubleArray) {
        val tRna = TiempoResultadoRna(time,hayCambio,aptitud,tiempos)
        tiempoResultadoRna.add(tRna)
    }

    fun guardarPoblacionPorIteracion(time: Double, poblacion: MutableList<Cromosoma>) {
        val tyPoblacion = TiempoPoblacion(time, poblacion)
        tiempoPoblacion.add(tyPoblacion)
    }

    fun agregarTiempoMutar(time: Double, muto: String) {
        val tyMutar = TiempoQueMuta(time, muto)
        tiempoQueMuta.add(tyMutar)
    }

    fun guardarDatosRna (getMaxError: Double, getLearninRate: Double, getMinErrorChange: Double, getCurrentIteracion: Int, getErrorFunction: Double){
        datosRna.getMaxError = getMaxError
        datosRna.getLearninRate = getLearninRate
        datosRna.getMinErrorChange = getMinErrorChange
        datosRna.getCurrentIteracion = getCurrentIteracion
        datosRna.getErrorFunction = getErrorFunction
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

        sobrante = tiempoCongestionXcuadra.size - cota_max
        frec = Math.round(tiempoCongestionXcuadra.size / sobrante.toDouble())
        for (i in 0..tiempoCongestionXcuadra.size-1) {
            if (sobrante < 0 || i % frec != 0.toLong()) r.tiempoCongestionXcuadra.add(tiempoCongestionXcuadra[i])
//            if (i % frec != 0.toLong()) r.tiempoCongestionXcuadra.add(tiempoCongestionXcuadra[i])
        }

        sobrante = tiempoCromosomaAptitud.size - cota_max
        frec = Math.round(tiempoCromosomaAptitud.size / sobrante.toDouble())
        for (i in 0..tiempoCromosomaAptitud.size-1) {
            if (sobrante < 0 || i % frec != 0.toLong()) r.tiempoCromosomaAptitud.add(tiempoCromosomaAptitud[i])
        }

        sobrante = tiempoVelocidad.size - cota_max
        frec = Math.round(tiempoVelocidad.size / sobrante.toDouble())
        for (i in 0..tiempoVelocidad.size-1) {
            if (sobrante < 0 || i % frec != 0.toLong()) r.tiempoVelocidad.add(tiempoVelocidad[i])
        }

        sobrante = tiempoVelocidadXCuadra.size - cota_max
        frec = Math.round(tiempoVelocidadXCuadra.size / sobrante.toDouble())
        for (i in 0..tiempoVelocidadXCuadra.size-1) {
            if (sobrante < 0 || i % frec != 0.toLong()) r.tiempoVelocidadXCuadra.add(tiempoVelocidadXCuadra[i])
//            if (i % frec != 0.toLong()) r.tiempoVelocidadXCuadra.add(tiempoVelocidadXCuadra[i])
        }

        sobrante = tiempoAptitud.size - cota_max
        frec = Math.round(tiempoAptitud.size / sobrante.toDouble())
        for (i in 0..tiempoAptitud.size-1) {
            if (sobrante < 0 || i % frec != 0.toLong()) r.tiempoAptitud.add(tiempoAptitud[i])
        }

        sobrante = tiempoResultadoRna.size - cota_max
        frec = Math.round(tiempoResultadoRna.size / sobrante.toDouble())
        for (i in 0..tiempoResultadoRna.size-1) {
            if (sobrante < 0 || i % frec != 0.toLong()) r.tiempoResultadoRna.add(tiempoResultadoRna[i])
        }

        if(tiempoPoblacion.size < cota_max) r.tiempoPoblacion = tiempoPoblacion
                else r.tiempoPoblacion = tiempoPoblacion.subList (tiempoPoblacion.size - cota_max,tiempoPoblacion.size)

        if(tiempoQueMuta.size < cota_max) r.tiempoQueMuta = tiempoQueMuta
                else r.tiempoQueMuta = tiempoQueMuta.subList (tiempoQueMuta.size - cota_max,tiempoQueMuta.size)

        r.cant_Cuadras = cant_Cuadras
        r.tiempo_simulado = tiempo_simulado
        r.datosRna = datosRna
        return r
    }




}