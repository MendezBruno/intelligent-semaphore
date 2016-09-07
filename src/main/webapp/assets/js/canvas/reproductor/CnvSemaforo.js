/**
 * Created by Ezequiel on 11/08/2016.
 */

function CnvSemaforo(cvnInterseccion) {
    this.Container_constructor();
    this.background = new createjs.Shape();
    var ancho = CnvSemaforo.anchoOriginal;
    var bg = this.background;
    // bg.graphics.beginFill("black").drawRect(0,0,30,30);
    this.left = new createjs.Shape();
    this.right = new createjs.Shape();
    this.top = new createjs.Shape();
    this.bottom = new createjs.Shape();
    this.centro = new createjs.Shape();
    this.centro.graphics.beginFill("#979797").drawRect(7,7,16,16,10);
    this.addChild(this.background);
    this.addChild(this.top);
    this.addChild(this.bottom);
    this.addChild(this.left);
    this.addChild(this.right);
    this.addChild(this.centro);
    this.scaleX = 2;
    this.scaleY = 2;
    this.cnvInterseccion = cvnInterseccion;
    this.verdeV();
    this.v = true;
    var self = this;
    this.handleClick = function (e) {
        console.log(self.v);
        if (self.v) self.verdeH(); else self.verdeV();
        self.v = !self.v;
    }
    this.on("click", this.handleClick);
}
CnvSemaforo.anchoOriginal = 30;

createjs.extend(CnvSemaforo, createjs.Container);
window.CnvSemaforo = createjs.promote(CnvSemaforo, "Container");

CnvSemaforo.prototype.setSize = function(aSize){
    this.scaleX = aSize / CnvSemaforo.anchoOriginal;
    this.scaleY = aSize / CnvSemaforo.anchoOriginal;
}

CnvSemaforo.prototype.verdeH = function () {
    this.top.graphics.beginFill("#ff0000").drawRect(7,0,16,5,10);
    this.bottom.graphics.beginFill("#ff0000").drawRect(7,25,16,5,10);
    this.left.graphics.beginFill("#0bff00").drawRect(0,7,5,16,10);
    this.right.graphics.beginFill("#0bff00").drawRect(25,7,5,16,10);
    this.cnvInterseccion.izquierda.cambiarColorFlechaSalida(ColoresRGB.getGREEN());
    this.cnvInterseccion.derecha.cambiarColorFlechaEntrada(ColoresRGB.getGREEN());
    this.cnvInterseccion.arriba.cambiarColorFlechaSalida(ColoresRGB.getRED());
    this.cnvInterseccion.abajo.cambiarColorFlechaEntrada(ColoresRGB.getRED());
}

CnvSemaforo.prototype.verdeV = function () {
    this.top.graphics.beginFill("#0bff00").drawRect(7,0,16,5,10);
    this.bottom.graphics.beginFill("#0bff00").drawRect(7,25,16,5,10);
    this.left.graphics.beginFill("#ff0000").drawRect(0,7,5,16,10);
    this.right.graphics.beginFill("#ff0000").drawRect(25,7,5,16,10);
    if (!this.cnvInterseccion.izquierda) return;
    this.cnvInterseccion.izquierda.cambiarColorFlechaSalida(ColoresRGB.getRED());
    this.cnvInterseccion.derecha.cambiarColorFlechaEntrada(ColoresRGB.getRED());
    this.cnvInterseccion.arriba.cambiarColorFlechaSalida(ColoresRGB.getGREEN());
    this.cnvInterseccion.abajo.cambiarColorFlechaEntrada(ColoresRGB.getGREEN());
}

