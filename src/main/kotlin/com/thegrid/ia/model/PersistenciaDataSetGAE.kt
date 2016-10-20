package com.thegrid.ia.model

import ar.org.neuroph.core.data.DataSet
import com.googlecode.objectify.Key
import com.googlecode.objectify.ObjectifyService
import com.thegrid.behavior.platform.Simulation

class PersistenciaDataSetGAE(val rna:Rna) : PersDataSet {

    var dataSetEntity = DataSetEntity()

    init {
        dataSetEntity.id = rna.map.id
    }

    override fun persistir() {
        rna.setDeEntrenamiento.rows.forEach {
            val fila = DataSetRowEntity()
            fila.entradas.addAll(it.input.toList())
            fila.salidas.addAll(it.desiredOutput.toList())
            dataSetEntity.add(fila)
        }
        ObjectifyService.ofy().save().entity(dataSetEntity).now()
    }

    override fun cargarRecuperar(): DataSet? {
        val dataSetEntity = Simulation.SharedInstance!!.ofy
                .load()
                .type(DataSetEntity::class.java)
                .id(rna.map.id)
                .now()
        val dataSet = DataSet(rna.datosEntrada, rna.datosDeSalida)
        if (dataSetEntity != null) {
            dataSetEntity.filas.forEach {
                dataSet.addRow(it.entradas.toDoubleArray(), it.salidas.toDoubleArray())
            }
        }
        return dataSet
    }

    override fun eliminar() {
        ObjectifyService.ofy().delete().entity(dataSetEntity).now()
    }
}