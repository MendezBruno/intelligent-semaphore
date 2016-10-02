package com.thegrid.behavior.model

import com.thegrid.behavior.extensions.Direction
import com.thegrid.behavior.extensions.Probabilities
import com.thegrid.behavior.platform.IDispatcheable
import com.thegrid.behavior.state.BlockState
import com.thegrid.behavior.state.CaudalNormalState
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
    abstract var horizontalEgressBlock: IDispatcheable
    abstract var verticalEgressBlock: IDispatcheable

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

    open fun getOnlineTimeH(start:Double, end:Double): Double {
        return start - end
    }

    open fun getOnlineTimeV(start:Double, end:Double): Double {
        return start - end
    }

    open fun getBlockState(direccion: Direction): BlockState {
        return CaudalNormalState()
    }
}
