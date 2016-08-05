/**
 * Created by bruno on 03/08/16.
 */
function MapaEditor() {
    this.callesHorizontales = new Array();
    this.callesVerticales = new Array();
    this.nodosEntrada = new Array();
    this.nodosSalida = new Array();
    this.nodosSemaforo = new Array();
    this.nodosNoSemaforo = new Array();
    this.nombre = "";
}

MapaEditor.prototype.insertarCalle = function(id,cuadras,sentido,orientacion){
    console.log(id);
    console.log(cuadras);
    console.log(sentido);
    console.log(orientacion);
    this.calles.push(new Calle());
    console.log(this.calles.pop());
}