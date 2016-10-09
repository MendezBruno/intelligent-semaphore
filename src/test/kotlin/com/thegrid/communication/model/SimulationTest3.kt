package com.thegrid.communication.model

import com.thegrid.behavior.platform.Simulation
import com.thegrid.behavior.platform.TipoEjecucion
import org.jetbrains.spek.api.Spek
import java.io.File

class SimulationTest3 : Spek({
    given("Un mapa pequenio") {
        on("Comenzar una simulacion") {
            it("debe alternar entre los modos de ejecucion") {
                val map = GeneradorMocks().getMapaUnoPorUno()
                map.name = "SimulationTest3"
                File("rna/${map.name}.xml").delete()
                File("rna/${map.name}.txt").delete()
                println("Ahora voy a iniciar la simulacion")
                Thread.sleep(4000)
                val sim = Simulation(map, true, 100)
                Thread.sleep(8000)
                sim.pausar()
                sim.tipoEjecucion = TipoEjecucion.AG
                println("Ahora voy a entrenar y usar la AG")
                Thread.sleep(4000)
                sim.reanudar()
                Thread.sleep(10000)
                sim.pausar()
                sim.tipoEjecucion = TipoEjecucion.RNA
                println("Ahora voy a usar la RNA")
                Thread.sleep(4000)
                sim.reanudar()

                Thread.sleep(Long.MAX_VALUE)
            }
        }
    }
})