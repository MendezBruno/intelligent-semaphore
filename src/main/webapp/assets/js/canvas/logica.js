/**
 * Created by bruno on 28/07/16.
 */
app.factory('logica', function () {
    return {
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

            for (i = 0; i < fila; i++) {
                posx = posInicialX;
                stage.addChild(new NodoEntrada(i+2,j+1,posx-separador/2,posy+separador/2,separador/2,ENTRADA));
                for (j = 0; j < columna + 1; j++) {
                    stage.addChild(new Cuadra(id, posx, posy, largo, "#b3b3b3", true));
                    id++;
                    posx = posx + largo + separador;
                    if(columna+1 != j){stage.addChild(new NodoControl(i+1,j+1,posx-separador/2,posy+separador/2,separador/2,NEUTRAL));};
                }
                stage.addChild(new NodoEntrada(i+2,j+1, posx - separador / 2, posy + separador / 2, separador / 2, SALIDA));
                posy = posy + largo + separador;
            };

            posx = largo + posInicialX;
            posy=posInicialY;
            for (i = 0; i < fila + 1; i++) {

                for (j = 0; j < columna; j++) {
                    stage.addChild(new Cuadra(j, posx, posy, largo, "#b3b3b3", false));
                    if(0 == i){stage.addChild(new NodoEntrada(i+1,j,posx+separador/2,posy-separador/2,separador/2,ENTRADA));};
                    if(fila == i){stage.addChild(new NodoEntrada(i+1,j,posx+separador/2,posy+largo+separador/2,separador/2,SALIDA));};
                    posx = posx + largo + separador;
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