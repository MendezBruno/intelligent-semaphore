package com.thegrid.behavior.model

data class TimeLog(val t:Double, val duration:Double) {
    fun endTime() = t + duration;
}