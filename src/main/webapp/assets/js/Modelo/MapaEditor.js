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
    var self = this;

    self.nodoEntradaSegunId = function(idNodo){
        console.log(self.nodosEntrada);
        return self.nodosEntrada
            .filter(function(e){return e.id == idNodo});
    }

    self.nodoSalidaSegunId = function(idNodo){
        console.log(self.nodosSalida);
        return self.nodosSalida
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


MapaEditor.prototype.cambiarSentido = function (nodo1,nodo2){
    // var nodoEntrada = this.nodoEntradaSegunId(idNodoEntradaCanvas);
    // var nodoSalida = this.nodoSalidaSegunId(idNodoSalidaCanvas);
    var nodoEntrada;
    var nodoSalida;
    var indice;
    for (i=0; i<this.nodosEntrada.length;i++) {
        if (this.nodosEntrada[i].id == nodo1.id) {
            nodoEntrada = nodo1;
            nodoSalida = nodo2;
            indice = i;
            break
        }
        if (this.nodosEntrada[i].id == nodo2.id) {
            nodoEntrada = nodo2;
            nodoSalida = nodo1;
            indice = i;
            break
        }
    }
    // var indice = this.nodosEntrada.indexOf(nodoEntrada[0]);  //se supone es el mismo indice para los dos nodos siempre
    //console.log(this.nodosEntrada);
    //console.log(this.nodosSalida);
    this.nodosEntrada.splice(indice,1,nodoSalida);
    this.nodosSalida.splice(indice,1,nodoEntrada);
    //console.log(this.nodosEntrada);
    //console.log(this.nodosSalida);
    var cme = nodoEntrada.cantMaxima;
    var ie = nodoEntrada.intervalo;
    nodoEntrada.cantMaxima = nodoSalida.cantMaxima;
    nodoEntrada.intervalo = nodoSalida.intervalo;
    nodoSalida.cantMaxima = cme;
    nodoSalida.intervalo = ie;
}

MapaEditor.prototype.noSemaforoTOsemaforo = function (id) {
    var self = this;
    var nodoEncontrado = self.nodosNoSemaforo.find(function(nodo){
        return nodo.id == id;
    } );
    self.nodosNoSemaforo.removeIf(function(nodoLista){
        return nodoLista.id==nodoEncontrado.id;
    })
    nodoEncontrado.tiempoHorizontal = 4;
    nodoEncontrado.tiempoVertical = 4;
    this.nodosSemaforo.push(nodoEncontrado);
};

MapaEditor.prototype.semaforoTOnoSemaforo = function (id) {
    var self = this;
    var nodoEncontrado = self.nodosSemaforo.find(function(nodo){
        return nodo.id == id;
    } );
    self.nodosSemaforo.removeIf(function(nodoLista){
        return nodoLista.id==nodoEncontrado.id;
    })
    nodoEncontrado.tiempoHorizontal = undefined;
    nodoEncontrado.tiempoVertical = undefined;
    this.nodosNoSemaforo.push(nodoEncontrado);
};

/**
 * Recupera un modelo MapaEditor desde un json.
 * Todos sus elementos tienen sus respectivos prototipos.
 * @param json String con formato json
 */
MapaEditor.desParsear = function (json) {
    var modelo = JSON.parse(json);
    modelo.__proto__ = MapaEditor.prototype;
    modelo.nodosEntrada
        .concat(modelo.nodosSalida)
        .forEach(function (n) {
            n.__proto__ = NodoBorde.prototype;
        });
    modelo.nodosSemaforo
        .concat(modelo.nodosNoSemaforo)
        .forEach(function (n) {
            n.__proto__ = NodoControl.prototype;
        });
    modelo.callesHorizontales
        .forEach(function (calle) {
            calle.__proto__ = CalleHorizontal.prototype;
            calle.cuadras.forEach(function (c) {
                c.__proto__ = Cuadra.prototype;
            })
        });
    modelo.callesVerticales
        .forEach(function (calle) {
            calle.__proto__ = CalleVertical.prototype;
            calle.cuadras.forEach(function (c) {
                c.__proto__ = Cuadra.prototype;
            })
        });
    return modelo;
};

MapaEditor.prototype.nodoSemaforoPorID = function(id){
    return this.nodosSemaforo.find(function(nodo){
        return nodo.id == id;
    } );
};

dameTusCuadras = function (calles){
    var cuadras = new Array();
    calles.forEach( function(calle){
        cuadras = cuadras.concat(calle.cuadras);
    })
    return cuadras;
}

MapaEditor.prototype.cuadraPorID = function(id){
    var cuadrasAux = dameTusCuadras(this.callesHorizontales);
    cuadrasAux = cuadrasAux.concat(dameTusCuadras(this.callesVerticales));

    return cuadrasAux.find(function(cuadra){
        return cuadra.id == id;
    } );
};


MapaEditor.prototype.actualizarCongestion = function (datos, dicDatosCuadra){
    var self = this;
    datos.blockStatus.forEach (function (estadoCuadra){
        var cuadra = self.cuadraPorID(estadoCuadra.id);
        //cuadra.congestion.tipo = estadoCuadra.tipo;
        if(cuadra.congestionValor) cuadra.restarValorActual (dicDatosCuadra);
        cuadra.congestionValor = estadoCuadra.congestion;
        cuadra.actualizarTipo();
    });



MapaEditor.prototype.tamizarDatosCongestion = function (dicDatosCuadra) {
    var self = this;
    var cuadrasAux = dameTusCuadras(self.callesHorizontales);
    cuadrasAux = cuadrasAux.concat(dameTusCuadras(self.callesVerticales));
    cuadrasAux.forEach (function (cuadra) {
        cuadra.sumarValorDeCongestion(dicDatosCuadra);
    })

}

}