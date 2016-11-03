package com.thegrid.ia.model

import ar.org.neuroph.core.data.DataSet

interface PersDataSet {
    fun persistir()

    fun persistirUnaRow(datosEntrada: DoubleArray, datosSalida: DoubleArray)

    fun cargarRecuperar() : DataSet?

    fun eliminar()
}

