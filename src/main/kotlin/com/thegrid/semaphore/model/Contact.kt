package com.thegrid.semaphore.model

import kotlin.*
/**
 * Created by crist on 6/7/2016.
 */
data class Contact(val name: String, val age: Int, var telephones: MutableList<Telephone> = mutableListOf()) {

    fun addTelephone(telephone: Telephone) = telephones.add(telephone)

    fun removeTelephoneByNumber(number: String) = telephones.remove(telephones.find { it.number ==  number})

    fun removeTelephoneByName(name: String) = telephones.remove(telephones.find { it.name ==  name})
}

data class Telephone(val number: String, val name: String)

class Transformator(var contact: Contact) {

    fun transform() = Contact(
            name = "Cristian",
            age = 23,
            telephones = mutableListOf(Telephone(number = "45678910", name = "Home")))
}