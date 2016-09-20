package com.thegrid.behavior.model

enum class CongestionLevel {
    SIN_CONGESTION, LEVE, MEDIANA, PESADA, INTRANSITABLE;

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