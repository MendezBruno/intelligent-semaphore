/**
 * Created by Ezequiel on 03/08/2016.
 */

var Sentido = {
    NORTE_SUR: "Norte-Sur",
    SUR_NORTE: "Sur-Norte",
    OESTE_ESTE: "Oeste-Este",
    ESTE_OESTE: "Este-Oeste"
}

function Calle() { //ABSTRACTA
    this.cantCarriles = 2;
    this.sentido=undefined;
    this.cuadras = new Array();
    this.preferencia = 1;
}

function CalleVertical() {
    Calle.call(this);
    this.sentidosPosibles = [Sentido.NORTE_SUR, Sentido.SUR_NORTE];
}
createjs.extend(CalleVertical,Calle);

CalleVertical.prototype.cambiaTuSentido = function (){
    this.sentido = this.sentido == Sentido.NORTE_SUR ? Sentido.SUR_NORTE:Sentido.NORTE_SUR;
}

function CalleHorizontal() {
    Calle.call(this);
    this.sentidosPosibles = [Sentido.ESTE_OESTE, Sentido.OESTE_ESTE];
}
createjs.extend(CalleHorizontal,Calle);
CalleHorizontal.prototype.cambiaTuSentido =function (){
    this.sentido = this.sentido == Sentido.ESTE_OESTE ? Sentido.OESTE_ESTE:Sentido.ESTE_OESTE;
}