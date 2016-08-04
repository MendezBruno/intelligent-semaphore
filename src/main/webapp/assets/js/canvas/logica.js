/**
 * Created by bruno on 28/07/16.
 */
app.factory('logica', function () {


    return {




        cuadraSeleccionada:undefined,

        crearGrilla: function (filas, columnas, largo, stage, $scope) {
            //VARIABLES LOCALES
            var id=1;
            var posInicialX = 20;   //en un futuro se podria parametrizar
            var posInicialY = 20;   //en un futuro se podria parametrizar
            var posx = posInicialX;
            var posy = largo+posInicialY;
            var separador = 20;

            //CONSTANTES
            var ENTRADA = "#66ff66";
            var SALIDA = "#ff3333";
            var NEUTRAL = "#ffffff";
            var PRIMER_COLUMNA = 1;
            var HORIZONTAL = true;
            var VERTICAL = false;

            //LISTAS AUXILIARES
            var callesHorizontales = new Array();
            var callesVerticales = new Array();
            var binodo = new BiArray();

            var listaCalleEntrada = new Array();
            var listaCalleSalida = new Array();
            var cuadras = new Array();
            //FUNCIONES LOCALES
            var onClick = function(c){
                //console.log(c);
                //console.log(c.id);
                if(this.cuadraSeleccionada) {
                    this.cuadraSeleccionada.desmarcar();
                };
                this.cuadraSeleccionada= c;
                this.cuadraSeleccionada.marcar();
                seleccionar(this.cuadraSeleccionada,cuadra);
            };
            //CLASES DEL MODELO
            var mapaEditor = new MapaEditor();


            //CREACION DE CALLES HORIZONTALES
            for (i = 0; i < filas; i++) {
                moverPosxAlOrigen();
                var entrada = stage.addChild(new CnvNodoBorde(i+2,PRIMER_COLUMNA,posx-separador/2,posy+separador/2,separador/2,ENTRADA));
                var cuadras = new Array();

                for (j = 0; j < columnas + 1; j++) {
                    cuadras.push(generarCuadra(HORIZONTAL));
                    actualizarPosX();
                    if(columnas+1 != j){
                        var nodoCentral = new CnvNodoControl( i+1, j+1, posx - separador / 2, posy + separador / 2, separador / 2, NEUTRAL);
                        stage.addChild(nodoCentral);
                        binodo.push(i+1,j+1,nodoCentral);
                    }
                }

                var salida = stage.addChild(new CnvNodoBorde( i+2, j+1, posx - separador / 2, posy + separador / 2, separador / 2, SALIDA));
                actualizarPosY();
                var cnvCalleHorizontal = new CnvCalleHorizontal(entrada,salida);
                callesHorizontales.push(cnvCalleHorizontal);
                cnvCalleHorizontal.cuadras = cuadras;
            };

            //ARMO LAS CALLES VERTICALES
            moverPosxAlOrigen();
            moverPosyAlOrigen();
            posx=posx + largo;
            for (i = 0; i < columnas; i++) {
                var entrada = new CnvNodoBorde(1,i+1,posx+separador/2,posy-separador/2,separador/2,ENTRADA);
                stage.addChild(entrada);
                var cuadras = new Array();

                for (j = 0; j < filas+1; j++) {
                    cuadras.push(generarCuadra(VERTICAL));
                    actualizarPosY();
                }
                var salida = new CnvNodoBorde(j,i+1,posx+separador/2,posy+largo+separador/2,separador/2,SALIDA);
                stage.addChild(salida);
                listaCalleSalida.push(salida);
                actualizarPosX();
                moverPosyAlOrigen();
                //posx=posx + largo;
                var cnvCalleVertical = new CnvCalleVertical(entrada,salida);
                cnvCalleVertical.cuadras = cuadras;

            }

            //CONJUNTOS DE FUNCIONES
            //function crearCalleVerticales(listaCalleEntrada, ListaCalleSalida){
            //    while(listaCalleEntrada.length) {
            //       var cnvCalleVertical = new CnvCalleVertical(listaCalleEntrada.pop(),ListaCalleSalida.pop());
            //
            //    }
            //}
            //
            //crearCalleVerticales(listaCalleEntrada,listaCalleSalida);

            function generarCuadra(direccion){
                var cuadra = new CnvCuadra(id, posx, posy, largo, "#b3b3b3", direccion);
                cuadra.clickListeners.push(onClick);
                cuadras.push(cuadra);
                stage.addChild(cuadra);
                id++;
                return cuadra;
            }

            function actualizarPosX(){
                posx = posx + largo + separador;
            }

            function actualizarPosY(){
                posy = posy + largo + separador;
            }

            function moverPosxAlOrigen(){
                posx = largo + posInicialX;
            }

            function moverPosyAlOrigen(){
                posy = posInicialY;
            }

            function seleccionar(cuadra) {
                $scope.cuadra = cuadra;
                $scope.calle = cuadra.calle;
            }


        },


             modificarGrilla: function(filas, columnas, ancho, stage) {
                stage.removeAllChildren();
                this.crearGrilla(filas, columnas, ancho, stage);
            },



    };
});


function BiArray (){
}

BiArray.prototype.push = function(x,y,elem){};