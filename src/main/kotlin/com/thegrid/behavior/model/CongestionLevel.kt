package com.thegrid.behavior.model

enum class CongestionLevel {
    SIN_CONGESTION, LEVE, MEDIANA, PESADA, INTRANSITABLE;

    companion object {
        fun ofPercentage(percentage: Double) : CongestionLevel {
            return when(percentage) {
                0.0 -> SIN_CONGESTION
                in 0.0 .. 0.3 -> LEVE
                in 0.3 .. 0.5 -> MEDIANA
                in 0.5 .. 0.7 -> PESADA
                else -> INTRANSITABLE
            }
        }
    }
}