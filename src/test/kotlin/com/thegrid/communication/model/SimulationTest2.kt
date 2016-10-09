package com.thegrid.communication.model

import com.thegrid.behavior.platform.Simulation
import org.jetbrains.spek.api.Spek

class SimulationTest2 : Spek({
    given("Un mapa pequenio") {
        on("Comenzar una simulacion") {
            it("should algo") {
                val map = GeneradorMocks().getMapaUnoPorUno()
                Simulation(map, true, 100)
                while(true) {
                    Thread.sleep(4000)
                    Simulation.SharedInstance?.pausar()
                    Thread.sleep(1000)
                    Simulation.SharedInstance?.reanudar()
                }
//                Thread.sleep(Long.MAX_VALUE)
            }
        }
    }
})