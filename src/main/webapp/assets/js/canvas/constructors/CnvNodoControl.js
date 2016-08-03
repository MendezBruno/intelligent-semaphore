/**
 * Created by bruno on 28/07/16.
 */
(function() {

    function CnvNodoControl(fila,columna,posx, posy,radio,color) {
        this.Container_constructor();

        this.fila = fila;
        this.columna = columna;
        this.color = color;
        this.posx = posx;
        this.posy = posy;
        this.radio = radio;

        this.setup();
    }
    var p = createjs.extend(CnvNodoControl, createjs.Container);

    //VARIABLES GLOBALES DEL CONSTRUCTOR
    var background;
    var BLANCO="#ffffff";
    var AMARILLO="#ffff80";

    p.setup = function() {
        background = new createjs.Shape();
        background.graphics.beginFill(this.color).beginStroke("#000000").setStrokeStyle(1).drawCircle(this.posx,this.posy,this.radio);

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
        if (this.color == BLANCO) { this.cambiarColor(event.currentTarget.children[0],AMARILLO)}
        else {
            if (this.color == AMARILLO) { this.cambiarColor(event.currentTarget.children[0],BLANCO)}
        }
        console.log(event.currentTarget.children[0]);
    } ;
    p.handleRollOver = function(event) {
        this.alpha = event.type == "rollover" ? 0.4 : 1;
    };

    p.cambiarColor = function(child,color){
        child.graphics.clear().beginFill(color).beginStroke("#000000").setStrokeStyle(1).drawCircle(this.posx,this.posy,this.radio);
        this.color= color;
    };

    window.NodoControl = createjs.promote(CnvNodoControl, "Container");
}());