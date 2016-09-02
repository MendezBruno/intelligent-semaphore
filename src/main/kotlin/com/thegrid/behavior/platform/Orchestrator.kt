package com.thegrid.behavior.platform

import com.google.appengine.api.ThreadManager

class Orchestrator(r:Runnable) {
    val hilo: Thread
    init {
        hilo = ThreadManager.createBackgroundThread(r);
        hilo.start();
    }

    fun pausar() {
        hilo.suspend()
    }

    fun reanudar() {
        hilo.resume()
    }
}
