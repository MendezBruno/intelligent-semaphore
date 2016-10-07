package com.thegrid.behavior.model

enum class CongestionLevel(val ponderacion: Int) {
    SIN_CONGESTION(500), LEVE(100), MEDIANA(-100), PESADA(-200), INTRANSITABLE(-500);

    companion object {
        fun ofPercentage(percentage: Double) : CongestionLevel {
            return when(percentage) {
                0.0 -> SIN_CONGESTION
                in 0.0 .. 30.0 -> LEVE
                in 30.0 .. 50.0 -> MEDIANA
                in 0.5 .. 70.0 -> PESADA
                else -> INTRANSITABLE
            }
        }
    }
}