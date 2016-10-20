package com.thegrid.ia.model

import com.googlecode.objectify.Key
import com.googlecode.objectify.annotation.Entity
import com.googlecode.objectify.annotation.Id
import com.googlecode.objectify.ObjectifyService

@Entity
class DataSetEntity() {
    @Id var id = ""
    val filas : List<DataSetRowEntity>
        get() { return ObjectifyService.ofy()
                .load()
                .type(DataSetRowEntity::class.java)
                .filter("dataSet", this)
                .toList() }

    fun add(dataSetRowEntity: DataSetRowEntity) {
        ObjectifyService.ofy().save().entity(this).now()
        dataSetRowEntity.dataSet = Key.create(this)
        ObjectifyService.ofy().save().entity(dataSetRowEntity).now()
    }
}