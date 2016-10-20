package com.thegrid.ia.model

import com.googlecode.objectify.Key
import com.googlecode.objectify.annotation.Entity
import com.googlecode.objectify.annotation.Id
import com.googlecode.objectify.annotation.Index

@Entity
class DataSetRowEntity {
    @Id var id: Long? = null
    @Index var dataSet: Key<DataSetEntity>? = null
    var entradas : MutableList<Double> = mutableListOf()
    var salidas : MutableList<Double> = mutableListOf()
}