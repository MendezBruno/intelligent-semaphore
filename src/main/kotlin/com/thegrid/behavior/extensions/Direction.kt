package com.thegrid.behavior.extensions

/**
 * Created by CristianErik on 16/09/2016.
 */

enum class Direction {
    Vertical, Horizontal;

    var text: String = ""

    companion object {
        fun vertical(): Direction {
            val direction = Direction.Vertical
            direction.text = "VERTICAL"
            return direction
        }

        fun horizontal(): Direction {
            val direction = Direction.Horizontal
            direction.text = "HORIZONTAL"
            return direction
        }
    }

    fun createOposite(): Direction {
        when(this) {
            Direction.Vertical -> return Direction.horizontal()
            Direction.Horizontal -> return Direction.vertical()
        }
    }

}