package com.thegrid.communication.controller

import com.thegrid.communication.model.MapState
import com.thegrid.communication.service.MapParser
import java.util.*
import javax.servlet.http.HttpServlet
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

/**
 * Created by Surakituaka on 21/07/2016.
 */


class MapStateController : HttpServlet() {

    public override fun doGet(req: HttpServletRequest, res: HttpServletResponse) {
        val mapState = MapState.SharedInstance

        val parser = MapParser(mapState.blockStatus, mapState.semaphoreStatus)



        res.contentType = "text/plain" //ver tipo para json
        res.writer. .sendJson(parser.parseToJson()) //TODO buscar forma de enviar un json
    }


    /**
    public override fun doPost(req: HttpServletRequest, res: HttpServletResponse) {
        list.add(req.getParameter("name"))
        res.contentType = "text/plain"
        if (list.isEmpty()) {
            res.writer.println("Please enter a name")
        }
        for(item: String in list) {
            res.writer.println("Hello " + item!!)
        }
    }*/
}