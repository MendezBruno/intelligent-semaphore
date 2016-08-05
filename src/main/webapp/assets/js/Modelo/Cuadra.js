/**
 * Created by Ezequiel on 03/08/2016.
 */
function Cuadra() {
    this.longitud = 100;
    this.id = Cuadra.getNextId();
}
Cuadra.nextId = 1;

Cuadra.getNextId = function() {
    var next = Cuadra.nextId;
    Cuadra.nextId++;
    return "cuadra-"+next;
}
