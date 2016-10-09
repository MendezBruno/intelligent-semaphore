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

    //Referencias a las cuadras aledañas
    this.arriba = undefined;
    this.abajo = undefined;
    this.izquierda = undefined;
    this.derecha = undefined;

    var self = this;

    this.handleClick = function (event) {
            this.clickListeners.forEach(function(l){
                l(self);
            });
    };
    this.setup();
};

createjs.extend(CnvInterseccion, createjs.Container);

CnvInterseccion.prototype.setup = function () {
    var ancho = this.cantCarrilesV * Carril.ancho;
    var alto = this.cantCarrilesH * Carril.ancho;
    var ala = Carril.ancho/6;  //ancho de linea amarilla es siempre sobre el ancho de 1 (uno) carril
    var factorCarril = 2;

    //this.background = new createjs.Shape();
    //this.background.graphics
    //    .beginFill(ColoresRGB.getGRAY().toHexa())
    //    .drawRect(this.posX,this.posY,ancho,alto);
    //this.addChild(this.background);
    if (this.semaforo){
        var cnvSemaforo = new CnvSemaforo(this);
        cnvSemaforo.setSize(Carril.ancho * factorCarril);
        cnvSemaforo.x = this.posX +
            Carril.ancho*(this.cantCarrilesV - factorCarril) / 2;
        cnvSemaforo.y = this.posY +
            Carril.ancho*(this.cantCarrilesH - factorCarril) / 2;
        this.addChild(cnvSemaforo);
        this.cnvSemaforo = cnvSemaforo;
    }else{
        //agregar interseccion vacia si es una avenida grande
    }

    this.on("click", this.handleClick);
    
};

CnvInterseccion.prototype.init = function() {
    if (this.semaforo) {
        this.arriba.asentarFlechaSalida();
        this.izquierda.asentarFlechaSalida();
        this.derecha.asentarFlechaEntrada();
        this.abajo.asentarFlechaEntrada();
    }
}

window.CnvInterseccion = createjs.promote(CnvInterseccion, "Container");