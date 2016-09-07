package com.thegrid.behavior.observer

import com.thegrid.behavior.model.Block

interface BlockListener {
    fun fire(block: Block)
}
