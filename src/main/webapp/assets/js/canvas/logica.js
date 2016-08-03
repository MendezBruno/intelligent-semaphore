/**
 * Created by bruno on 28/07/16.
 */
app.factory('logica', function () {
    return {
        cuadraSeleccionada:undefined,

        crearGrilla: function (fila, columna, largo, stage) {
            var i;
            var j=0;
            var id=1;
            var posInicialX = 20;
            var posInicialY = 20;
            var posx = posInicialX;
            var posy = largo+posInicialY;
            var separador = 20;
            var ENTRADA = "#66ff66";
            var SALIDA = "#ff3333";
            var NEUTRAL = "#ffffff";
            var onClick = function(c){
                //console.log(c);
                //console.log(c.id);
                if(this.cuadraSeleccionada) {
                    this.cuadraSeleccionada.desmarcar();
                };
                this.cuadraSeleccionada= c;
                this.cuadraSeleccionada.marcar();
            };


            for (i = 0; i < fila; i++) {
                posx = posInicialX;
                var entrada = new NodoBorde(i+2,j+1,posx-separador/2,posy+separador/2,separador/2,ENTRADA);
                stage.addChild(entrada);
                for (j = 0; j < columna + 1; j++) {
                    var cuadra = new Cuadra(id, posx, posy, largo, "#b3b3b3", true);
                    cuadra.clickListeners.push(onClick);
                    stage.addChild(cuadra);
                    id++;
                    posx = posx + largo + separador;
                    if(columna+1 != j){stage.addChild(new NodoControl(i+1,j+1,posx-separador/2,posy+separador/2,separador/2,NEUTRAL));};
                }
                var salida = new NodoBorde(i+2,j+1, posx - separador / 2, posy + separador / 2, separador / 2, SALIDA);
                stage.addChild(salida);
                posy = posy + largo + separador;
                stage.addChild(new CnvCalleHorizontal(entrada,salida));
            };

            posx = largo + posInicialX;
            posy=posInicialY;
            for (i = 0; i < fila + 1; i++) {

                for (j = 0; j < columna; j++) {
                    var cuadra = new Cuadra(id, posx, posy, largo, "#b3b3b3", false);
                    cuadra.clickListeners.push(onClick);
                    stage.addChild(cuadra);
                    if(0 == i){
                        var entrada = new NodoBorde(i+1,j,posx+separador/2,posy-separador/2,separador/2,ENTRADA);
                        stage.addChild(entrada);
                    };
                    if(fila == i){
                        var salida = new NodoBorde(i+1,j,posx+separador/2,posy+largo+separador/2,separador/2,SALIDA);
                        stage.addChild(salida);
                    };
                    posx = posx + largo + separador;
                    id++;
                }
                posy = posy + largo + separador;
                posx = largo + posInicialX;

            }
        },


             modificarGrilla: function(fila, columna, ancho, stage) {
                stage.removeAllChildren();
                this.crearGrilla(fila, columna, ancho, stage);
            },



    };
});