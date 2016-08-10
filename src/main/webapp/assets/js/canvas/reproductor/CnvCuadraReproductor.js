/**
 * Created by bruno on 10/08/16.
 */
function CnvCuadraReproductor(posX, posY,largo,cantCarriles,color,horizontal) {
    this.Container_constructor();

    this.posX = posX;
    this.posY = posY;
    this.largo = largo;
    this.color = color;
    this.horizontal = horizontal;
    this.marcado = false;
    this.clickListeners = new Array();
    this.background;
    this.width = 20;
    var self = this;

    this.handleClick = function (event) {
        this.clickListeners.forEach(function(l){
            l(self);
        });
    };

    this.setup();
}
createjs.extend(CnvCuadraReproductor, createjs.Container);

CnvCuadraReproductor.prototype.setup = function() {
    //viene predefinido
    container = new createjs.Container();
    this.background = new createjs.Shape();
    if (this.horizontal){
        this.background.graphics
            .beginFill(this.color)
            .drawRect(this.posX,this.posY,this.largo,this.width,10);
    }
    else {
        this.background.graphics
            .beginFill(this.color)
            .drawRect(this.posX,this.posY,this.width,this.largo,10);
    }

    this.addChild(this.background);
    this.on("click", this.handleClick);
    this.on("rollover", this.handleRollOver);
    this.on("rollout", this.handleRollOver);
    this.cursor = "pointer";
    this.mouseChildren = true;
    this.offset = Math.random()*10;
    this.count = 0;
} ;

CnvCuadraReproductor.prototype.handleRollOver = function(event) {
    this.alpha = event.type == "rollover" ? 0.4 : 1;
};



window.CnvCuadraReproductor = createjs.promote(CnvCuadraReproductor, "Container");