/**
 * Created by bruno on 10/08/16.
 */

function CnvCuadraReproductor(posX, posY,largo,cantCarriles,horizontal) {
    this.Container_constructor();

    this.posX = posX;
    this.posY = posY;
    this.largo = largo;
    this.cantCarriles=cantCarriles;
    this.color = ColoresRGB.getGRAY();
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
    var sla = 4;   //Separacino de la linea amarilla
    var ala = this.width/6    //ancho linea amarilla es una sexta parte del ancho de la calle
    var largoLinea = 10;
    var anchoCuadra = Carril.ancho * this.cantCarriles + ala;

    //UNA CALLE SOLA
    this.background = new createjs.Shape();
    this.addChild(this.background);
    if (this.horizontal){
        this.background.graphics
            .beginFill(this.color)
            .drawRect(this.posX,this.posY,this.largo,anchoCuadra,10);

        //AGREGO N CARRILES
        for (var numCarril=1; numCarril<this.cantCarriles; numCarril++) {
            var posinicial = this.posX;
            //LINEAS CARRIL
            for (var j = 0; j < this.largo / (largoLinea+sla); j++) {
                var linea = new createjs.Shape();
                linea.graphics
                    .beginFill("#ffffff")
                    .drawRect(posinicial, this.posY + this.width, largoLinea, ala, 10);
                this.addChild(linea);
                posinicial += largoLinea + sla;
            }
            this.posY += this.width;
        }
    }
    else {// CALLE VERTICAL
        this.background.graphics
            .beginFill(this.color)
            .drawRect(this.posX,this.posY,anchoCuadra,this.largo,10);
        //AGREGO N CARRILES
        for (var numCarril=1; numCarril<this.cantCarriles; numCarril++) {
            var posinicial = this.posY;
            //LINEAS CARRIL
            for (var j = 0; j < this.largo / (largoLinea+sla); j++) {
                var linea = new createjs.Shape();
                linea.graphics
                    .beginFill("#ffffff")
                    .drawRect( this.posX + this.width,posinicial, ala,largoLinea, 10);
                this.addChild(linea);
                posinicial += largoLinea + sla;
            }
            this.posX += this.width;
        }
    }
    this.on("click", this.handleClick);
    this.on("rollover", this.handleRollOver);
    this.on("rollout", this.handleRollOver);
    this.cursor = "pointer";
    this.mouseChildren = true;
    this.offset = Math.random()*10;
    this.count = 0;
};

CnvCuadraReproductor.prototype.handleRollOver = function(event) {
    this.alpha = event.type == "rollover" ? 0.4 : 1;
};

/**
 * Cambia al color especificado interpolando los colores intermedios rgb
 * con mucha precision.
 * @param colorCuadra Un color de tipo {@link ColoresRGB} o cualquier objeto
 *  que tenga las propiedades numéricas enteras r g b
 */
CnvCuadraReproductor.prototype.cambiarColor = function (colorCuadra) {
    var bg = this.background;
    var color = this.color;
    createjs.Tween.get(color).to(colorCuadra, 300)
        .addEventListener('change', function() {
            bg.graphics._fill.style = color.toString();
        });
}

window.CnvCuadraReproductor = createjs.promote(CnvCuadraReproductor, "Container");