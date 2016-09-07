package com.thegrid.behavior.platform

import com.google.appengine.api.ThreadManager

class Orchestrator(r:Runnable) {
    val hilo: Thread = ThreadManager.createBackgroundThread(r)

    init {
        hilo.start()
    }

    fun pausar() = hilo.suspend()

    fun reanudar() = hilo.resume()
}
