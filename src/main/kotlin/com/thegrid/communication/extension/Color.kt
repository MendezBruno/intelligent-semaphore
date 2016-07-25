package com.thegrid.communication.extension


/**
 * Created by Surakituaka on 21/07/2016.
 */


data class RGB(val r: Int, val g: Int, val b: Int){

    override fun toString(): String{
        return r.toString()+"-"+g.toString()+"-"+b.toString()
    }

//    companion object{
//
//        fun create(id: String): RGB{
//            val ids = id.split('-') as Array<Int>
//            return RGB(ids[0],ids[1],ids[2])
//        }
//
//    }

}