package com.thegrid.semaphore.model

import org.junit.Assert
import org.junit.Test


class ContactTest {

    @Test
    fun firstTest() {
        val resultContact = Contact(
                name = "Cristian",
                age = 23,
                telephones = mutableListOf(Telephone(number = "45678910", name = "Home")))
        val testContact = Contact(name = "Pepe", age = 12)
        val transformator = Transformator(testContact)
        Assert.assertTrue( transformator.transform() == resultContact)
    }

}