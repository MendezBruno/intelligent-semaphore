package com.thegrid.behavior.plattform

import com.google.appengine.api.ThreadManager

class Orquestar(r:Runnable) {
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
