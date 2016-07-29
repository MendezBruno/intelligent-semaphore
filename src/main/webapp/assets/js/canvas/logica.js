/**
 * Created by bruno on 28/07/16.
 */
(function()  {

    var stage;
    var circle;
    var btn1;
    var holder;
    var image;
    var container;
    var grilla;
    var nodo;
    var nodoEntrada;
    var nodoControl;

    function init() {
        stage = new createjs.Stage("demoCanvas");
        stage.enableMouseOver();


        btn1 = stage.addChild(new Boton("Hello!", "#F00", 60));
        btn1.y = 20;

        btn1 = stage.addChild(new Cuadra("cuadra1", 0, 0, 200, "#F00", true));

//
//            circle = new createjs.Shape();
//            circle.graphics.beginFill("red").drawCircle(0, 0, 50);
//            circle.x = 150;
//            circle.y = 100;
//            var fillCommand = circle.graphics.beginFill("blue").command;
//            // ... later, update the fill style/color:
//            fillCommand.color = "blue";
//            circle.append(fillCommand);

        stage.addChild(circle);


//
        createjs.Ticker.on("tick", stage);
//            circle.addEventListener("click",presion);


//
//            container = new createjs.Container();
//            container.addChild(circle, btn1);
//            container.x = 100;
//
//            stage.addChild(container);

//            grilla = new Grilla(3,3,40);
//            stage.addChild(grilla);

        crearGrilla(3, 4, 50, stage);

//            btn1 = stage.addChild(new NodoEntrada(100,100,40,"#66ff66"));


    }

    function presion(event) {
        circle.x = 200;
        stage.update(event);
    };


    function crearGrilla(fila, columna, largo, stage) {
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
        };

    }
}());