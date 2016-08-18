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

CnvCuadraReproductor.radioManzana = 40;
CnvCuadraReproductor.largoSenda = 35;
CnvCuadraReproductor.sla = 4;
CnvCuadraReproductor.largoLineaSeparacionCarriles = 10;

CnvCuadraReproductor.prototype.setup = function() {
    var sla = CnvCuadraReproductor.sla;   //Separacino de la linea amarilla
    var ala = Carril.ancho/6;    //ancho linea amarilla es una sexta parte del ancho de la calle
    var anchoCuadra = Carril.ancho * this.cantCarriles + ala;
    var anchoSenda = (Carril.ancho - 2*ala)/2;
    var largoCalle = this.largo;
    var largoLinea = CnvCuadraReproductor.largoLineaSeparacionCarriles;
    var largoSenda = CnvCuadraReproductor.largoSenda;
    var radioManzana =  CnvCuadraReproductor.radioManzana;
    var ses = largoCalle - largoSenda*2 - anchoSenda*2 - radioManzana*2 - ala*2;    //SEPARACION ENTRE SENDAS



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
                    .drawRect(posinicial, this.posY + this.width - ala/2, largoLinea, ala, 10);
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
        for (var numCarril=0; numCarril<this.cantCarriles; numCarril++) {

            var posinicialSendaX = this.posX+ala/2; //le restamos media ala
            var posinicialSendaY = this.posY + CnvCuadraReproductor.radioManzana;
            for (var numsenda=0; numsenda<2; numsenda++) {
                var sendapeatonal = new createjs.Shape();
                sendapeatonal.graphics
                    .beginFill("#ffffff")
                    .drawRect(posinicialSendaX, posinicialSendaY, anchoSenda,this.largo/8, 10);
                this.addChild(sendapeatonal);
                posinicialSendaX =posinicialSendaX+ anchoSenda+ala;
            }
            //LINEA HORIZONTAL 1era
            var lineaHorizontal = new createjs.Shape();
            lineaHorizontal.graphics
                .beginFill("#ffffff")
                .drawRect( this.posX,posinicialSendaY + (this.largo/8 + ala), anchoCuadra,anchoSenda, 10);
            this.addChild(lineaHorizontal);


            var posinicial = this.posY + (this.largo/8)*2+anchoSenda + ala;

            //AGREGO SENDA PEATONAL
            var posinicialSendaX = this.posX + ala/2; //le restamos media ala
            var posinicialSendaY = this.posY + this.largo - CnvCuadraReproductor.radioManzana;
            for (var numsenda=0; numsenda<2; numsenda++) {
                var sendapeatonal = new createjs.Shape();
                sendapeatonal.graphics
                    .beginFill("#ffffff")
                    .drawRect(posinicialSendaX, posinicialSendaY - CnvCuadraReproductor.radioManzana , anchoSenda,this.largo/8, 10);
                this.addChild(sendapeatonal);
                posinicialSendaX =posinicialSendaX+ anchoSenda+ala;
            }

            //LINEAS CARRIL
            if (numCarril != this.cantCarriles-1 ){
                for (var j = 0; j < ((this.largo-(CnvCuadraReproductor.radioManzana+anchoSenda*2+this.largo/4)) / (largoLinea+sla)); j++) {
                    var linea = new createjs.Shape();
                    linea.graphics
                        .beginFill("#ffffff")
                        .drawRect(this.posX + this.width - ala / 2, posinicial, ala, largoLinea, 10);
                    this.addChild(linea);
                    posinicial += largoLinea + sla;
                }

            }

            this.posX += this.width;
        }
        ////LINEA HORIZONTAL 1era
        //var lineaHorizontal = new createjs.Shape();
        //lineaHorizontal.graphics
        //    .beginFill("#ffffff")
        //    .drawRect( this.posX -anchoCuadra,posinicialSendaY + (this.largo/8 + ala), anchoCuadra,anchoSenda, 10);
        //this.addChild(lineaHorizontal);

        //LINEA HORIZONTAL 2DA
        var lineaHorizontal = new createjs.Shape();
        lineaHorizontal.graphics
            .beginFill("#ffffff")
            .drawRect( this.posX -anchoCuadra,posinicialSendaY , anchoCuadra,anchoSenda, 10);
        this.addChild(lineaHorizontal);

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