/**
 * Created by Ezequiel on 03/08/2016.
 */
function Cuadra() {
    this.longitud = 100;
    this.id = Cuadra.getNextId();
    //this.congestion = {
    //    tipo: "sin",
    //    valor: 0,
    //}
    this.congestionTipo="SIN_CONGESTION";
    this.congestionValor=0;
    var self = this;
}
Cuadra.nextId = 1;

Cuadra.getNextId = function() {
    var next = Cuadra.nextId;
    Cuadra.nextId++;
    return "cuadra-"+next;
}

Cuadra.prototype.sumarValorDeCongestion = function (dicDatos){

    dicDatos[this.congestionTipo] += 1;
};

Cuadra.prototype.restarValorActual = function (dicDatos){

    if (dicDatos[this.congestionTipo] != 0 ) dicDatos[this.congestionTipo] -= 1;
};

Cuadra.prototype.actualizarTipo = function (){
    var tipo = obtenerTipo(this.congestionValor);
    this.congestionTipo = tipo;
};

//TODO sacar esta negrada
obtenerTipo = function (valor){

   if (valor < 10) {
       return "sin"
   }else {
       if((valor >= 10 &&  valor < 30)){
           return "leve";
       }else{
           if( (valor >= 30  && valor < 50)) {
               return "media";
           }else{
               if(valor >= 50 && valor < 75){
                   return "alta";
               }else{
                   return "muy";
               }
           }
       }
   }
};