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
    this.marcado = false;
    this.modelo;
    this.calle;
    this.$scope;
    this.largo;
    this.back;
    this.width = 20;
    this.horizontal = true;
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
        self.modelo.cambiarSentido(self.nodo1().nodo,self.nodo2().nodo);
        self.calle.cambiaTuSentido();
        // var aux = self.nodo1().id;
        // self.nodo1().id = self.nodo2().id;
        // self.nodo2().id = aux;
    }
    this.afectarScope = function(cnvNodo) {
        if(self.$scope.nodoEntrada.id == cnvNodo.nodo.id || self.$scope.nodoSalida.id == cnvNodo.nodo.id) {
            var entrada = self.$scope.nodoEntrada;
            self.$scope.nodoEntrada = self.$scope.nodoSalida;
            self.$scope.nodoSalida = entrada;
            self.timeout(function () {
                self.$scope.$apply();
            });

        }
    }
}

createjs.extend(CnvCalle, createjs.Container);
window.CnvCalle = createjs.promote(CnvCalle, "Container");

CnvCalle.prototype.inicializar = function() {
    this.nodo1().clickListeners.push(this.intercambiarColor);
    this.nodo2().clickListeners.push(this.intercambiarColor);
    this.nodo1().clickListeners.push(this.afectarModelo);
    this.nodo2().clickListeners.push(this.afectarModelo);
    this.nodo1().clickListeners.push(this.afectarScope);
    this.nodo2().clickListeners.push(this.afectarScope);
};

CnvCalle.prototype.marcarCalle= function(stage){
    var tamano = 0;
    this.back=new createjs.Shape();
    if (this.horizontal){
        tamano = this.cuadras.length -5;
        this.largo=this.cuadras[0].posX + this.cuadras[tamano].posX + 30;
        this.back.graphics.clear()
            .beginStroke("#000000")
            .setStrokeStyle(1)
            .drawRect(this.cuadras[0].posX,this.cuadras[0].posY,this.largo,this.width,10);
    stage.addChild(this.back);
}

    else {

        tamano = this.cuadras.length -2;

        this.largo=this.cuadras[0].posY + this.cuadras[tamano].posY - 10;

        this.back.graphics.clear()
            .beginStroke("#000000")
            .setStrokeStyle(1)
            .drawRect(this.cuadras[0].posX,this.cuadras[0].posY,this.width,this.largo,10);
    }
    stage.addChild(this.back);

    this.marcado = true;

};

CnvCalle.prototype.desmarcar= function(stage){

    stage.removeChild(this.back)
    this.marcado = false;

};

CnvCalle.prototype.setup = function() { //Abstracta
    this.on("click", this.handleClick);
    this.cursor = "pointer";
    this.mouseChildren = true;
    this.offset = Math.random()*10;
    this.count = 0;
};


function CnvCalleHorizontal(nodoBordeD,nodoBordeI,$timeout) {
    CnvCalle.call(this); //super();
    this.timeout=$timeout;
    this.nodoDerecho = nodoBordeD;
    this.nodoIzquierdo = nodoBordeI;
    this.nodo1 = function () { return this.nodoDerecho; };
    this.nodo2 = function () { return this.nodoIzquierdo; };
    this.horizontal = true;
    this.inicializar();
}
createjs.extend(CnvCalleHorizontal, CnvCalle);

function CnvCalleVertical(nodoBordeS,nodoBordeI,$timeout) {
    CnvCalle.call(this); //super();
    this.timeout=$timeout;
    this.nodoSuperior = nodoBordeS;
    this.nodoInferior = nodoBordeI;
    this.nodo1 = function () { return this.nodoSuperior; };
    this.nodo2 = function () { return this.nodoInferior; };
    this.horizontal = false;
    this.inicializar();

}
createjs.extend(CnvCalleVertical, CnvCalle);