/**
 * Created by Ezequiel on 11/08/2016.
 */

Carril = {};
Carril.ancho = 20; // Podria cambiar

function CnvInterseccion(posX, posY, cantCarrilesH, cantCarrilesV) {
    this.Container_constructor();
    this.posX=posX;
    this.posY=posY;
    this.cantCarrilesH=cantCarrilesH;
    this.cantCarrilesV=cantCarrilesV;
    this.clickListeners = new Array();
    this.background = new createjs.Shape();
    var self = this;

    this.setup();
};

createjs.extend(CnvInterseccion, createjs.Container);


CnvInterseccion.prototype.setup = function () {
    var ancho = this.cantCarrilesV * Carril.ancho;
    var alto = this.cantCarrilesH * Carril.ancho;
    var ala = Carril.ancho/6;  //ancho de linea amarilla es siempre sobre el ancho de 1 (uno) carril
    //ancho=+100;
    //alto=+100;
    this.background = new createjs.Shape();
    this.background.graphics
        .beginFill("#b3b3b3")
        .drawRect(this.posX,this.posY,ancho+ala,alto+ala,10);
    this.addChild(this.background);
    
};
window.CnvInterseccion = createjs.promote(CnvInterseccion, "Container");