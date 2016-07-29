(function() {

    function NodoEntrada(posx, posy,radio,color) {
        this.Container_constructor();

        this.color = color;
        this.posx = posx;
        this.posy = posy;
        this.radio = radio;

        this.setup();
    }
    var p = createjs.extend(NodoEntrada, createjs.Container);
    var background;
    var ROJO="#ff3333";
    var VERDE="#66ff66";

    p.setup = function() {

        var g = new createjs.Graphics();


        background = new createjs.Shape();
        background.graphics.beginFill(this.color).drawCircle(this.posx,this.posy,this.radio);



        this.addChild(background);
        this.on("click", this.handleClick);
        this.on("rollover", this.handleRollOver);
        this.on("rollout", this.handleRollOver);
        this.cursor = "pointer";

        this.mouseChildren = false;

        this.offset = Math.random()*10;
        this.count = 0;
    } ;

    p.handleClick = function (event) {
        if (this.color == ROJO) { this.cambiarColor(VERDE)}
        else {
            if (this.color == VERDE) { this.cambiarColor(ROJO)}
        }

    } ;
    p.handleRollOver = function(event) {
        this.alpha = event.type == "rollover" ? 0.4 : 1;
    };

    p.cambiarColor = function(color){
        background.graphics.clear().beginFill(color).drawCircle(this.posx,this.posy,this.radio);
        this.color= color;
    }
    window.NodoEntrada = createjs.promote(NodoEntrada, "Container");
}());/**
 * Created by bruno on 28/07/16.
 */
