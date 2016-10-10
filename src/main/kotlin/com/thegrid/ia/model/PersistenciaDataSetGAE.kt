package com.thegrid.ia.model

import ar.org.neuroph.core.data.DataSet
import com.googlecode.objectify.ObjectifyService
import com.thegrid.behavior.platform.Simulation

class PersistenciaDataSetGAE(val rna:Rna) : PersDataSet {

    var dataSetEntity = DataSetEntity()

    init {
        dataSetEntity.id = rna.map.name
    }

    override fun persistir() {
        dataSetEntity.filas.clear()
        dataSetEntity.filas.addAll(
            rna.setDeEntrenamiento.rows.map {
                val fila = DataSetRowEntity()
                fila.entradas.addAll(it.input.toList())
                fila.salidas.addAll(it.desiredOutput.toList())
                fila
            }
        )
        Simulation.SharedInstance!!.ofy.save().entity(dataSetEntity).now()
    }

    override fun cargarRecuperar(): DataSet? {
        val dataSetEntity = Simulation.SharedInstance!!.ofy
                .load()
                .type(DataSetEntity::class.java)
                .id(rna.map.name)
                .now()
        val dataSet = DataSet(rna.datosEntrada, rna.datosDeSalida)
        if (dataSetEntity != null) {
            dataSetEntity.filas.forEach {
                dataSet.addRow(it.entradas.toDoubleArray(), it.salidas.toDoubleArray())
            }
            this.dataSetEntity.filas = dataSetEntity.filas
        }
        return dataSet
    }

    override fun eliminar() {
        Simulation.SharedInstance!!.ofy.delete().entity(dataSetEntity).now()
    }
}