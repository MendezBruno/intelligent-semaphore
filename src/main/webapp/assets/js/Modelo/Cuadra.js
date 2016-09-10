/**
 * Created by Ezequiel on 03/08/2016.
 */
function Cuadra() {
    this.longitud = 100;
    this.id = Cuadra.getNextId();
    this.congestion = {
        tipo: "sin",
        valor: 0,
    }
}
Cuadra.nextId = 1;

Cuadra.getNextId = function() {
    var next = Cuadra.nextId;
    Cuadra.nextId++;
    return "cuadra-"+next;
}

Cuadra.sumarValorDeCongestion = function (dicDatos){
    dicDatos[congestion.tipo] =+ 1;
};

Cuadra.prototype.restarValorActual = function (dicDatos){
    dicDatos[obtenerTipo(congestion.tipo)] =- 1;
}

obtenerTipo = function (valor){
    switch(valor) {
        case valor < 10:
            this.congestion = "sin";
            break;
        case valor >= 10 && valor < 30:
            this.congestion = "leve";
            break;
        case valor >= 30  && valor < 50:
            this.congestion = "media";
            break;
        case valor >= 50 && valor < 75:
            this.congestion = "alta";
            break;
        case valor >= 75 && valor < 100:
            this.congestion = "muy";
            break;
    };
};