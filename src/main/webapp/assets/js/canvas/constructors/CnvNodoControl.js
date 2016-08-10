function CnvNodoControl(id,fila,columna,posx, posy,radio,color) {
        this.Container_constructor();

        this.fila = fila;
        this.columna = columna;
        this.id = id;
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
createjs.extend(CnvNodoControl, createjs.Container);

//VARIABLES GLOBALES DEL CONSTRUCTOR
var BLANCO="#ffffff";
var AMARILLO="#ffff80";


CnvNodoControl.prototype.setup = function() {
    this.background = new createjs.Shape();
    this.background.graphics
        .beginFill(this.color)
        .beginStroke("#000000")
        .setStrokeStyle(1).drawCircle(this.posx,this.posy,this.radio);

    this.addChild(this.background);
    this.on("click", this.handleClick);
    this.on("rollover", this.handleRollOver);
    this.on("rollout", this.handleRollOver);
    this.cursor = "pointer";

    this.mouseChildren = true;

    this.offset = Math.random()*10;
    this.count = 0;
} ;

CnvNodoControl.prototype.handleRollOver = function(event) {
    this.alpha = event.type == "rollover" ? 0.4 : 1;
};

CnvNodoControl.prototype.cambiarColor = function(){
    this.color= this.color == BLANCO?  AMARILLO:BLANCO;
    this.background.graphics.clear()
        .beginFill(this.color)
        .beginStroke("#000000").setStrokeStyle(1)
        .drawCircle(this.posx,this.posy,this.radio);
    return this.color;
};

CnvNodoControl.prototype.cambiarTipoDeNodoCentral = function(modelo){
    if(this.cambiarColor()==AMARILLO) {
        modelo.noSemaforoTOsemaforo(this.id);
    }
    else{
        modelo.semaforoTOnoSemaforo(this.id);
    }

};

window.CnvNodoControl = createjs.promote(CnvNodoControl, "Container");


/**
 * Created by bruno on 28/07/16.
 */