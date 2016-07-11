package com.thegrid.semaphore.model

import kotlin.*
/**
 * Created by crist on 6/7/2016.
 */
data class Contact(val name: String, val age: Int, var telephones: MutableList<Telephone>) {

    fun addTelephone(telephone: Telephone) = telephones.add(telephone)

    fun removeTelephoneByNumber(number: String) = telephones.remove(telephones.find { it.number ==  number})

    fun removeTelephoneByName(name: String) = telephones.remove(telephones.find { it.name ==  name})
}

data class Telephone(val number: String, val name: String)