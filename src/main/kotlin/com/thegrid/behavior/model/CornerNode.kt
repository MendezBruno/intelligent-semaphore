package com.thegrid.behavior.model

import rx.lang.kotlin.observable
import kotlin.properties.Delegates

open class CornerNode : NodeType {

    override var horizontalEntryBlock: BlockHorizontal by Delegates.notNull()
    override var verticalEntryBlock: BlockVertical by Delegates.notNull()

    constructor(id: String) : super(id)

    /*
    ACLARACION: observable<BlockBase> porque las cuadras
        ficticias de los nodos de entrada NO son Block
        (no tienen los mismos atributos)
     */

    override val crossingHorizontalOutgoingCars = observable<Block> { subscriber ->
        horizontalEntryBlock.sendingCars.subscribe { subscriber.onNext(it) }
    }

    override val turningHorizontalOutgoingCars = observable<Block> { subscriber ->
        verticalEntryBlock.sendingCars.subscribe { subscriber.onNext(it) }
    }

    override val crossingVerticalOutgoingCars = observable<Block> { subscriber ->
        verticalEntryBlock.sendingCars.subscribe { subscriber.onNext(it) }
    }

    override val turningVerticalOutgoingCars = observable<Block> { subscriber ->
        horizontalEntryBlock.sendingCars.subscribe { subscriber.onNext(it) }
    }
}