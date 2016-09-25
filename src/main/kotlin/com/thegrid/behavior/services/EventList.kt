package com.thegrid.behavior.services

import rx.Observable
import rx.lang.kotlin.ReplaySubject
import rx.subjects.ReplaySubject

/**
 * Created by CristianErik on 02/09/2016.
 */

//TODO- Tiene mucho potencial y capaz podriamos lograr que se aproveche por completo el bufer de los subjects,
//TODO- en vez de hacer un take(1) en TimeDispatcher

class EventList<E>(override val size: Int = 0) : MutableList<E> {

    val addedObjectObserver: Observable<E>
        get() = _addedObjectSubject

    val removedObjectObserver: Observable<E>
        get() = _removedObjectSubject

    val list: MutableList<E> = mutableListOf()

    private val _addedObjectSubject: ReplaySubject<E>
    private val _removedObjectSubject: ReplaySubject<E>


    init {
        _addedObjectSubject = ReplaySubject(50)
        _removedObjectSubject = ReplaySubject(50)
    }

    override fun contains(element: E) = list.contains(element)
    override fun containsAll(elements: Collection<E>)  = list.containsAll(elements)
    override fun get(index: Int) = list.get(index)
    override fun indexOf(element: E) = list.indexOf(element)
    override fun isEmpty() = list.isEmpty()
    override fun iterator() = list.iterator()
    override fun lastIndexOf(element: E) = list.lastIndexOf(element)
    override fun add(element: E): Boolean {
        _addedObjectSubject.onNext(element)
        return list.add(element)
    }
    override fun add(index: Int, element: E) {
        _addedObjectSubject.onNext(element)
        list.add(index, element)
    }
    override fun addAll(index: Int, elements: Collection<E>): Boolean {
        elements.forEach { _addedObjectSubject.onNext(it) }
        return list.addAll(index, elements)
    }
    override fun addAll(elements: Collection<E>): Boolean {
        elements.forEach { _addedObjectSubject.onNext(it) }
        return list.addAll(elements)
    }
    override fun clear() = list.clear()
    override fun listIterator() = list.listIterator()
    override fun listIterator(index: Int) = list.listIterator(index)
    override fun remove(element: E): Boolean {
        _removedObjectSubject.onNext(element)
        return list.remove(element)
    }
    override fun removeAll(elements: Collection<E>): Boolean {
        elements.forEach { _removedObjectSubject.onNext(it) }
        return list.removeAll(elements)
    }
    override fun removeAt(index: Int): E {
        val element = list.removeAt(index)
        _removedObjectSubject.onNext(element)
        return element
    }
    override fun retainAll(elements: Collection<E>) = list.retainAll(elements)
    override fun set(index: Int, element: E) = list.set(index, element)
    override fun subList(fromIndex: Int, toIndex: Int) = list.subList(fromIndex, toIndex)
}