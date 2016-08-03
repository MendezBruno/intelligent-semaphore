/**
 * Created by Ezequiel on 03/08/2016.
 */

var Sentido = {
    NORTE_SUR: "Norte-Sur",
    SUR_NORTE: "Sur-Norte",
    OESTE_ESTE: "Oeste-Este",
    ESTE_OESTE: "Este-Oeste"
}

function Calle() {
    this.cantCarriles = 2;
    this.fdpEntradaCantMax=1;
    this.fdpEntradaIntervalo=1;
    this.fdpSalidaCantMax=1;
    this.fdpSalidaIntervalo=1;
    this.sentido=undefined;
}