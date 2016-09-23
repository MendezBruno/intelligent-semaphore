package com.thegrid.behavior.platform

import com.google.appengine.api.ThreadManager

class Orchestrator(r:Runnable) {
    companion object {
        var SharedInstance : Orchestrator? = null
    }

    val hilo: Thread = ThreadManager.createBackgroundThread(r)


    init {
        SharedInstance = this
        hilo.start()
    }

    fun pausar() = hilo.interrupt()

    fun reanudar() = hilo.run()
    
}
