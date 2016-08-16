package com.thegrid.communication.controller

import com.google.appengine.labs.repackaged.org.json.JSONObject
import java.io.IOException
import java.text.ParseException
import javax.servlet.http.HttpServlet
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

/**
 * Created by Surakituaka on 01/08/2016.
 */

class MapController : HttpServlet() {

    public override fun doGet(req: HttpServletRequest, res: HttpServletResponse) {


        res.contentType = "text/plain"
        res.writer.print("esto devuelve en get")
    }


    //TODO completar

    public override fun doPost(req: HttpServletRequest, res: HttpServletResponse) {

        val jb = StringBuffer()
        var line: String? = null
        try {
            val reader = req.reader
            line = reader.readLine()
            while (line != null) {
                jb.append(line)
                line = reader.readLine()
            }
        } catch (e: Exception) { /*report an error*/
        }

        try {
            val jsonObject = JSONObject(jb.toString())
        } catch (e: ParseException) {
            // crash and burn
            throw IOException("Error parsing JSON request string")
        }
    }
}