/**
 * Created by Bruno on 03/08/16.
 */
//VARIABLES GLOBALES DEL CONSTRUCTOR
var ROJO="#ff3333";
var VERDE="#66ff66";

//METODOS DEL CONSTRUCTOR
function CnvCalle() {
    this.Container_constructor();
    var self = this;
    this.cuadras = new Array();
    this.modelo;
    this.calle;
    this.clickListeners = new Array();
    this.handleClick = function (){
        this.clickListeners.forEach(function(l){
            l(self);
        });
    };
    this.intercambiarColor = function(){
        self.nodo1().cambiarColor();
        self.nodo2().cambiarColor();
    }
    this.afectarModelo = function(){
        console.log(self.nodo1().id);
        console.log(self.nodo2().id);
        self.modelo.cambiarSentido(self.nodo1().id,self.nodo2().id);
        console.log(self.calle.sentido);
        self.calle.cambiaTuSentido();
        console.log(self.calle.sentido);
        var aux = self.nodo1().id;
        self.nodo1().id = self.nodo2().id;
        self.nodo2().id = aux;
    }

}

createjs.extend(CnvCalle, createjs.Container);
window.CnvCalle = createjs.promote(CnvCalle, "Container");

CnvCalle.prototype.inicializar = function() {
    this.nodo1().clickListeners.push(this.intercambiarColor);
    this.nodo2().clickListeners.push(this.intercambiarColor);
    this.nodo1().clickListeners.push(this.afectarModelo);
    this.nodo2().clickListeners.push(this.afectarModelo);
}

CnvCalle.prototype.setup = function() { //Abstracta
    this.on("click", this.handleClick);
    this.cursor = "pointer";
    this.mouseChildren = true;
    this.offset = Math.random()*10;
    this.count = 0;
};

function CnvCalleHorizontal(nodoBordeD,nodoBordeI) {
    CnvCalle.call(this); //super();
    this.nodoDerecho = nodoBordeD;
    this.nodoIzquierdo = nodoBordeI;
    this.nodo1 = function () { return this.nodoDerecho; };
    this.nodo2 = function () { return this.nodoIzquierdo; };
    this.inicializar();
}
createjs.extend(CnvCalleHorizontal, CnvCalle);

function CnvCalleVertical(nodoBordeS,nodoBordeI) {
    CnvCalle.call(this); //super();
    this.nodoSuperior = nodoBordeS;
    this.nodoInferior = nodoBordeI;
    this.nodo1 = function () { return this.nodoSuperior; };
    this.nodo2 = function () { return this.nodoInferior; };
    this.inicializar();
}
createjs.extend(CnvCalleVertical, CnvCalle);