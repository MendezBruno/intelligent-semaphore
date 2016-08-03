/**
 * Created by bruno on 03/08/16.
 */
function MapaEditor() {
    this.calles = new Array();
    this.cuadras = new Array();
    this.nodos = new Array();
}

MapaEditor.prototype.insertarCalle = function(id,cuadras,sentido,orientacion){
    console.log(id);
    console.log(cuadras);
    console.log(sentido);
    console.log(orientacion);
    this.calles.push(new Calle());
    console.log(this.calles.pop());
}