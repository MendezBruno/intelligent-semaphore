package com.thegrid.communication.extension

/**
 * Created by Surakituaka on 21/07/2016.
 */

data class RGBA(var r: Int, var g: Int, var b: Int, var a: Int) {
    public fun set(r: Int, g: Int, b: Int, a: Int) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    public fun set(r: Int, g: Int, b: Int) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}