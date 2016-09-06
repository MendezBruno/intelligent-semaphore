package com.thegrid.behavior.model

import rx.Observable

/**Idea básica de una cuadra
 */
abstract class BlockBase {
    abstract var sendingCars: Observable<Block>
    var outgoingCrossingByCarsAmount = 0
    var outgoingTurningCarsAmount = 0
    abstract fun setAsEntryBlock(node: NodeType)
    abstract fun startObservation()
}