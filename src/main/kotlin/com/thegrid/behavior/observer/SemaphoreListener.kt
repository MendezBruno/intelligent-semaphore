package com.thegrid.behavior.observer

import com.thegrid.behavior.model.SemaphoreNode

interface SemaphoreListener {
    fun fire(sem: SemaphoreNode)
}
