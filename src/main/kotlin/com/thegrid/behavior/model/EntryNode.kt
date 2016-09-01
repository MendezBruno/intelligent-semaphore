package com.thegrid.behavior.model

import rx.Observable
import rx.lang.kotlin.observable
import kotlin.properties.Delegates

/**
 * Created by Surakituaka on 05/08/2016.
 */

//TODO EL NODO NO SE SUBSCRIBE MAS A LA CUADRA DE EGRESO SINO QUE TIENE QUE SER AL REVES

class EntryNode : NodeType {
    override var horizontalEntryBlock: BlockHorizontal
        set(value) = throw UnsupportedOperationException()
        get() = throw UnsupportedOperationException()
    override var verticalEntryBlock: BlockVertical
        set(value) = throw UnsupportedOperationException()
        get() = throw UnsupportedOperationException()
    private var _interval: Int
    private var _maxAmount: Int
    val infiniteCarsBlock : BlockBase
    val emitter = observable<BlockBase>{}
    constructor(id:String, interval:Int, maxAmount:Int) : super(id) {
        _maxAmount = maxAmount
        _interval = interval

        //ToDO dormirse cada cierto tiempo definido en la fdp
        //ToDO y al despertarse agregar a la infiniteCarsBlock la
        //ToDO cantidad especificada en la fdp

        //Calle ficticia
        infiniteCarsBlock = object: BlockBase() {
            override var sendingCars: Observable<Block>
                get() = throw UnsupportedOperationException()
                set(value) {
                }
        }
    }

    override val crossingHorizontalOutgoingCars: Observable<BlockBase>
        get() = emitter
    override val turningHorizontalOutgoingCars: Observable<BlockBase>
        get() = emitter
    override val crossingVerticalOutgoingCars: Observable<BlockBase>
        get() = emitter
    override val turningVerticalOutgoingCars: Observable<BlockBase>
        get() = emitter

}