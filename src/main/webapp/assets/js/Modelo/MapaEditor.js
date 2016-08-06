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
    self = this;

    self.nodoEntradaSegunId = function(idNodo){
        console.log(this.nodosEntrada);
        return this.nodosEntrada
            .filter(function(e){return e.id == idNodo});
    }

    self.nodoSalidaSegunId = function(idNodo){
        console.log(this.nodosSalida);
        return this.nodosSalida
            .filter(function(e){return e.id == idNodo});
    }




}

MapaEditor.prototype.insertarCalle = function(id,cuadras,sentido,orientacion){
    console.log(id);
    console.log(cuadras);
    console.log(sentido);
    console.log(orientacion);
    this.calles.push(new Calle());
    console.log(this.calles.pop());
}


MapaEditor.prototype.cambiarSentido = function (idNodoEntradaCanvas,idNodoSalidaCanvas){
    var nodoEntrada = this.nodoEntradaSegunId(idNodoEntradaCanvas);
    var nodoSalida = this.nodoSalidaSegunId(idNodoSalidaCanvas);
    var indice = this.nodosEntrada.indexOf(nodoEntrada[0]);  //se supone es el mismo indice para los dos nodos siempre
    //console.log(this.nodosEntrada);
    //console.log(this.nodosSalida);
    this.nodosEntrada.splice(indice,1,nodoSalida[0]);
    this.nodosSalida.splice(indice,1,nodoEntrada[0]);
    //console.log(this.nodosEntrada);
    //console.log(this.nodosSalida);
}

