/**
 * Created by bruno on 28/07/16.
 */
function GrillaController(filas, columnas, largo, stage, $scope){
    this.modelo = new MapaEditor();
    this.largo = largo;
    this.stage = stage;
    this.$scope = $scope;
    var nodos = [];
    nodos[0]=[];
    nodos[filas+1]=[];
    for (i=1; i < filas+1; i++) {
        nodos[i]=[];
        var calle = new Calle();
        var entrada = new NodoBorde();
        var salida = new NodoBorde();
        calle.sentido = Sentido.OESTE_ESTE;
        nodos[i][0]=entrada;
        nodos[i][columnas+1]=salida;
        this.modelo.nodosEntrada.push(entrada);
        this.modelo.nodosSalida.push(salida);

        for (j=0; j<columnas+1; j++) {
            var cuadra = new Cuadra();
            var origen = nodos[i][j];
            var destino = nodos[i][j+1];
            if (!destino) {
                destino = new NodoNoSemaforo();
                nodos[i][j+1] = destino;
                this.modelo.nodosNoSemaforo.push(destino);
            }
            cuadra.nodoOrigen = origen.id;
            cuadra.nodoDestino = destino.id;
            calle.cuadras.push(cuadra);
        }
        this.modelo.callesHorizontales.push(calle);
    }
    for (j=1; j < columnas+1; j++) {
        var calle = new Calle();
        var entrada = new NodoBorde();
        var salida = new NodoBorde();
        calle.sentido = Sentido.OESTE_ESTE;
        nodos[0][j]=entrada;
        nodos[columnas+1][j]=salida;
        this.modelo.nodosEntrada.push(entrada);
        this.modelo.nodosSalida.push(salida);

        calle.sentido = Sentido.NORTE_SUR;
        for (i=0; i<filas+1; i++) {
            var cuadra = new Cuadra();
            var origen = nodos[i][j];
            var destino = nodos[i+1][j];
            cuadra.nodoOrigen = origen.id;
            cuadra.nodoDestino = destino.id;
            calle.cuadras.push(cuadra);
        }
        this.modelo.callesVerticales.push(calle);
    }
}
GrillaController.prototype.redibujar = function() {
    console.log(this.stage);
    console.log(this.modelo);
    //borrar todo

    //VARIABLES LOCALES
    var id=1;
    var posInicialX = 20;   //en un futuro se podria parametrizar
    var posInicialY = 20;   //en un futuro se podria parametrizar
    var posx = posInicialX;
    var posy = this.largo+posInicialY;
    var stage = this.stage;
    var largo = this.largo;

    var separador = 20;
    //CONSTANTES
    var ENTRADA = "#66ff66";
    var SALIDA = "#ff3333";
    var NEUTRAL = "#ffffff";
    var PRIMER_COLUMNA = 1;
    var HORIZONTAL = true;
    var VERTICAL = false;

    //FUNCIONES LOCALES
    var onClick = function(c){
        if(this.cuadraSeleccionada) {
            this.cuadraSeleccionada.desmarcar();
        };
        this.cuadraSeleccionada= c;
        this.cuadraSeleccionada.marcar();
        seleccionar(this.cuadraSeleccionada,cuadra);
    };

    var horizontales = this.modelo.callesHorizontales;
    var verticales = this.modelo.callesVerticales;
    console.log(horizontales.length);
    for (i=0; i<horizontales.length; i++) {
        moverPosxAlOrigen();

        var entrada = stage.addChild(new CnvNodoBorde(i+2,PRIMER_COLUMNA,posx-separador/2,posy+separador/2,separador/2,ENTRADA));
        var cuadras = new Array();

        for (j = 0; j < verticales.length + 1; j++) {
            cuadras.push(generarCuadra(HORIZONTAL));
            actualizarPosX();
            if(verticales.length+1 != j){
                var nodoCentral = new CnvNodoControl( i+1, j+1, posx - separador / 2, posy + separador / 2, separador / 2, NEUTRAL);
                stage.addChild(nodoCentral);
            }
        }

        var salida = stage.addChild(new CnvNodoBorde( i+2, j+1, posx - separador / 2, posy + separador / 2, separador / 2, SALIDA));
        actualizarPosY();
        var cnvCalleHorizontal = new CnvCalleHorizontal(entrada,salida);
        cnvCalleHorizontal.cuadras = cuadras;
    }
    moverPosxAlOrigen();
    moverPosyAlOrigen();
    posx=posx + largo;
    for (i = 0; i < verticales.length; i++) {
        var entrada = new CnvNodoBorde(1,i+1,posx+separador/2,posy-separador/2,separador/2,ENTRADA);
        stage.addChild(entrada);
        var cuadras = new Array();

        for (j = 0; j < horizontales.length+1; j++) {
            cuadras.push(generarCuadra(VERTICAL));
            actualizarPosY();
        }
       // actualizarPosY();
        var salida = new CnvNodoBorde(j,i+1,posx+separador/2,
            posy-largo+separador,separador/2,SALIDA);
        stage.addChild(salida);
        actualizarPosX();
        moverPosyAlOrigen();
        //posx=posx + this.largo;
        var cnvCalleVertical = new CnvCalleVertical(entrada,salida);
        cnvCalleVertical.cuadras = cuadras;

    }

    function generarCuadra(direccion){
        var cuadra = new CnvCuadra(id, posx, posy, largo, "#b3b3b3", direccion);
        cuadra.clickListeners.push(onClick);
        cuadras.push(cuadra);
        stage.addChild(cuadra);
        id++;
        return cuadra;
    }

    function actualizarPosX(){
        posx = posx + largo + separador;
    }

    function actualizarPosY(){
        posy = posy + largo + separador;
    }

    function moverPosxAlOrigen(){
        posx = largo + posInicialX;
    }

    function moverPosyAlOrigen(){
        posy = posInicialY;
    }

    function seleccionar(cuadra) {
        $scope.cuadra = cuadra;
        $scope.calle = cuadra.calle;
    }
}

app.factory('logica', function (filas, columnas, largo, stage, $scope) {
    return new GrillaController(filas, columnas, largo, stage, $scope);
});

function BiArray (){
}

BiArray.prototype.push = function(x,y,elem){};

function NodoNoSemaforo() {
    this.id = Nodo.getNextId();
}

function NodoBorde() {
    this.id = Nodo.getNextId();
}

function Nodo() {

}

Nodo.nextId = 1;

Nodo.getNextId = function() {
    var next = Nodo.nextId;
    Nodo.nextId++;
    return "nodo-"+next;
}