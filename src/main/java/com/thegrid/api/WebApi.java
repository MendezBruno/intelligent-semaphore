package com.thegrid.api;

import com.google.api.server.spi.config.AnnotationBoolean;
import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.ApiResourceProperty;

import javax.inject.Named;

/**
 * Created by Ezequiel on 19/08/2016.
 */
@Api(name = "intelligentsemaphore",
        version = "v1",
        namespace = @ApiNamespace(ownerDomain = "helloworld.example.com",
                ownerName = "helloworld.example.com",
                packagePath = ""))
public class WebApi {

    @ApiMethod(
            name = "sayHiUser",
            httpMethod = ApiMethod.HttpMethod.GET)
    public Objeto sayHiUser() {
        return new Objeto("ASD");
    }

    @ApiMethod(
            name = "postObjeto",
            httpMethod = ApiMethod.HttpMethod.POST)
    public Objeto postObjeto(Objeto obj) {
        return obj;
    }
}
