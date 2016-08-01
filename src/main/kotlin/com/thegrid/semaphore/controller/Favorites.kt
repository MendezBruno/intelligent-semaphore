package com.thegrid.semaphore.controller

import java.util.*
import javax.servlet.http.HttpServlet
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class Favorites : HttpServlet() {

    val list = arrayListOf<String>()

    public override fun doGet(req: HttpServletRequest, res: HttpServletResponse) {
        res.contentType = "text/plain"
        res.writer.println("Please use the form to POST to this url")
    }

    public override fun doPost(req: HttpServletRequest, res: HttpServletResponse) {

        list.add(req.getParameter("name"))
        res.contentType = "text/plain"
        if (list.isEmpty()) {
            res.writer.println("Please enter a name")
        }
        for(item: String in list) {
            res.writer.println("Hello " + item!!)
        }
    }
}
