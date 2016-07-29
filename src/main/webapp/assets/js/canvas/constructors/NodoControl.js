/**
 * Created by bruno on 28/07/16.
 */
(function() {

    function Nodo(posx, posy,radio,color) {
        this.Container_constructor();

        this.color = color;
        this.posx = posx;
        this.posy = posy;
        this.radio = radio;

        this.setup();
    }
    var p = createjs.extend(Nodo, createjs.Container);


    p.setup = function() {



        var background = new createjs.Shape();
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
        if (this.color == "#ff3333") { this.color = "66ff66"}
    } ;
    p.handleRollOver = function(event) {
        this.alpha = event.type == "rollover" ? 0.4 : 1;
    };

    window.Nodo = createjs.promote(Nodo, "Container");
}());