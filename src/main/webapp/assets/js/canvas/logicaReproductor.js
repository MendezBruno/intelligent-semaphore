/**
 * Created by bruno on 11/08/16.
 */
function ReproductorController(modelo, stage, $scope){

    this.modelo = modelo;
    this.largo = 50;        //*TODO* sacar el largo de la calle como dato general
    this.ancho = 20         //*TODO* ver tambien la posibilidad que sea un dato general
    this.stage = stage;

}

ReproductorController.prototype.dibujar = function (){

    var self = this;
    var stage = self.stage;
    var posInicialX = 20;   //en un futuro se podria parametrizar
    var posInicialY = 20;   //en un futuro se podria parametrizar
    var posx = posInicialX;
    var posy = this.largo+posInicialY;
    var separador = 20;
    var largo = this.largo;
    var ancho = this.ancho;
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
        moverPosxAlOrigen();
        for (var  j = 0; j < verticales.length; j++) {
            //generarCuadra(HORIZONTAL,horizontales[i].cantCarriles);
            this.stage.addChild(new CnvCuadraReproductor(posx,posy,largo,horizontales[i].cantCarriles,"#b3b3b3",HORIZONTAL));
            actualizarPosX(verticales[j].cantCarriles);
            //if(verticales.length != j){
            //    this.stage.addChild(new CnvInterseccion(posx-largo/2,posy,horizontales[i].cantCarriles,verticales[j].cantCarriles));
            //    generarCnvInterseccion(horizontales[i].cantCarriles,verticales[j].cantCarriles);
            //}
        }
        this.stage.addChild(new CnvCuadraReproductor(posx,posy,largo,horizontales[i].cantCarriles,"#b3b3b3",HORIZONTAL));
        actualizarPosY(horizontales[i].cantCarriles);
    }

    moverPosxAlOrigen();
    moverPosyAlOrigen();
    posx=posx + largo;
    for (var i = 0; i < verticales.length; i++) {
        moverPosyAlOrigen();
        for (var j = 0; j < horizontales.length; j++) {
            // actualizarPosY();
            //posx=posx + this.largo;
            stage.addChild(new CnvCuadraReproductor(posx,posy,largo,verticales[i].cantCarriles,"#b3b3b3",VERTICAL));
            //var cnvCuadra = generarCuadra(VERTICAL,verticales[i].cantCarriles);
            actualizarPosY(horizontales[j].cantCarriles);
        }
        actualizarPosX(verticales[i].cantCarriles);
    }



        function generarCnvInterseccion(cantCarrilesH,cantCarrilesV) {
            var interseccion = new CnvInterseccion(posx,posy,cantCarrilesH,cantCarrilesV);
            stage.addChild(interseccion);
        }

        function generarCuadra(direccion,cantCarriles){
            stage.addChild(new CnvCuadraReproductor(posx,posy,largo,cantCarriles,"#b3b3b3",direccion));
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
