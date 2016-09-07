package com.thegrid.behavior.model

import rx.Observable

/**Idea básica de una cuadra
 */
abstract class BlockBase {
    abstract var sendingCars: Observable<Block>
    var outgoingCrossingByCarsAmount = 0
    var outgoingTurningCarsAmount = 0

    companion object {
        // Longitud promedio de los vehiculos que entran en una cuadra.
        val LongVehicule = 5

        // Modificador que afecta la tendencia de los autos para doblar.
        // De estar en 1 solo afectara la popularidad de los cruces.
        val TurningModifier = 0.75
    }

    abstract fun setAsEntryBlock(node: NodeType)
    abstract fun startObservation()
}