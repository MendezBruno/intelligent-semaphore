package com.thegrid.behavior.model

enum class Orientation(val way: String) {

    North("Sur-Norte"),
    South("Norte-Sur"),
    East("Oeste-Este"),
    West("Este-Oeste");

    companion object {
        fun from(findWay: String): Orientation = values().first { it.way == findWay }
    }

    fun itsRight(): Boolean {
        return this == South || this == East
    }

    fun itsOppositte(): Boolean {
        return this == North || this == West
    }
}