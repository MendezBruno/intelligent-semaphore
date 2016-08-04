/**
 * Created by bruno on 28/07/16.
 */
app.factory('logica', function () {
    return {
        cuadraSeleccionada:undefined,

        crearGrilla: function (filas, columnas, largo, stage, $scope) {
            //VARIABLES LOCALES
            var id=1;
            var posInicialX = 20;
            var posInicialY = 20;
            var posx = posInicialX;
            var posy = largo+posInicialY;
            var separador = 20;
            //CONSTANTES
            var ENTRADA = "#66ff66";
            var SALIDA = "#ff3333";
            var NEUTRAL = "#ffffff";
            var PRIMER_COLUMNA = 1;
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

                posx = posInicialX;
                var calleHorizontal = new CalleHorizontal();
                calleHorizontal.nodoDerecho = stage.addChild(new CnvNodoBorde(i+2,PRIMER_COLUMNA,posx-separador/2,posy+separador/2,separador/2,ENTRADA));


                for (j = 0; j < columnas + 1; j++) {

                    var cuadra = new CnvCuadra(id, posx, posy, largo, "#b3b3b3", true);
                    cuadra.clickListeners.push(onClick);
                    stage.addChild(cuadra);
                    id++;
                    posx = posx + largo + separador;
                    if(columnas+1 != j){stage.addChild(new NodoControl(i+1,j+1,posx-separador/2,posy+separador/2,separador/2,NEUTRAL));};

                }

                var salida = new CnvNodoBorde(i+2,j+1, posx - separador / 2, posy + separador / 2, separador / 2, SALIDA);
                stage.addChild(salida);
                posy = posy + largo + separador;
                new CnvCalleHorizontal(entrada,salida);

            };

            //ARMO LAS CALLES VERTICALES
            posx = largo + posInicialX;
            posy=posInicialY;
            for (i = 0; i < filas + 1; i++) {

                for (j = 0; j < columnas; j++) {
                    var cuadra = new CnvCuadra(id, posx, posy, largo, "#b3b3b3", false);
                    cuadra.clickListeners.push(onClick);
                    stage.addChild(cuadra);

                    if(0 == i){
                        entrada = new CnvNodoBorde(i+1,j,posx+separador/2,posy-separador/2,separador/2,ENTRADA);
                        stage.addChild(entrada);
                        listaCalleEntrada.push(entrada);
                    };
                    if(filas == i){
                        salida = new CnvNodoBorde(i+1,j,posx+separador/2,posy+largo+separador/2,separador/2,SALIDA);
                        stage.addChild(salida);
                        listaCalleSalida.push(salida);

                    };
                    posx = posx + largo + separador;
                    id++;
                }
                posy = posy + largo + separador;
                posx = largo + posInicialX;

            }

            function crearCalleVerticales(listaCalleEntrada, ListaCalleSalida){
                while(listaCalleEntrada.length) {new CnvCalleVertical(listaCalleEntrada.pop(),ListaCalleSalida.pop())};
            }

            crearCalleVerticales(listaCalleEntrada,listaCalleSalida);


            function iniciarCalle (){

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