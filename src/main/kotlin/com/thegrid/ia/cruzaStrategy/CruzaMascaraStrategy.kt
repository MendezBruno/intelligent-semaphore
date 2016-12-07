package com.thegrid.ia.cruzaStrategy

import com.thegrid.ia.model.Cromosoma

/**
 * Created by bruno on 29/11/2016.
 */
class CruzaMascaraStrategy: CruzaStrategy() {
    override fun cruzar (cromosomaPadre1: Cromosoma, cromosomaPadre2: Cromosoma) {
        val mitadGenes = cromosomaPadre1.genes.size / 2
        val otramitad = cromosomaPadre1.genes.size - mitadGenes
        var hijo1 = mutableListOf<Double>()
        var hijo2 = mutableListOf<Double>()
        val sizeGenes = cromosomaPadre1.genes.size


        cromosomaPadre1.genes.forEach{
            if(it.toInt().mod(2)==0) hijo1.add(it)
            else hijo2.add(it)
        }

        cromosomaPadre2.genes.forEach{
            if(it.toInt().mod(2)==0) hijo2.add(it)
            else hijo1.add(it)
        }

        emparejar(sizeGenes, hijo1)
        emparejar(sizeGenes, hijo2)



        cromosomaPadre1.genes = hijo2
        cromosomaPadre2.genes = hijo1
    }

    private fun emparejar(sizeGenes: Int, hijo: MutableList<Double>) {

        print("-------------------------------Entre a emparejar------------------")
        if (sizeGenes < hijo.size){
         val sacar = hijo.size - sizeGenes
            for(i in 0..sacar){
                hijo.removeAt(i)
            }
        }

        if (sizeGenes > hijo.size){
            val poner =  sizeGenes - hijo.size
            for(i in 0..poner){
                hijo.add(hijo[i])
            }
        }

        print("hijo size: "+ hijo.size)
        print("------------------------------sali de emparejar------------------")
    }
}