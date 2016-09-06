package com.thegrid.behavior.services.model

import java.sql.Timestamp


/**
 * Created by CristianErik on 02/09/2016.
 */

data class PairDispatched<T>(val time: Double, val objectToDispatch: T): kotlin.Comparable<PairDispatched<T>> {
    override fun compareTo(other: PairDispatched<T>) = time.compareTo(other.time)
}