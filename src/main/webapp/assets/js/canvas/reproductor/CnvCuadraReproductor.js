/**
 * Created by bruno on 10/08/16.
 */

function CnvCuadraReproductor(posX, posY,largo,calle,horizontal) {
    this.Container_constructor();

    this.posX = posX;
    this.posY = posY;
    this.largo = largo;
    this.calle = calle;
    this.cantCarriles=calle.cantCarriles;
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
CnvCuadraReproductor.sendasPorCarril = 2;

CnvCuadraReproductor.prototype.setup = function() {
    var sla = CnvCuadraReproductor.sla;   //Separacino de la linea amarilla
    var ala = Carril.ancho/6;    //ancho linea amarilla es una sexta parte del ancho de la calle
    var sendasPorCarril = CnvCuadraReproductor.sendasPorCarril;
    var anchoCuadra = Carril.ancho * this.cantCarriles;
    var anchoSenda = (Carril.ancho - 2*ala)/2;
    var largoCalle = this.largo;
    var largoLinea = CnvCuadraReproductor.largoLineaSeparacionCarriles;
    var largoSenda = CnvCuadraReproductor.largoSenda;
    var radioManzana =  CnvCuadraReproductor.radioManzana;
    var ses = largoCalle - largoSenda*2 - anchoSenda*2 - radioManzana*2 - ala*2;    //SEPARACION ENTRE SENDAS
    var HORIZONTAL = true;
    var VERTICAL = false;
    var self = this;
    var avanceHastaOtraSenda = largoSenda + ses + anchoSenda*2 + ala*2; //lo pongo al final para dibujar la otra senda
    var calle = this.calle;
    var anchoFlecha = anchoSenda;

    //UNA CALLE SOLA
    //this.background = new createjs.Shape();
    this.colorPanel = new createjs.Shape();
    //this.addChild(this.background);
    this.addChild(this.colorPanel);

    if (this.horizontal){
        //this.background.graphics
        //    .beginFill(ColoresRGB.getGRAY())
        //    .drawRect(this.posX, this.posY,
        //        largoCalle, anchoCuadra);

        this.colorPanel.graphics
            .beginFill(this.color)
            .drawRect(this.posX + CnvManzana.radioEsquina,this.posY,
                largoCalle-2*CnvManzana.radioEsquina, anchoCuadra);

        //LINEA LIMITE VEHICULAR
        crearLineaDeLimiteVehicular(VERTICAL,this.posX,this.posY);

        var funcionFlecha = Sentido.OESTE_ESTE == calle.sentido ? flechaDerecha : flechaIzquierda;

        this.asentarFlechaEntrada = function() {
            funcionFlecha(self.posX + CnvManzana.radioEsquina - anchoFlecha - ala,
                    self.posY + (self.cantCarriles - 1) * Carril.ancho / 2, ColoresRGB.getRED().toHexa());
        }

        this.asentarFlechaSalida = function() {
            funcionFlecha(self.posX + largoCalle - CnvManzana.radioEsquina + ala,
                        self.posY + (self.cantCarriles - 1) * Carril.ancho / 2, ColoresRGB.getRED().toHexa());
        }

        funcionFlecha(this.posX + largoCalle/2 - anchoFlecha/2,
            this.posY + (this.cantCarriles - 1) * Carril.ancho / 2, "white");

        //AGREGO N SEPARACION DE CARRILES
       for (var numCarril=0; numCarril<this.cantCarriles; numCarril++) {
            var posinicialSendaX = this.posX + CnvCuadraReproductor.radioManzana; //le restamos media ala
            var posinicialSendaY = this.posY + ala/2;
            for (var numsenda=0; numsenda < sendasPorCarril; numsenda++) {
                crearSendaPeatonal(HORIZONTAL);
                posinicialSendaX += avanceHastaOtraSenda;
                crearSendaPeatonal(HORIZONTAL);
                posinicialSendaX -= avanceHastaOtraSenda;
                posinicialSendaY += anchoSenda + ala;
            }

            //LINEAS CARRIL
            if(numCarril != this.cantCarriles-1) {
                creaLineasSeparaCarril(HORIZONTAL, this.posX + largoSenda * 2 + anchoSenda + ala, this.posY);
            }
            this.posY += Carril.ancho;
        }
    }
    else {// CALLE VERTICAL
        //this.background.graphics
        //    .beginFill(ColoresRGB.getGRAY())
        //    .drawRect(this.posX,this.posY,anchoCuadra,largoCalle);

        this.colorPanel.graphics
            .beginFill(this.color)
            .drawRect(this.posX,this.posY + CnvManzana.radioEsquina,
                anchoCuadra, largoCalle - 2*CnvManzana.radioEsquina)

        //LINEA LIMITE VEHICULAR
        crearLineaDeLimiteVehicular(HORIZONTAL,this.posX,this.posY);

        var funcionFlecha = Sentido.OESTE_ESTE == calle.sentido ? flechaAbajo : flechaArriba;

        funcionFlecha(this.posX + (this.cantCarriles - 1) * Carril.ancho / 2,
            this.posY + largoCalle/2 - anchoFlecha/2, "white");

        this.asentarFlechaEntrada = function() {
            funcionFlecha(self.posX + (self.cantCarriles - 1) * Carril.ancho / 2,
                        self.posY + CnvManzana.radioEsquina - anchoFlecha - ala, ColoresRGB.getGREEN().toHexa());
        }

        this.asentarFlechaSalida = function() {
            funcionFlecha(self.posX + (self.cantCarriles - 1) * Carril.ancho / 2,
                        self.posY + largoCalle - CnvManzana.radioEsquina + ala, ColoresRGB.getGREEN().toHexa());
        }

        //AGREGO N CARRILES
        for (var numCarril=0; numCarril<this.cantCarriles; numCarril++) {
            var posinicialSendaX = this.posX+ala/2; //le restamos media ala
            var posinicialSendaY = this.posY + CnvCuadraReproductor.radioManzana;
            for (var numsenda=0; numsenda < sendasPorCarril; numsenda++) {
                crearSendaPeatonal(VERTICAL);
                posinicialSendaY += avanceHastaOtraSenda;
                crearSendaPeatonal(VERTICAL);
                posinicialSendaY -= avanceHastaOtraSenda;
                posinicialSendaX += anchoSenda + ala;
            }

            //LINEAS CARRIL
            if(numCarril != this.cantCarriles-1) {
                creaLineasSeparaCarril(VERTICAL, this.posX, this.posY + largoSenda * 2 + anchoSenda + ala);
            }
            this.posX += Carril.ancho;
        }

    }
    this.on("click", this.handleClick);
    this.on("rollover", this.handleRollOver);
    this.on("rollout", this.handleRollOver);
    this.cursor = "pointer";
    this.mouseChildren = true;
    this.offset = Math.random()*10;
    this.count = 0;

    function flechaDerecha(posx,posy,color) {
        var triangulo = new createjs.Shape();
        triangulo.graphics.beginFill(color);
        triangulo.graphics.moveTo(posx, posy)
            .lineTo(posx, posy + Carril.ancho)
            .lineTo(posx + anchoFlecha, posy + Carril.ancho / 2)
            .lineTo(posx, posy);
        self.addChild(triangulo);
        return triangulo;
    }

    function flechaIzquierda(posx,posy,color) {
        var triangulo = new createjs.Shape();
        triangulo.graphics.beginFill(color);
        triangulo.graphics.moveTo(posx + anchoFlecha, posy)
            .lineTo(posx + anchoFlecha, posy + Carril.ancho)
            .lineTo(posx, posy + Carril.ancho / 2)
            .lineTo(posx + anchoFlecha, posy);
        self.addChild(triangulo);
        return triangulo;
    }

    function flechaAbajo(posx,posy,color) {
        var triangulo = new createjs.Shape();
        triangulo.graphics.beginFill(color);
        triangulo.graphics.moveTo(posx, posy)
            .lineTo(posx + Carril.ancho, posy)
            .lineTo(posx + Carril.ancho/2, posy + anchoFlecha)
            .lineTo(posx, posy);
        self.addChild(triangulo);
        return triangulo;
    }

    function flechaArriba(posx,posy,color) {
        var triangulo = new createjs.Shape();
        triangulo.graphics.beginFill(color);
        triangulo.graphics.moveTo(posx, posy+anchoFlecha)
            .lineTo(posx + Carril.ancho, posy+anchoFlecha)
            .lineTo(posx + Carril.ancho/2, posy)
            .lineTo(posx, posy+anchoFlecha);
        self.addChild(triangulo);
        return triangulo;
    }

    function crearSendaPeatonal(direccion)
    {
        if (direccion) {
            var sendapeatonal = new createjs.Shape();
            sendapeatonal.graphics
                .beginFill("#ffffff")
                .drawRect(posinicialSendaX,posinicialSendaY,largoSenda,anchoSenda);
            self.addChild(sendapeatonal);

        }else {
            var sendapeatonal = new createjs.Shape();
            sendapeatonal.graphics
                .beginFill("#ffffff")
                .drawRect(posinicialSendaX,posinicialSendaY,anchoSenda,largoSenda);
            self.addChild(sendapeatonal);
        }
    }

    function crearLineaDeLimiteVehicular(direccion,posx,posy){
        //Linea 1
        if (direccion) {
            var lineaHorizontal = new createjs.Shape();
            lineaHorizontal.graphics
                .beginFill("#ffffff")
                .drawRect(posx,posy+radioManzana+(largoSenda+ala),anchoCuadra,anchoSenda);
            self.addChild(lineaHorizontal);
            //Linea 2
            //lineaHorizontal = new createjs.Shape();
            lineaHorizontal.graphics
                .beginFill("#ffffff")
                .drawRect(posx,posy+anchoSenda+ses+radioManzana+(largoSenda+ala),anchoCuadra,anchoSenda);
            self.addChild(lineaHorizontal);

        }
        else{

            var lineaVertical = new createjs.Shape();
            lineaVertical.graphics
                .beginFill("#ffffff")
                .drawRect(posx+radioManzana+largoSenda+ala,posy,anchoSenda,anchoCuadra);
            self.addChild(lineaVertical);
            //Linea 2
            //lineaVertical = new createjs.Shape();
            lineaVertical.graphics
                .beginFill("#ffffff")
                .drawRect(posx+anchoSenda+ses+radioManzana+largoSenda+ala,posy,anchoSenda,anchoCuadra);
            self.addChild(lineaVertical);
        }
    }

    function creaLineasSeparaCarril(direccion, posInix,  posIniy){
        var posx = posInix;
        var posy = posIniy;

        if (direccion) {

                for (var j = 0; j < ses / (largoLinea + sla); j++) {
                    var linea = new createjs.Shape();
                    linea.graphics
                        .beginFill("#ffffff")
                        .drawRect(posx,posy+Carril.ancho-ala/2,largoLinea,ala);
                    self.addChild(linea);
                    posx += largoLinea + sla;
                }

        }else {

                for (var j = 0; j < ses / (largoLinea + sla); j++) {
                    var linea = new createjs.Shape();
                    linea.graphics
                        .beginFill("#ffffff")
                        .drawRect(posx+ Carril.ancho - ala / 2, posy, ala, largoLinea, 10);
                    self.addChild(linea);
                    posy += largoLinea + sla;

                }

        }

    }
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
    var bg = this.colorPanel;
    var color = this.color;
    createjs.Tween.get(color).to(colorCuadra, 500)
        .addEventListener('change', function() {
            bg.graphics._fill.style = color.toString();
        });
}

CnvCuadraReproductor.prototype.cambiarColorFlechaEntrada = function (colorRGB) {
    //TBD
}

CnvCuadraReproductor.prototype.cambiarColorFlechaSalida = function (colorRGB) {
    //TBD
}

window.CnvCuadraReproductor = createjs.promote(CnvCuadraReproductor, "Container");