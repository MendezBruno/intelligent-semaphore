    function NodoBorde(fila,columna, posx, posy,radio,color) {
        this.Container_constructor();

        this.fila = fila;
        this.columna = columna;
        this.color = color;
        this.posx = posx;
        this.posy = posy;
        this.radio = radio;
        this.clickListeners = new Array();
        this.background;
        var self =this;

        this.handleClick = function (){
            this.clickListeners.forEach(function(l){
                l(self,this.color);
            });
        };

        this.setup();
    }
    createjs.extend(NodoBorde, createjs.Container);

    //VARIABLES GLOBALES DEL CONSTRUCTOR
    var ROJO="#ff3333";
    var VERDE="#66ff66";

    //METODOS DEL CONSTRUCTOR
    NodoBorde.prototype.setup = function() {
        this.background = new createjs.Shape();
        this.background.graphics
            .beginFill(this.color)
            .drawCircle(this.posx,this.posy,this.radio);

        this.addChild(this.background);
        this.on("click", this.handleClick);
        this.on("rollover", this.handleRollOver);
        this.on("rollout", this.handleRollOver);
        this.cursor = "pointer";

        this.mouseChildren = false;

        this.offset = Math.random()*10;
        this.count = 0;
    } ;

    //NodoBorde.prototype.handleClick = function (event) {
    //    //var child = holder.getChildAt(event.id);
    //    if (this.color == ROJO) { this.cambiarColor(event.currentTarget.children[0],VERDE)}
    //    else {
    //        if (this.color == VERDE) { this.cambiarColor(event.currentTarget.children[0],ROJO)}
    //    }
    //    console.log(event.currentTarget.children[0]);
    //};
    NodoBorde.prototype.handleRollOver = function(event) {
        this.alpha = event.type == "rollover" ? 0.4 : 1;
    };

    NodoBorde.prototype.cambiarColor = function(color){
        this.background.graphics.clear().beginFill(color).drawCircle(this.posx,this.posy,this.radio);
        this.color= color;
    }
    window.NodoBorde = createjs.promote(NodoBorde, "Container");
/**
 * Created by bruno on 28/07/16.
 */
