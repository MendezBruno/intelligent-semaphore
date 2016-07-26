package com.thegrid.semaphore.model

import org.jetbrains.spek.api.Spek
import kotlin.*
//import com.winterbe.expekt.expect
//import com.winterbe.expekt.should
//import org.jetbrains.spek.api.Spek

/**
 * Created by crist on 6/7/2016.
 */
data class Contact(val name: String, val age: Int, var telephones: MutableList<Telephone>) {

    fun addTelephone(telephone: Telephone) = telephones.add(telephone)

    fun removeTelephoneByNumber(number: String) = telephones.remove(telephones.find { it.number ==  number})

    fun removeTelephoneByName(name: String) = telephones.remove(telephones.find { it.name ==  name})

}

data class Telephone(val number: String, val name: String)


//ejemplo
class SimpleTest : Spek({
    describe("a contact") {
        var tels: MutableList<Telephone> = mutableListOf()
        val tel = Telephone("12345","tel de juan")
        val contact = Contact("juan",23,tels)

        it("should return the tel number") {
            contact.addTelephone(tel)
            println(contact.telephones.first().number)
            assert(contact.telephones.first().number == "12345")
        }

    }
})