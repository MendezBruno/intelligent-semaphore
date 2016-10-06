package com.thegrid.communication.model

import com.thegrid.ia.model.Ag
import com.thegrid.ia.model.Cromosoma
import org.jetbrains.spek.api.Spek

/**
 * Created by bruno on 06/10/16.
 */
class AgTests: Spek({

    given("Un AG") {
        val ag = Ag()
        on("El mismo ag") {

            it("Debe crear una poblacion global con n Cromosomas donde cada cromosoma tiene un size de cant semaforos por 2") {
                val cantSemaforos = 4
                val cantCromosomas = 5
                ag.generarPoblacionGlobal(cantSemaforos,cantCromosomas)
                assert(ag.poblacionGlobal.all{ it.genes.size == 8 });

            }
            it("Debe crear una poblacion incial con los cromosomas por defecto que son 6 actualmente "){
                ag.generarPoblacionInicial()
                assert(ag.poblacionInicial.size == 6 )
                ag.poblacionInicial.removeAll { true }
            }
            it("Debe crear una poblacion incial con una cantidad n de cromosomas definidas por parametro"){
                ag.generarPoblacionInicial(8)
                assert(ag.poblacionInicial.size == 8 )
            }
        }
        on("un Cromosoma"){
            it("Debe cruzar de manera simple 2 cromosomas"){
                var cromosoma: Cromosoma = Cromosoma()
                var cromosoma2: Cromosoma = Cromosoma()
                cromosoma.genes.add(1.0)
                cromosoma.genes.add(2.0)
                cromosoma2.genes.add(3.0)
                cromosoma2.genes.add(4.0)
                ag.cruzaStrategy.cruzar(cromosoma,cromosoma2)
                assert(cromosoma.genes.contains(4.0))
                assert(cromosoma.genes.contains(1.0))
                assert(cromosoma2.genes.contains(2.0))
                assert(cromosoma2.genes.contains(3.0))
                assert(cromosoma.genes.size == 2)
                assert(cromosoma2.genes.size == 2)

            }
        }
    }

})