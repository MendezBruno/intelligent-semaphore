package com.thegrid.communication.model

import com.thegrid.behavior.model.CongestionLevel
import com.thegrid.communication.extension.RGBA

data class dataBlockStatus (var id:String = "666-El infierno",
                            var stock:Int = 0,
                            var color: RGBA = RGBA(0,0,0,1),
                            var congestionLevel: CongestionLevel)