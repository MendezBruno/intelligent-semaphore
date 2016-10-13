/**
 * Created by bruno on 11/08/16.
 */

//ReproductorController.prototype.largo = 300;
//ReproductorController.prototype.ancho = 20;
//ReproductorController.prototype.separador = 20;

function ReproductorController(modelo, stage, $scope, $timeout){
    this.modelo = modelo;
    this.auxCnvModel = {};
    this.stage = stage;
    this.$scope = $scope;
    this.cuadraFueSeleccionada;
    this.semaforoSeleccionado;
    this.semaforoEstadoActual;
    this.blockStatus;
    this.timeout = $timeout;
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

    var onClickCuadraReproductor = function (cnvCuadraReproductor) {

        self.cuadraFueSeleccionada = cnvCuadraReproductor;
        self.actualizarValorCalle();

    };
    var onClickSemaforoReproductor = function (cnvIntseccion) {

        self.semaforoSeleccionado=cnvIntseccion;
        self.actualizarValorSemaforo();
    };

    console.log(this.modelo);
    var horizontales = this.modelo.callesHorizontales;
    var verticales = this.modelo.callesVerticales;
    for (var i=0; i < horizontales.length; i++) {
        var calle = horizontales[i];
        calle.nombre = "Calle H-"+i;
        var cantCarriles = calle.cantCarriles;
        var cuadras = calle.cuadras;
        nodos.push([])
        moverPosxAlOrigen();
        for (var j = 0; j < cuadras.length; j++) {
            var cnvCuadraReproductor = generarCuadra(HORIZONTAL,calle,cuadras[j]);
            if(j==0)
                self.cuadraFueSeleccionada = cnvCuadraReproductor;
            cnvCuadraReproductor.clickListeners.push(onClickCuadraReproductor);
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
                if (semaforo) {
                    cnvInterseccion.clickListeners.push(onClickSemaforoReproductor);
                    auxCnvModel [semaforo.id] = cnvInterseccion;
                };
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
        calle.nombre = "Calle V-"+i;
        var cantCarriles = calle.cantCarriles;
        var cuadras = calle.cuadras;
        moverPosyAlOrigen();
        for (var j = 0; j < cuadras.length; j++) {
            var cnvCuadraReproductor = generarCuadra(VERTICAL,calle,cuadras[j]);
            cnvCuadraReproductor.clickListeners.push(onClickCuadraReproductor);
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

    function generarCuadra(direccion,calle,cuadra){
        var cnvCuadra = new CnvCuadraReproductor(posx,posy,largo,calle,direccion)
        cnvCuadra.cuadra = cuadra;
        return cnvCuadra;
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

ReproductorController.prototype.actualizarValorCalle = function (){
    var self = this;
    self.$scope.cuadraSeleccionada = self.cuadraFueSeleccionada.cuadra;
    self.$scope.calleSeleccionada = self.cuadraFueSeleccionada.calle;

    var calle = self.cuadraFueSeleccionada.calle;
    var primeraCuadra = calle.cuadras[0];
    var ultimaCuadra = calle.cuadras[calle.cuadras.length-1];

    var nodoSalida;
    var nodoEntrada = self.modelo.nodosEntrada.find(function(nodo){
        return nodo.id == primeraCuadra.nodoOrigen
    })

    if (nodoEntrada) {
        nodoSalida = self.modelo.nodosSalida.find(function(nodo){
            return nodo.id == ultimaCuadra.nodoDestino
        })
    } else {
        nodoEntrada = self.modelo.nodosEntrada.find(function(nodo){
            return nodo.id == ultimaCuadra.nodoDestino
        })
        nodoSalida = self.modelo.nodosSalida.find(function(nodo){
            return nodo.id == primeraCuadra.nodoOrigen
        })
    }

    self.$scope.nodoEntrada = nodoEntrada;
    self.$scope.nodoSalida = nodoSalida;

    self.timeout(function () {
        self.$scope.$apply();
    });
};

ReproductorController.prototype.actualizarValorSemaforo = function () {
    var self = this;

    var semaforo;

    for (var i = 0; i < this.modelo.nodosSemaforo.length; i++) {
        if (self.auxCnvModel[this.modelo.nodosSemaforo[i].id] == self.semaforoSeleccionado) {
            semaforo = this.modelo.nodosSemaforo[i].id;

        }
    }

    self.$scope.calleSemaforo = semaforo;

    var nodoSem = self.$scope.modelo.nodosSemaforo.find(function (sta) {
        return sta.id == semaforo
    });

    if (self.semaforoEstadoActual == undefined)
    {
        self.$scope.valorSema = "semaforoVertical.png"

    }

    else {

        var semsta = self.semaforoEstadoActual.find(function (sta) {
            return sta.id == semaforo
        });

        console.log(semsta);

        if (semsta.status == "VERTICAL") {

            self.$scope.valorSema = "semaforoVertical.png"

        }
        else {

            self.$scope.valorSema = "semaforoHorizontal.png"

        }
    }

    self.$scope.tiempoSemaforo = "El tiempo de verde del semaforo es:" + nodoSem.tiempoVertical
    self.$scope.$apply();
};

ReproductorController.prototype.actualizar = function (datos){

    var self = this;
    var auxCnvModel = this.auxCnvModel;
    var valorCuadra;
    console.log(this.auxCnvModel);
    console.log(self);
    console.log(auxCnvModel);

    var blockStatus = datos.blockStatus;
    var semaphoreStatus = datos.semaphoreStatus;
    if (blockStatus) {
        blockStatus.forEach(actualizarCuadra);
        self.blockStatus = blockStatus;
        valorCuadra = blockStatus.find(function(blockStatus) {
        return self.auxCnvModel[blockStatus.id] === self.cuadraFueSeleccionada;
        });
        if(valorCuadra) {
        self.$scope.stock = valorCuadra.stock;
        console.log(valorCuadra.id);
        }
    }

    if (semaphoreStatus){
        semaphoreStatus.forEach(actualizarSemaforo);

        if(self.$scope.calleSemaforo == undefined) {
            self.$scope.valorSema = "imgblanco.png";
            self.semaforoEstadoActual = semaphoreStatus;
        }

        else {
            self.semaforoEstadoActual = semaphoreStatus;

            console.log("modelo");

            console.log(self.$scope.modelo)

            var nodoSem = self.$scope.modelo.nodosSemaforo.find(function (sta) {
                return sta.id == self.$scope.calleSemaforo
            });

            var semsta = semaphoreStatus.find(function (sta) {
                return sta.id == self.$scope.calleSemaforo
            });

            if (semsta.status== "VERTICAL")
            {

                self.$scope.valorSema = "semaforoVertical.png"
                self.$scope.tiempoSemaforo = "El tiempo de verde del semaforo es:" + nodoSem.tiempoVertical

            }
            else
            {

                self.$scope.valorSema = "semaforoHorizontal.png"
                self.$scope.tiempoSemaforo = "El tiempo de verde del semaforo es:" + nodoSem.tiempoHorizontal

            }




        }



        console.log(semaphoreStatus);
        //Mariano la actualizacion del semaforo va aca dentro idem como hiciste lo de arriba en la cuadraa
    }


    function actualizarCuadra(datosCuadra){
        self.auxCnvModel[datosCuadra.id].cambiarColor(datosCuadra.color);
        self.auxCnvModel[datosCuadra.id].actualizarStock(datosCuadra.id,datosCuadra);
        //var cuadra = modelo.cuadraPorID(datosCuadra.id);
        //cuadra.cuadraCnv.cambiarColor(datosCuadra.color);
        //cuadra.stock = datosCuadra.stock; no se hizo nada con este dato aun, es para probar el panel de referencia
    }
    //
    function actualizarSemaforo(datosSemaforo){
       var estado =  datosSemaforo.status;
       var semaforo = self.auxCnvModel[datosSemaforo.id].cnvSemaforo;

       var nodoSem = self.$scope.modelo.nodosSemaforo.find(function (sta) {
           return sta.id == datosSemaforo.id
       });
       nodoSem.tiempoHorizontal = datosSemaforo.htime;
       nodoSem.tiempoVertical = datosSemaforo.vtime;

        if(estado=="HORIZONTAL") {
            semaforo.verdeH();
        }else{
            semaforo.verdeV();
        }

    }
};


