/**
 * Created by Bruno on 03/08/16.
 */
function CnvCalleHorizontal(nodoBordeD,nodoBordeI) {
    this.Container_constructor();

    this.nodoDerecho = nodoBordeD;
    this.nodoIzquierdo = nodoBordeI;
    this.clickListeners = new Array();
    this.background;
    var self =this;

    this.handleClick = function (){
        this.clickListeners.forEach(function(l){
            l(self);
        });
    };

    this.intercambiarColor = function(){
        self.nodoDerecho.cambiarColor();
        self.nodoIzquierdo.cambiarColor();
    }
    this.nodoDerecho.clickListeners.push(this.intercambiarColor);
    this.nodoIzquierdo.clickListeners.push(this.intercambiarColor);

    this.setup();
}
createjs.extend(CnvCalleHorizontal, createjs.Container);

//VARIABLES GLOBALES DEL CONSTRUCTOR
var ROJO="#ff3333";
var VERDE="#66ff66";

//METODOS DEL CONSTRUCTOR
CnvCalleHorizontal.prototype.setup = function() {
    this.on("click", this.handleClick);
    this.on("rollover", this.handleRollOver);
    this.on("rollout", this.handleRollOver);
    this.cursor = "pointer";

    this.mouseChildren = true;

    this.offset = Math.random()*10;
    this.count = 0;
} ;


CnvCalleHorizontal.prototype.handleRollOver = function(event) {
    this.alpha = event.type == "rollover" ? 0.4 : 1;
};

window.CnvCalleHorizontal = createjs.promote(CnvCalleHorizontal, "Container");