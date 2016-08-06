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

    this.cambiaTuSentido =function (){
        this.sentido = this.sentido == 1 ? 2:1;  //TODO Implementar la herencia para que cada calle cambien el sentido que debe cambiar @EZE
    }
}



function CalleVertical() {
    this.sentidosPosibles = [Sentido.NORTE_SUR, Sentido.SUR_NORTE];

    this.cambiaTuSentido =function (){
        this.sentido = this.sentido == Sentido.NORTE_SUR ? Sentido.SUR_NORTE:Sentido.NORTE_SUR;
    }
}

function CalleHorizontal() {
    this.sentidosPosibles = [Sentido.ESTE_OESTE, Sentido.OESTE_ESTE];

    this.cambiaTuSentido =function (){
        this.sentido = this.sentido == Sentido.ESTE_OESTE ? Sentido.OESTE_ESTE:Sentido.ESTE_OESTE;
    }
}