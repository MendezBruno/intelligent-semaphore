/**
 * Created by bruno on 11/08/16.
 */

//ReproductorController.prototype.largo = 300;
//ReproductorController.prototype.ancho = 20;
//ReproductorController.prototype.separador = 20;

function ReproductorController(modelo, stage, $scope){
    this.modelo = modelo;
    this.auxCnvModel = {};
    this.stage = stage;
}

ReproductorController.prototype.dibujar = function (){
    var self = this;
    var stage = self.stage;
    var auxCnvModel = self.auxCnvModel;
    var posInicialY = 0;   //en un futuro se podria parametrizar
    var posInicialX = 0;   //en un futuro se podria parametrizar
    var largo = CnvManzana.largo;
    var ancho = Carril.ancho;
    var posx = posInicialX;
    var posy = largo+posInicialY;
    var separador = 20;
    var modelo = this.modelo;
    var sla = 4;   //Separacino de la linea amarilla
    var ala = ancho/6    //ancho linea amarilla es una sexta parte del ancho de la calle
    var nodos = [];

    //CONSTANTES
    var ENTRADA = "#66ff66";
    var SALIDA = "#ff3333";
    var NEUTRAL = "#ffffff";
    var PRIMERA_FILA = 0;
    var PRIMER_COLUMNA = 0;
    var HORIZONTAL = true;
    var VERTICAL = false;

    console.log(this.modelo);
    var horizontales = this.modelo.callesHorizontales;
    var verticales = this.modelo.callesVerticales;
    for (var i=0; i < horizontales.length; i++) {
        var calle = horizontales[i];
        var cantCarriles = calle.cantCarriles;
        var cuadras = calle.cuadras;
        nodos.push([])
        moverPosxAlOrigen();
        for (var j = 0; j < cuadras.length; j++) {
            var cnvCuadraReproductor = generarCuadra(HORIZONTAL,calle);
            stage.addChild(cnvCuadraReproductor);
            auxCnvModel [cuadras[j].id] = cnvCuadraReproductor;
            if(j!=cuadras.length-1){
                var cantCarrilesV = verticales[j].cantCarriles;
                var semaforo = modelo.nodosSemaforo.find(function(unSemaforo)
                    {
                      return cuadras[j].nodoDestino == unSemaforo.id;
                    });
                var cnvInterseccion = new CnvInterseccion(posx+largo ,posy ,cantCarriles,cantCarrilesV,semaforo != undefined);
                stage.addChild(cnvInterseccion);
                if (semaforo) {auxCnvModel [semaforo.id] = cnvInterseccion};
                actualizarPosX(cantCarrilesV);
                //(posx-ala- separador*cantCarrilesV)
                //- (separador*cantCarriles +ala)
                //-(separador*verticales[j].cantCarriles +ala)
                nodos[i][j]=cnvInterseccion;
            }
        }
        actualizarPosY(cantCarriles);
    }
    stage.canvas.width = posx + largo;

    moverPosxAlOrigen();
    moverPosyAlOrigen();
    posx=posx + largo;
    for (var i = 0; i < verticales.length; i++) {
        var calle = verticales[i];
        var cantCarriles = calle.cantCarriles;
        var cuadras = calle.cuadras;
        moverPosyAlOrigen();
        for (var j = 0; j < cuadras.length; j++) {
            var cnvCuadraReproductor = generarCuadra(VERTICAL,calle);
            stage.addChild(cnvCuadraReproductor);
            auxCnvModel [cuadras[j].id] = cnvCuadraReproductor;
            if(j!=cuadras.length-1)
                actualizarPosY(horizontales[j].cantCarriles);
        }
        actualizarPosX(cantCarriles);
    }
    stage.canvas.height = posy + largo;

    //Dibujar manzanas
    posx = posInicialX;
    posy = posInicialY;
    for (var i=0; i<horizontales.length+1; i++) {
        var calle = horizontales[i];
        for (var j=0; j<verticales.length+1; j++) {
            var cnvManzana = new CnvManzana(posx,posy);
            stage.addChild(cnvManzana);
            var cv = verticales[j];
            if (cv) {
                posx += CnvManzana.largo + cv.cantCarriles * ancho;
                auxCnvModel [ cv.cuadras[i].id ].cnvManzana = cnvManzana;
            } else {
                posx = posInicialX;
            }
            if (calle) {
                auxCnvModel [ calle.cuadras[j].id ].cnvManzana = cnvManzana;
            }
        }
        if (calle) {
            posy += CnvManzana.largo + calle.cantCarriles * ancho;
        }
    }

    //Vincular nodos con cuadras aledañas
    for(var i=0; i<nodos.length; i++) {
        for(var j=0; j<nodos[i].length; j++) {
            var nodo = nodos[i][j];
            nodo.izquierda = auxCnvModel[horizontales[i].cuadras[j].id];
            nodo.derecha = auxCnvModel[horizontales[i].cuadras[j+1].id];
            nodo.arriba = auxCnvModel[verticales[j].cuadras[i].id];
            nodo.abajo = auxCnvModel[verticales[j].cuadras[i+1].id];
            nodo.init();
        }
    }

    function generarCnvInterseccion(cantCarrilesH,cantCarrilesV) {
        var interseccion = new CnvInterseccion(posx,posy,cantCarrilesH,cantCarrilesV);
        stage.addChild(interseccion);
    }

    function generarCuadra(direccion,calle){
        return new CnvCuadraReproductor(posx,posy,largo,calle,direccion);
    }

    function actualizarPosX(cantCarriles){
        posx = posx + largo + separador*cantCarriles;
    }

    function actualizarPosY(cantCarriles){
        posy = posy + largo + separador*cantCarriles;
    }

    function moverPosxAlOrigen(){
        posx = posInicialX;
    }

    function moverPosyAlOrigen(){
        posy = posInicialY;
    }
};

ReproductorController.prototype.actualizar = function (datos){

    var self = this;
    var auxCnvModel = this.auxCnvModel;
    console.log(this.auxCnvModel);
    console.log(self);
    console.log(auxCnvModel);

    var blockStatus = datos.blockStatus;
    var semaphoreStatus = datos.semaphoreStatus;
    if (blockStatus) blockStatus.forEach(actualizarCuadra);
    if (semaphoreStatus) semaphoreStatus.forEach(actualizarSemaforo);

    function actualizarCuadra(datosCuadra){
        self.auxCnvModel[datosCuadra.id].cambiarColor(datosCuadra.color);
        //var cuadra = modelo.cuadraPorID(datosCuadra.id);
        //cuadra.cuadraCnv.cambiarColor(datosCuadra.color);
        //cuadra.stock = datosCuadra.stock; no se hizo nada con este dato aun, es para probar el panel de referencia
    }
    //
    function actualizarSemaforo(datosSemaforo){
       var estado =  datosSemaforo.status;
       var semaforo = self.auxCnvModel[datosSemaforo.id].cnvSemaforo;

        if(estado=="HORIZONTAL") {
            semaforo.verdeH();
        }else{
            semaforo.verdeV();
        }

    }
};


