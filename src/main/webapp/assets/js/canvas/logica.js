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

                for (j = 0; j < columnas + 1; j++) {
                    generarCuadra(HORIZONTAL);
                    actualizarPosX();
                    if(columnas+1 != j){stage.addChild(new NodoControl(i+1,j+1,posx-separador/2,posy+separador/2,separador/2,NEUTRAL));};
                }

                var salida = stage.addChild(new CnvNodoBorde(i+2,j+1, posx - separador / 2, posy + separador / 2, separador / 2, SALIDA));
                actualizarPosY();
                new CnvCalleHorizontal(entrada,salida);
            };

            //ARMO LAS CALLES VERTICALES
            moverPosxAlOrigen();
            posx=posx + largo;
            moverPosyAlOrigen();
            for (i = 0; i < filas + 1; i++) {

                for (j = 0; j < columnas; j++) {
                    generarCuadra(VERTICAL);
                    if(0 == i){ listaCalleEntrada.push(stage.addChild(new CnvNodoBorde(i+1,j,posx+separador/2,posy-separador/2,separador/2,ENTRADA)));}
                    if(filas == i){listaCalleSalida.push(stage.addChild(new CnvNodoBorde(i+1,j,posx+separador/2,posy+largo+separador/2,separador/2,SALIDA)));}
                    actualizarPosX();
                }
                actualizarPosY();
                moverPosxAlOrigen();
                posx=posx + largo;

            }


            function crearCalleVerticales(listaCalleEntrada, ListaCalleSalida){
                while(listaCalleEntrada.length) {new CnvCalleVertical(listaCalleEntrada.pop(),ListaCalleSalida.pop())};
            }

            crearCalleVerticales(listaCalleEntrada,listaCalleSalida);

            function generarCuadra(direccion){
                var cuadra = new CnvCuadra(id, posx, posy, largo, "#b3b3b3", direccion);
                cuadra.clickListeners.push(onClick);
                cuadras.push(cuadra);
                stage.addChild(cuadra);
                id++;
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