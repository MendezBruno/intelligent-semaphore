(function() {

    function NodoEntrada(idNum, posx, posy,radio,color) {
        this.Container_constructor();

        this.idNum = idNum;
        this.color = color;
        this.posx = posx;
        this.posy = posy;
        this.radio = radio;

        this.setup();
    }
    var p = createjs.extend(NodoEntrada, createjs.Container);

    //VARIABLES GLOBALES DEL CONSTRUCTOR
    var background;
    var ROJO="#ff3333";
    var VERDE="#66ff66";

    //METODOS DEL CONSTRUCTOR
    p.setup = function() {
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
        //var child = holder.getChildAt(event.id);
        if (this.color == ROJO) { this.cambiarColor(event.currentTarget.children[0],VERDE)}
        else {
            if (this.color == VERDE) { this.cambiarColor(event.currentTarget.children[0],ROJO)}
        }
        console.log(event.currentTarget.children[0]);

    } ;
    p.handleRollOver = function(event) {
        this.alpha = event.type == "rollover" ? 0.4 : 1;
    };

    p.cambiarColor = function(child,color){
        child.graphics.clear().beginFill(color).drawCircle(this.posx,this.posy,this.radio);
        this.color= color;

    }
    window.NodoEntrada = createjs.promote(NodoEntrada, "Container");
}());/**
 * Created by bruno on 28/07/16.
 */
