package com.thegrid.communication.controller

import com.thegrid.communication.model.MapState
import com.thegrid.communication.service.MapParser
import javax.servlet.http.HttpServlet
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

/**
 * Created by Surakituaka on 21/07/2016.
 */


class MapStateController : HttpServlet() {

    public override fun doGet(req: HttpServletRequest, res: HttpServletResponse) {
        val mapState = MapState.SharedInstance //obtengo el mapa

        val parser = MapParser(mapState) //creo el parser enviando el mapa


        res.contentType = "application/json" // tipo para json
        res.writer.print(parser.parseToJson()) //envio el json (string)
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