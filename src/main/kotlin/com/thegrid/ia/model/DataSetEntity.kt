package com.thegrid.ia.model

import com.googlecode.objectify.annotation.Entity
import com.googlecode.objectify.annotation.Id


@Entity
class DataSetEntity() {
    @Id
    var id = ""
    var filas = mutableListOf<DataSetRowEntity>()

}

