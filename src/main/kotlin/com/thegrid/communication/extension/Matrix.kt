package com.thegrid.communication.extension

/**
 * Created by Surakituaka on 21/07/2016.
 */

data class MatrixId(val row: Int, val column: Int){

    override fun toString(): String{
        return row.toString()+"-"+column.toString()
    }

    companion object{

        fun create(id: String): MatrixId{
            val ids = id.split('-') as Array<Int>
            return MatrixId(ids[0],ids[1])
        }
    }
}
