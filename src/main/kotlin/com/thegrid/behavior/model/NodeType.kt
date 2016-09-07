package com.thegrid.behavior.model

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
        return id.hashCode();
    }
}
