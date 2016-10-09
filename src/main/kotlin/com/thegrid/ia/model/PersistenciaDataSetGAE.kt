package com.thegrid.ia.model

import ar.org.neuroph.core.data.DataSet

class PersistenciaDataSetGAE(val rna:Rna) : PersDataSet {
    override fun persistir() {
        //TBD
    }

    override fun cargarRecuperar(): DataSet? {
        //TBD
        return DataSet(rna.datosEntrada, rna.datosDeSalida)
    }

    override fun eliminar() {
        //TBD
    }
}