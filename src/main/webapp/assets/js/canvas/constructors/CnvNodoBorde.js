    function CnvNodoBorde(fila,columna, posx, posy,radio,color) {
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
                l(self);
            });
        };

        this.setup();
    }
    createjs.extend(CnvNodoBorde, createjs.Container);

    //CONSTANTES GLOBALES DEL CONSTRUCTOR
    var ROJO="#ff3333";
    var VERDE="#66ff66";

    //METODOS DEL CONSTRUCTOR
    CnvNodoBorde.prototype.setup = function() {
        this.background = new createjs.Shape();
        this.background.graphics
            .beginFill(this.color)
            .drawCircle(this.posx,this.posy,this.radio);

        this.addChild(this.background);
        this.on("click", this.handleClick);
        this.on("rollover", this.handleRollOver);
        this.on("rollout", this.handleRollOver);
        this.cursor = "pointer";

        this.mouseChildren = true;

        this.offset = Math.random()*10;
        this.count = 0;
    } ;

    CnvNodoBorde.prototype.handleRollOver = function(event) {
        this.alpha = event.type == "rollover" ? 0.4 : 1;
    };

    CnvNodoBorde.prototype.cambiarColor = function(){
        this.color= this.color == ROJO?  VERDE:ROJO;
        this.background.graphics.clear()
            .beginFill(this.color)
            .drawCircle(this.posx,this.posy,this.radio);
    }

    window.CnvNodoBorde = createjs.promote(CnvNodoBorde, "Container");
/**
 * Created by bruno on 28/07/16.
 */
