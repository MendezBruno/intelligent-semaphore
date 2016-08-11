/**
 * Created by bruno on 10/08/16.
 */
function CnvCuadraReproductor(posX, posY,largo,cantCarriles,color,horizontal) {
    this.Container_constructor();

    this.posX = posX;
    this.posY = posY;
    this.largo = largo;
    this.cantCarriles=cantCarriles;
    this.color = color;
    this.horizontal = horizontal;
    this.clickListeners = new Array();
    this.background;
    this.width = 20;  //valor standar de vialidad
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
    var colorCalle = "#b3b3b3";
    var sla = 4;   //Separacino de la linea amarilla
    var ala = this.width/6    //ancho linea amarilla es una sexta parte del ancho de la calle
    var largoLinea = 10;
    var container = new createjs.Container();

    //UNA CALLE SOLA
    this.background = new createjs.Shape();
    if (this.horizontal){
        this.background.graphics
            .beginFill(this.color)
            .drawRect(this.posX,this.posY,this.largo,this.width,10);

        //AGREGO N CARRILES
        for (numCarril=1; numCarril<this.cantCarriles; numCarril++) {
            //this.posY=this.posY+this.width;
            var carril = new createjs.Shape();
            carril.graphics
                .beginFill(colorCalle)
                .drawRect(this.posX, this.posY+this.width, this.largo, this.width + ala, 10);
            var posinicial = this.posX;
            container.addChild(carril);

            //LINEAS CARRIL

            for (j = 0; j < this.largo / (largoLinea+sla); j++) {
                var linea = new createjs.Shape();
                linea.graphics
                    .beginFill("#ffff80")
                    .drawRect(posinicial, this.posY + this.width, largoLinea, ala, 10);
                container.addChild(linea);
                posinicial = posinicial + largoLinea + sla
            }
            this.posY = this.posY+this.width;
        }

    }
    else {// CALLE VERTICAL
        this.background.graphics
            .beginFill(this.color)
            .drawRect(this.posX,this.posY,this.width,this.largo,10);
        //AGREGO N CARRILES
        for (numCarril=1; numCarril<this.cantCarriles; numCarril++) {
            //this.posY=this.posY+this.width;
            var carril = new createjs.Shape();
            carril.graphics
                .beginFill(colorCalle)
                .drawRect(this.posX+this.width, this.posY, this.width + ala,this.largo, 10);
            var posinicial = this.posY;
            container.addChild(carril);

            //LINEAS CARRIL

            for (j = 0; j < this.largo / (largoLinea+sla); j++) {
                var linea = new createjs.Shape();
                linea.graphics
                    .beginFill("#ffff80")
                    .drawRect( this.posX + this.width,posinicial, ala,largoLinea, 10);
                container.addChild(linea);
                posinicial = posinicial + largoLinea + sla
            }
            this.posX = this.posX+this.width;
        }
    }
    container.addChild(this.background);





    this.addChild(container);
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