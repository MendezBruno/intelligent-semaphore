/**
 * Created by bruno on 11/08/16.
 */

//ReproductorController.prototype.largo = 300;
//ReproductorController.prototype.ancho = 20;
//ReproductorController.prototype.separador = 20;

function ReproductorController(modelo, stage, $scope){

    this.modelo = modelo;
    this.auxCnvModel = {};
    this.largo = 300;        //*TODO* sacar el largo de la calle como dato general
    this.ancho = 20;         //*TODO* ver tambien la posibilidad que sea un dato general
    this.stage = stage;

}

ReproductorController.prototype.dibujar = function (){

    var self = this;
    var stage = self.stage;
    var auxCnvModel = self.auxCnvModel;
    var posInicialX = 0;   //en un futuro se podria parametrizar
    var posInicialY = 0;   //en un futuro se podria parametrizar
    var posx = posInicialX;
    var posy = this.largo+posInicialY;
    var separador = 20;
    var largo = this.largo;
    var ancho = this.ancho;
    var modelo = this.modelo;
    var sla = 4;   //Separacino de la linea amarilla
    var ala = ancho/6    //ancho linea amarilla es una sexta parte del ancho de la calle

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
        moverPosxAlOrigen();
        for (var j = 0; j < cuadras.length; j++) {
            var cnvCuadraReproductor = generarCuadra(HORIZONTAL,cantCarriles);
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
            var cnvCuadraReproductor = generarCuadra(VERTICAL,cantCarriles);
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
        for (var j=0; j<verticales.length+1; j++) {
            stage.addChild(new CnvManzana(posx,posy));
            var cv = verticales[j];
            if (cv) {
                posx += CnvManzana.largo + cv.cantCarriles * Carril.ancho;
            } else {
                posx = posInicialX;
            }
        }
        var calle = horizontales[i];
        if (calle) {
            posy += CnvManzana.largo + calle.cantCarriles * Carril.ancho;
        }
    }

    function generarCnvInterseccion(cantCarrilesH,cantCarrilesV) {
        var interseccion = new CnvInterseccion(posx,posy,cantCarrilesH,cantCarrilesV);
        stage.addChild(interseccion);
    }

    function generarCuadra(direccion,cantCarriles){
        return new CnvCuadraReproductor(posx,posy,largo,cantCarriles,direccion);
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

datos.blockStatus.forEach(actualizarCuadra);
 //datos.semaphoreStatus.forEach(actualizarSemaforo);
    console.log(this.auxCnvModel);
    var auxCnvModel = this.auxCnvModel;
    var self = this;
    console.log(self);
    console.log(auxCnvModel);
    function actualizarCuadra(datosCuadra){
        self.auxCnvModel[datosCuadra.id].cambiarColor(datosCuadra.color);
        //var cuadra = modelo.cuadraPorID(datosCuadra.id);
        //cuadra.cuadraCnv.cambiarColor(datosCuadra.color);
        //cuadra.stock = datosCuadra.stock; no se hizo nada con este dato aun, es para probar el panel de referencia
    }
    //
    //function actualizarSemaforo(datosSemaforo){
    //    var semaforo = modelo.nodoSemaforoPorID(datosSemaforo.id);
    //    semaforo.semaforoCnv.cambiar();
    //}
};


