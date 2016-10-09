package com.thegrid.ia.model

import ar.org.neuroph.core.data.DataSet

interface PersDataSet {
    fun persistir()

    fun cargarRecuperar() : DataSet?

    fun eliminar()
}

