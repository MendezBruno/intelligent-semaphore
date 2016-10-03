package com.thegrid.behavior.platform

import com.google.appengine.api.ThreadManager

class Orchestrator(r: Runnable, val debugMode: Boolean) {
    companion object {
        var SharedInstance : Orchestrator? = null
    }

    val hilo: Thread

    init {
        SharedInstance = this
        if (debugMode)
            hilo = Thread(r)
        else
            hilo = ThreadManager.createBackgroundThread(r)
        hilo.start()
    }
}
