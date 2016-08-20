package com.thegrid.api

import com.google.api.server.spi.config.AnnotationBoolean
import com.google.api.server.spi.config.Api
import com.google.api.server.spi.config.ApiMethod
import com.google.api.server.spi.config.ApiNamespace
import com.google.api.server.spi.config.ApiResourceProperty

/**
 * Created by Ezequiel on 20/08/2016.
 */

@Api(name = "intelligentsemaphore", version = "v1",
     namespace = ApiNamespace(ownerDomain = "helloworld.example.com",
             ownerName = "helloworld.example.com", packagePath = ""))
class WebApiKotlin() {

    @ApiMethod(name = "sayHiUserKotlin", httpMethod = ApiMethod.HttpMethod.GET)
    fun sayHiUserKotlin(): ObjetoKotlin {
        return ObjetoKotlin("Eze", arrayOf("Tomas", "Ayzenberg"));
    }
}
