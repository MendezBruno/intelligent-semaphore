package com.thegrid.communication.controller

import com.googlecode.objectify.ObjectifyService
import com.thegrid.ia.model.DataSetEntity
import com.thegrid.ia.model.DataSetRowEntity
import javax.servlet.ServletContextEvent
import javax.servlet.ServletContextListener

/**
 * OfyHelper, a ServletContextListener, is setup in web.xml to run before a JSP is run.  This is
 * required to let JSP's access Ofy.
 */
class OfyHelper : ServletContextListener {
    override fun contextInitialized(event: ServletContextEvent) {
        // This will be invoked as part of a warmup request, or the first user request if no warmup
        // request.
        ObjectifyService.register(DataSetEntity::class.java)
        ObjectifyService.register(DataSetRowEntity::class.java)

    }

    override fun contextDestroyed(event: ServletContextEvent) {
        // App Engine does not currently invoke this method.
    }

    companion object {
        fun deleteRna(id:String) {
            ObjectifyService.ofy().delete().type(DataSetEntity::class.java).id(id).now()
        }
    }
}
