package com.thegrid.communication.model



/**
 * Created by bruno on 08/10/16.
 */
class Resultado {

    var tiempoCongestion = hashMapOf<Double, Double>()

    var tiempoCongestion2 = mutableListOf<TiempoCongestion>()

    class TiempoCongestion(var t:Double,var c:Double)


    fun guardarTiempoCongestion(t:Double,c:Double){
        val tyc = TiempoCongestion(t,c)
        tiempoCongestion2.add(tyc)
        tiempoCongestion.put(t,c)
    }

}
