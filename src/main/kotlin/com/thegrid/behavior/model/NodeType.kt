package com.thegrid.behavior.model

import rx.Observable
import kotlin.properties.Delegates

/**
 * Created by Surakituaka on 05/08/2016.
 */

abstract class NodeType(val id: String){


    abstract val crossingHorizontalOutgoingCars: Observable<BlockBase>
    abstract val turningHorizontalOutgoingCars: Observable<BlockBase>
    abstract val crossingVerticalOutgoingCars: Observable<BlockBase>
    abstract val turningVerticalOutgoingCars: Observable<BlockBase>
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
