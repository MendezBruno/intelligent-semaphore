package com.thegrid.semaphore.model

import org.jetbrains.spek.api.Spek

/**
 * Created by surakituaka on 27/7/2016.
 */

class TestContact: Spek({
    given("a contact") {
        var tels: MutableList<Telephone> = mutableListOf()
        val tel = Telephone("12345","tel de juan")
        val contact = Contact("juan",23,tels)

        on("adding a tel number") {
            contact.addTelephone(tel)
            println(contact.telephones.first().number)

            it("should return the tel number") {
                assert(contact.telephones.first().number == "12345")
            }
        }
    }
})