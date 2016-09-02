    function CnvNodoBorde(nodo,fila,columna, posx, posy,radio,color,sentido) {
        this.Container_constructor();

        this.fila = fila;
        this.columna = columna;
        this.id = nodo.id;
        this.nodo = nodo;
        this.color = color;
        this.flecha;
        this.sentido = sentido;
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
    var WHITE="#ffffff";

    //METODOS DEL CONSTRUCTOR
    CnvNodoBorde.prototype.setup = function() {
        //Dibujo el nodo
        this.background = new createjs.Shape();
        this.background.graphics
            .beginFill(WHITE)
            .beginStroke("#000000").setStrokeStyle(1)
            .drawCircle(this.posx,this.posy,this.radio);
        this.addChild(this.background);

        //Dibujo la flecha
        var pathFlecha = this.rutaDeLaFlechaSegunSentido(this.sentido);  //*TODO* Eze: traer del objeto global de sentidos. esto se encuentra en utils.js
        this.flecha = new createjs.Bitmap(pathFlecha);
        this.flecha.scaleX=0.1;
        this.flecha.scaleY=0.1;
        this.flecha.x=this.posx-5;
        this.flecha.y=this.posy-5;
        this.addChild(this.flecha);


        //escribo la orientacion



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
        //this.color= this.color == ROJO?  VERDE:ROJO;
        //this.background.graphics.clear()
        //    .beginFill(this.color)
        //    .beginStroke("#000000").setStrokeStyle(1)
        //    .drawCircle(this.posx,this.posy,this.radio);
        this.cambiarSentido();
    }

    //CnvNodoBorde.prototype.asignarSentidoContrario = function(unSentido) {
    //    switch(unSentido) {
    //        case 'Este-Oeste':
    //            return '/assets/img/flechaIzquierda.jpeg';
    //            break;
    //        case 'Norte-Sur':
    //            return '/assets/img/flechaAbajo.jpeg';
    //            break;
    //    }
    //}

    CnvNodoBorde.prototype.cambiarSentido = function(){
        var pathFlecha = this.rutaDeLaFlechaSegunCambioDeSentido(this.sentido);
        this.flecha = new createjs.Bitmap(pathFlecha);
        this.flecha.scaleX=0.1;
        this.flecha.scaleY=0.1;
        this.flecha.x=this.posx-5;
        this.flecha.y=this.posy-5;
        this.addChild(this.flecha);
    }

    CnvNodoBorde.prototype.rutaDeLaFlechaSegunSentido = function(unSentido){
        switch(unSentido) {
            case 'Este-Oeste':
                return '/assets/img/flechaIzquierda.jpeg';
                break;
            case 'Norte-Sur':
                return '/assets/img/flechaAbajo.jpeg';
                break;
            case 'Oeste-Este':
                return '/assets/img/flechaDerecha.jpeg';
                break;
            case 'Sur-Norte':
                return '/assets/img/flechaArriba.jpeg';
                break;

        }
    }

    CnvNodoBorde.prototype.rutaDeLaFlechaSegunCambioDeSentido = function(unSentido){
        switch(unSentido) {
            case 'Oeste-Este':
                this.sentido = 'Este-Oeste';
                return '/assets/img/flechaIzquierda.jpeg';
                break;
            case 'Sur-Norte':
                this.sentido = 'Norte-Sur';
                return '/assets/img/flechaAbajo.jpeg';
                break;
            case 'Este-Oeste':
                this.sentido = 'Oeste-Este';
                return '/assets/img/flechaDerecha.jpeg';
                break;
            case 'Norte-Sur':
                this.sentido = 'Sur-Norte';
                return '/assets/img/flechaArriba.jpeg';
                break;

        }
    }

    window.CnvNodoBorde = createjs.promote(CnvNodoBorde, "Container");
/**
 * Created by bruno on 28/07/16.
 */
