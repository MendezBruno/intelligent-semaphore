/**
 * Created by Ezequiel on 11/08/2016.
 */

function CnvSemaforo(cvnInterseccion) {
    this.Container_constructor();
    this.left = new createjs.Shape();
    this.right = new createjs.Shape();
    this.top = new createjs.Shape();
    this.bottom = new createjs.Shape();
    this.centro = new createjs.Shape();
    var verde = CnvSemaforo.verde;
    var rojo = CnvSemaforo.rojo;
    this.centro.graphics.beginFill("#979797").drawRect(7,7,16,16,10);
    this.top.graphics.beginFill(verde.toHexa()).drawRect(7,0,16,5,10);
    this.bottom.graphics.beginFill(verde.toHexa()).drawRect(7,25,16,5,10);
    this.left.graphics.beginFill(rojo.toHexa()).drawRect(0,7,5,16,10);
    this.right.graphics.beginFill(rojo.toHexa()).drawRect(25,7,5,16,10);
    this.addChild(this.background);
    this.addChild(this.top);
    this.addChild(this.bottom);
    this.addChild(this.left);
    this.addChild(this.right);
    this.addChild(this.centro);
    this.scaleX = 2;
    this.scaleY = 2;
    this.cnvInterseccion = cvnInterseccion;
    this.v = true;
    var self = this;
    this.handleClick = function (e) {
        if (self.v) self.verdeH(); else self.verdeV();
        self.v = !self.v;
    }
    this.on("click", this.handleClick);
}
CnvSemaforo.anchoOriginal = 30;
CnvSemaforo.verde = ColoresRGB.getGREEN();
CnvSemaforo.rojo = ColoresRGB.getRED();
CnvSemaforo.anchoOriginal = 30;

createjs.extend(CnvSemaforo, createjs.Container);
window.CnvSemaforo = createjs.promote(CnvSemaforo, "Container");

CnvSemaforo.prototype.setSize = function(aSize){
    this.scaleX = aSize / CnvSemaforo.anchoOriginal;
    this.scaleY = aSize / CnvSemaforo.anchoOriginal;
}

CnvSemaforo.prototype.verdeH = function () {
    var verde = CnvSemaforo.verde;
    var rojo = CnvSemaforo.rojo;
    this.top.graphics._fill.style = rojo.toString();
    this.bottom.graphics._fill.style = rojo.toString();
    this.left.graphics._fill.style = verde.toString();
    this.right.graphics._fill.style = verde.toString();
    this.cnvInterseccion.izquierda.cambiarColorFlechaSalida(verde);
    this.cnvInterseccion.derecha.cambiarColorFlechaEntrada(verde);
    this.cnvInterseccion.arriba.cambiarColorFlechaSalida(rojo);
    this.cnvInterseccion.abajo.cambiarColorFlechaEntrada(rojo);
}

CnvSemaforo.prototype.verdeV = function () {
    var verde = CnvSemaforo.verde;
    var rojo = CnvSemaforo.rojo;
    this.top.graphics._fill.style = verde.toString();
    this.bottom.graphics._fill.style = verde.toString();
    this.left.graphics._fill.style = rojo.toString();
    this.right.graphics._fill.style = rojo.toString();
    this.cnvInterseccion.izquierda.cambiarColorFlechaSalida(rojo);
    this.cnvInterseccion.derecha.cambiarColorFlechaEntrada(rojo);
    this.cnvInterseccion.arriba.cambiarColorFlechaSalida(verde);
    this.cnvInterseccion.abajo.cambiarColorFlechaEntrada(verde);
}

