package com.thegrid.ia.model

import com.googlecode.objectify.Ref
import com.googlecode.objectify.annotation.Entity
import com.googlecode.objectify.annotation.Id
import com.googlecode.objectify.annotation.Parent

@Entity
class DataSetRowEntity {
    @Id
    var id : Long? = null

    @Parent
    var owner: Ref<DataSetEntity>? = null

    var entradas : MutableList<Double> = mutableListOf()
    var salidas : MutableList<Double> = mutableListOf()
}