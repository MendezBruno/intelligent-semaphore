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
    this.nodos = new Array();
    this.preferencia = 1;
}

function CalleVertical() {
    this.sentidosPosibles = [Sentido.NORTE_SUR, Sentido.SUR_NORTE];
}

function CalleHorizontal() {
    this.sentidosPosibles = [Sentido.ESTE_OESTE, Sentido.OESTE_ESTE];
}