/**
 * Created by Ezequiel on 11/08/2016.
 */

Carril = {};
Carril.ancho = 20; // Podria cambiar

function CnvInterseccion(posX, posY, cantCarrilesH, cantCarrilesV,semaforo) {
    this.Container_constructor();
    this.posX=posX;
    this.posY=posY;
    this.cantCarrilesH=cantCarrilesH;
    this.cantCarrilesV=cantCarrilesV;
    this.semaforo = semaforo;
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
    var ladoSemaforo = 30;
    var proporcionAncho = ancho/ladoSemaforo;
    var proporcionAlto = alto/ladoSemaforo;
    proporcionAlto = proporcionAlto /4;
    proporcionAncho = proporcionAncho / 4;

    //ancho=+100;
    //alto=+100;
    this.background = new createjs.Shape();
    this.background.graphics
        .beginFill("#b3b3b3")
        .drawRect(this.posX,this.posY,ancho+ala,alto+ala,10);
    this.addChild(this.background);
   if (this.semaforo){
    var cnvSemaforo = new CnvSemaforo();
       cnvSemaforo.scaleX = proporcionAncho;
       cnvSemaforo.scaleY = proporcionAlto;
    cnvSemaforo.x = this.posX + ancho/2 - proporcionAncho*8 ;  //- ladoSemaforo/2
    cnvSemaforo.y = this.posY + alto/2 - proporcionAlto*8;  //+ alto/2 + ladoSemaforo/2
    this.addChild(cnvSemaforo);
   }
    else{
       //agregar interseccion vacia si es una avenida grande
   }
    
};
window.CnvInterseccion = createjs.promote(CnvInterseccion, "Container");