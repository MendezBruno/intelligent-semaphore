/**
 * Created by bruno on 11/08/16.
 */
function ReproductorController(modelo, stage, $scope){

    this.modelo = modelo;
    this.largo = 50;        //*TODO* sacar el largo de la calle como dato general
    this.stage = stage;

}


ReproductorController.prototype.dibujar = function (){

    var self = this;
    var posInicialX = 20;   //en un futuro se podria parametrizar
    var posInicialY = 20;   //en un futuro se podria parametrizar
    var posx = posInicialX;
    var posy = this.largo+posInicialY;
    var separador = 20;
    //CONSTANTES
    var ENTRADA = "#66ff66";
    var SALIDA = "#ff3333";
    var NEUTRAL = "#ffffff";
    var PRIMERA_FILA = 0;
    var PRIMER_COLUMNA = 0;
    var HORIZONTAL = true;
    var VERTICAL = false;


    var horizontales = this.modelo.callesHorizontales;
    var verticales = this.modelo.callesVerticales;
    for (i=0; i<horizontales.length; i++) {
        moverPosxAlOrigen();


        for (j = 0; j < verticales.length + 1; j++) {
            var cnvCuadraReproductor = generarCuadra(HORIZONTAL,horizontales[i].cantCarriles);
            actualizarPosX(verticales[j].cantCarriles);
            if(verticales.length != j){
                generarCnvInterseccion(horizontales[i].cantCarriles,verticales[j].cantCarriles);
            }
        }
        actualizarPosY(horizontales[i].cantCarriles);
    }

    moverPosxAlOrigen();
    moverPosyAlOrigen();
    posx=posx + largo;
    for (i = 0; i < verticales.length; i++) {
        for (j = 0; j < horizontales.length+1; j++) {
            // actualizarPosY();
            //posx=posx + this.largo;
            var cnvCuadra = generarCuadra(VERTICAL,verticales[i].cantCarriles);
            actualizarPosY(horizontales[j].cantCarriles);
        }
        actualizarPosX(verticales[i].cantCarriles);
    }



        function generarCnvInterseccion(cantCarrilesH,cantCarrilesV) {
            var interseccion = new CnvInterseccion(posx,posv,cantCarrilesH,cantCarrilesV);
            stage.addChild(interseccion);
        }

        function generarCuadra(direccion,cantCarriles){
            var cuadra = new CnvCuadraReproductor(posx,posy,this.largo,cantCarriles,"#b3b3b3",direccion)
            stage.addChild(cuadra);
            id++;
            return cuadra;
        }

        function actualizarPosX(cantCarriles){
            posx = posx + largo + separador*cantCarriles;
        }

        function actualizarPosY(cantCarriles){
            posy = posy + largo + separador*cantCarriles;
        }

        function moverPosxAlOrigen(){
            posx = largo + posInicialX;
        }

        function moverPosyAlOrigen(){
            posy = posInicialY;
        }



};
