/**
 * Created by bruno on 28/07/16.
 */
app.factory('logica', function () {
    return {
        crearGrilla: function (fila, columna, largo, stage) {
            var i;
            var j;
            var posIniialX = 20;
            var posx = posIniialX;
            var posy = largo;
            var separador = 20;
            var ENTRADA = "#66ff66";
            var SALIDA = "#ff3333"

            console.log("entre aca");
            for (i = 0; i < fila; i++) {
                posx = posIniialX;
                for (j = 0; j < columna + 1; j++) {
                    stage.addChild(new Cuadra(i, posx, posy, largo, "#b3b3b3", true));
                    stage.addChild(new NodoEntrada(i, posx - separador / 2, posy + separador / 2, separador / 2, ENTRADA));
                    posx = posx + largo + separador;
                }
                stage.addChild(new NodoEntrada(i, posx - separador / 2, posy + separador / 2, separador / 2, ENTRADA));
                posy = posy + largo + separador;
            }
            ;

            posx = largo + posIniialX;
            posy = 0;
            for (i = 0; i < fila + 1; i++) {

                for (j = 0; j < columna; j++) {
                    stage.addChild(new Cuadra(j, posx, posy, largo, "#b3b3b3", false));
                    posx = posx + largo + separador;
                }
                posy = posy + largo + separador;
                posx = largo + posIniialX;
            }
        },


             modificarGrilla: function(fila, columna, ancho, stage) {
                stage.removeAllChildren();
                this.crearGrilla(fila, columna, ancho, stage);
            },



    };
});