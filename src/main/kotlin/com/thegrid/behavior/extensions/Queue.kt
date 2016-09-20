package com.thegrid.behavior.extensions

class Queue<T>{
    class Item<T>(val data : T, var next : Item<T>? = null)

    private var head : Item<T>? = null
    private var tail : Item<T>? = null

    fun head() = head

    fun push(item : T) {
        val i = Item(item)
        if (tail == null) {
            head = i
            tail = head
        } else {
            tail!!.next = i
            tail = i
        }
    }

    fun pop() =
        if (head == null)
            throw Exception("Queue Underflow!!")
        else {
            val result = head!!.data
            head = head!!.next
            if (head == null)
                tail = null
            result
        }

    val isEmpty : Boolean
        get() = head == null
}