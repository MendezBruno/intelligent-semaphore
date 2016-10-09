package com.thegrid.ia.model

import ar.org.neuroph.core.data.DataSet

class PersistenciaDataSetGAE(rna:Rna) : PersDataSet {
    override fun persistir() {
        throw UnsupportedOperationException()
    }

    override fun cargarRecuperar(): DataSet? {
        throw UnsupportedOperationException()
    }

    override fun eliminar() {
        throw UnsupportedOperationException()
    }
}