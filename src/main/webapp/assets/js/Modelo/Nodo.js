/**
 * Created by bruno on 08/08/16.
 */
function Nodo() { //ABSTRACTA
    this.id = Nodo.getNextId();
}

function NodoNoSemaforo() {
    this.id = Nodo.getNextId();
    this.tiempoHorizontal = 150;
    this.tiempoVertical = 150;
}

function NodoControl() {
    this.id = Nodo.getNextId();
    this.tiempoHorizontal = undefined;
    this.tiempoVertical = undefined;
}

function NodoBorde() {
    this.id = Nodo.getNextId();
    this.cantMaxima = 1;
    this.intervalo = 5;
}

Nodo.nextId = 1;
Nodo.getNextId = function() {
    var next = Nodo.nextId;
    Nodo.nextId++;
    return "nodo-"+next;
}

