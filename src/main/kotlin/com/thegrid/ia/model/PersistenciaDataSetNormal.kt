package com.thegrid.ia.model

import ar.org.neuroph.core.data.DataSet
import java.io.File

class PersistenciaDataSetNormal(val rna: Rna) : PersDataSet {
    val rutaRna = "rna"
    val rutaXml = "$rutaRna/${rna.map.name}.xml"
    val rutaTxt = "$rutaRna/${rna.map.name}.txt"

    init {
        val carpetaRna = File(rutaRna)

        if (carpetaRna.exists()) {
            if (!carpetaRna.isDirectory) carpetaRna.mkdir()
        } else {
            carpetaRna.mkdir()
        }
    }

    override fun persistir() {
        rna.setDeEntrenamiento.save(rutaXml)
        rna.setDeEntrenamiento.saveAsTxt(rutaTxt, ",  ,")
    }

    override fun persistirUnaRow(datosEntrada: DoubleArray, datosSalida: DoubleArray) {
        persistir()
    }

    override fun cargarRecuperar(): DataSet? {
        return DataSet.load(rutaXml)
    }

    override fun eliminar() {
        File(rutaXml).delete()
        File(rutaTxt).delete()
    }
}