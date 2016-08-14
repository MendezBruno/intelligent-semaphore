/**
 * Created by bruno on 11/08/16.
 */
function ReproductorController(modelo, stage, $scope){

    this.modelo = modelo;
    this.largo = 300;        //*TODO* sacar el largo de la calle como dato general
    this.ancho = 20         //*TODO* ver tambien la posibilidad que sea un dato general
    this.stage = stage;

}

ReproductorController.prototype.dibujar = function (){

    var self = this;
    var stage = self.stage;
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
    for (var i=0; i<horizontales.length; i++) {
        var calle = horizontales[i];
        var cantCarriles = calle.cantCarriles;
        var cuadras = calle.cuadras;
        moverPosxAlOrigen();
        for (var j = 0; j < cuadras.length; j++) {
            stage.addChild(generarCuadra(HORIZONTAL,cantCarriles));
            if(j!=cuadras.length-1){
                var cantCarrilesV = verticales[j].cantCarriles;
                var haySemaforo = cuadras.some(function(cuadra)
                    {
                        return modelo.nodosSemaforo.some(function(semaforo)
                        {
                            return cuadra.nodoDestino.id=semaforo.id;
                        });
                    }
                );
                stage.addChild(new CnvInterseccion(posx+largo ,posy ,cantCarriles,cantCarrilesV,true));
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
            stage.addChild(generarCuadra(VERTICAL,cantCarriles));
            if(j!=cuadras.length-1)
                actualizarPosY(horizontales[j].cantCarriles);
        }
        actualizarPosX(cantCarriles);
    }
    stage.canvas.height = posy + largo;

    function generarCnvInterseccion(cantCarrilesH,cantCarrilesV) {
        var interseccion = new CnvInterseccion(posx,posy,cantCarrilesH,cantCarrilesV);
        stage.addChild(interseccion);
    }

    function generarCuadra(direccion,cantCarriles){
        return new CnvCuadraReproductor(posx,posy,largo,cantCarriles,direccion);
    }

    function actualizarPosX(cantCarriles){
        posx = posx + largo + separador*cantCarriles +ala;
    }

    function actualizarPosY(cantCarriles){
        posy = posy + largo + separador*cantCarriles +ala;
    }

    function moverPosxAlOrigen(){
        posx = posInicialX;
    }

    function moverPosyAlOrigen(){
        posy = posInicialY;
    }
};
