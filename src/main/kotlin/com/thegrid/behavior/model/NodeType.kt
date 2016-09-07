package com.thegrid.behavior.model

import com.thegrid.behavior.extensions.Probabilities
import rx.Observable

/**
 * Created by Surakituaka on 05/08/2016.
 */

abstract class NodeType(val id: String){

    abstract val crossingHorizontalOutgoingCars: Observable<Block>
    abstract val turningHorizontalOutgoingCars: Observable<Block>
    abstract val crossingVerticalOutgoingCars: Observable<Block>
    abstract val turningVerticalOutgoingCars: Observable<Block>
    abstract var horizontalEntryBlock: BlockHorizontal
    abstract var verticalEntryBlock: BlockVertical

    override operator fun equals(other: Any?) =
            when(other) {
                is NodeType -> this.id == other.id
                else -> throw Exception("Not the same type")
            }

    override fun hashCode(): Int {
        return id.hashCode()
    }

    open fun getProbabilities(): Probabilities {
        //TODO - Chequear que ambos valores esten seteados a la hora de usarlos
        val vPopularity = verticalEntryBlock.street.popularity
        val hPopularity = horizontalEntryBlock.street.popularity
        val vProbability = (vPopularity / (vPopularity + hPopularity)).toDouble()
        return Probabilities(vProbability, 1 - vProbability)
    }

}
