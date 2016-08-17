/**
 * Created by bruno on 28/07/16.
 */
function GrillaController(filas, columnas, largo, stage, $scope){

    this.modelo = new MapaEditor();
    this.largo = largo;
    this.stage = stage;
    this.$scope = $scope;
    this.nodos = [];
    var nodos = this.nodos;
    nodos[0]=[];
    nodos[filas+1]=[];
    for (i=1; i < filas+1; i++) {
        nodos[i]=[];
        var calle = new CalleHorizontal();
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
        var calle = new CalleVertical();
        var entrada = new NodoBorde();
        var salida = new NodoBorde();
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
    // console.log(this.modelo);
}
GrillaController.prototype.redibujar = function() {
    this.stage.removeAllChildren();
    var self = this;

    //VARIABLES LOCALES
    var id=1;
    var posInicialX = 20;   //en un futuro se podria parametrizar
    var posInicialY = 20;   //en un futuro se podria parametrizar
    var posx = posInicialX;
    var posy = this.largo+posInicialY;
    var stage = this.stage;
    var largo = this.largo;
    var nodos = this.nodos;
    var modelo = this.modelo;

    var separador = 20;
    this.separador = separador;
    //CONSTANTES
    var ENTRADA = "#66ff66";
    var SALIDA = "#ff3333";
    var NEUTRAL = "#ffffff";
    var PRIMERA_FILA = 0;
    var PRIMER_COLUMNA = 0;
    var HORIZONTAL = true;
    var VERTICAL = false;

    //FUNCIONES LOCALES
    var onClick = function(cnvCalle,cnvCuadra){
        if(this.cuadraSeleccionada) {
            this.cuadraSeleccionada.desmarcar();
        };
        this.cuadraSeleccionada= cnvCuadra;
        this.cuadraSeleccionada.marcar();
        seleccionar(cnvCalle.calle,cnvCuadra.cuadra,
            cnvCalle.nodo1(),cnvCalle.nodo2());
    };

    var onClickNodoCentral = function(cnvNodoControl){
        cnvNodoControl.cambiarTipoDeNodoCentral(self.modelo);

    }

    var horizontales = this.modelo.callesHorizontales;
    var verticales = this.modelo.callesVerticales;
    for (var i=0; i<horizontales.length; i++) {
        moverPosxAlOrigen();
        var calle = horizontales[i];
        var entrada = new CnvNodoBorde(nodos[i+1][PRIMER_COLUMNA],
            i+2,PRIMER_COLUMNA, posx-separador/2, posy+separador/2,
            separador/2,  ENTRADA);
        stage.addChild(entrada);
        var posXNodoSalida = posx+(largo+separador)*(verticales.length+1);
        var salida = new CnvNodoBorde(nodos[i+1][verticales.length+1],
            i+2, verticales.length+1, posXNodoSalida-separador/2,
            posy+separador/2, separador/2, SALIDA);
        stage.addChild(salida);
        var cnvCalleHorizontal = new CnvCalleHorizontal(entrada,salida);
        var cuadras = new Array();

        for (var j = 0; j < verticales.length + 1; j++) {
            var cnvCuadra = generarCuadra(HORIZONTAL,cnvCalleHorizontal);
            cnvCuadra.cuadra = calle.cuadras[j];
            cuadras.push(cnvCuadra);
            actualizarPosX();
            if(verticales.length != j){
                generarCnvNodoCentral(nodos[i+1][j+1].id,i+1,j+1);
            }
        }

        actualizarPosY();
        cnvCalleHorizontal.cuadras = cuadras;
        cnvCalleHorizontal.modelo = modelo;
        cnvCalleHorizontal.$scope = this.$scope;
        cnvCalleHorizontal.calle = horizontales[i];
    }
    moverPosxAlOrigen();
    moverPosyAlOrigen();
    posx=posx + largo;
    for (var i = 0; i < verticales.length; i++) {
        var entrada = new CnvNodoBorde(nodos[PRIMERA_FILA][i+1],1,i+1,posx+separador/2,posy-separador/2,separador/2,ENTRADA);
        var posYNodoSalida = posy+(largo+separador)*(horizontales.length+1);
        var salida = new CnvNodoBorde(nodos[horizontales.length+1][i+1],
            horizontales.length,i+1,posx+separador/2,
            posYNodoSalida-separador/2,separador/2,SALIDA);
        var calle = verticales[i];
        var cuadras = new Array();
        var cnvCalleVertical = new CnvCalleVertical(entrada,salida);
        stage.addChild(entrada);
        stage.addChild(salida);

        for (var j = 0; j < horizontales.length+1; j++) {
            // actualizarPosY();
            //posx=posx + this.largo;
            var cnvCuadra = generarCuadra(VERTICAL,cnvCalleVertical);
            cnvCuadra.cuadra = calle.cuadras[j];
            cuadras.push(cnvCuadra);
            actualizarPosY();
        }
        actualizarPosX();
        moverPosyAlOrigen();
        cnvCalleVertical.cuadras = cuadras;
        cnvCalleVertical.modelo =modelo;
        cnvCalleVertical.$scope = this.$scope;
        cnvCalleVertical.calle = verticales[i];
    }

    function generarCuadra(direccion, calle){
        var cuadra = new CnvCuadra(id, posx, posy, largo, "#b3b3b3", direccion);
        cuadra.clickListeners.push(partial(onClick,calle));
        cuadra.calle = calle;
        cuadras.push(cuadra);
        stage.addChild(cuadra);
        id++;
        return cuadra;
    }

    function generarCnvNodoCentral(id,fila,columna) {
        var nodoCentral = new CnvNodoControl(id,fila, columna, posx - separador / 2, posy + separador / 2, separador / 2, NEUTRAL);
        nodoCentral.clickListeners.push(onClickNodoCentral);
        stage.addChild(nodoCentral);
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

    function seleccionar(calle,cuadra, nodo1, nodo2) {
        self.$scope.cuadra = cuadra;
        self.$scope.calle = calle;
        self.$scope.nodo1 = nodo1;
        self.$scope.nodo2 = nodo2;
        if (calle.sentido==Sentido.NORTE_SUR || calle.sentido==Sentido.OESTE_ESTE) {
            self.$scope.nodoEntrada = nodo1.nodo;
            self.$scope.nodoSalida = nodo2.nodo;
        }
        if (calle.sentido==Sentido.SUR_NORTE || calle.sentido==Sentido.ESTE_OESTE) {
            self.$scope.nodoEntrada = nodo2.nodo;
            self.$scope.nodoSalida = nodo1.nodo;
        }
        self.$scope.$apply();
        // console.log(cuadra.id);
        // console.log(nodo1);
        // console.log(nodo2);
        // calle.cuadras.forEach(function (c) {
        //     console.log(c.id);
        // });
    }
}
GrillaController.prototype.agregarCalleHorizontal = function() {
    var nodos = this.nodos;
    var modelo = this.modelo;
    var ultima = nodos.length;
    nodos[ultima] = [];
    var cantCuadrasHorizontales = nodos[1].length-1;
    for(i=1;i<cantCuadrasHorizontales;i++){
        var cuadras = modelo.callesVerticales[i-1].cuadras;
        var borde=nodos[ultima-1][i];
        var nuevo=new NodoNoSemaforo();
        nodos[ultima-1][i]=nuevo;
        nodos[ultima][i]=borde;
        //Buscar la cuadra que quedo desconectada.
        var colgada = cuadras[cuadras.length-1];
        colgada.nodoDestino =nuevo.id;
        var nuevaCuadra = new Cuadra();
        nuevaCuadra.nodoOrigen = nuevo.id;
        nuevaCuadra.nodoDestino = borde.id;
        cuadras.push(nuevaCuadra);
        modelo.nodosNoSemaforo.push(nuevo);
    }
    var calle = new CalleHorizontal();
    calle.sentido = Sentido.OESTE_ESTE;
    var entrada = new NodoBorde();
    var salida = new NodoBorde();
    modelo.nodosEntrada.push(entrada);
    modelo.nodosSalida.push(salida);
    nodos[ultima-1][0]=entrada;
    nodos[ultima-1][cantCuadrasHorizontales]=salida;
    modelo.callesHorizontales.push(calle);
    for(j=0;j<cantCuadrasHorizontales;j++){
        var cuadra = new Cuadra();
        var origen = nodos[ultima-1][j];
        var destino = nodos[ultima-1][j+1];
        cuadra.nodoOrigen = origen.id;
        cuadra.nodoDestino = destino.id;
        calle.cuadras.push(cuadra);
    }
    this.redimensionarCanvas();
}
GrillaController.prototype.redimensionarCanvas = function () {
    var nodosH = this.nodos[1].length;
    var nodosV = this.nodos.length;
    var ancho = nodosH*this.separador + (nodosH+1)*this.largo;
    var alto = nodosV*this.separador + (nodosV-1)*this.largo;
    this.stage.canvas.width = ancho;
    this.stage.canvas.height = alto;
    this.stage.update();
}
GrillaController.prototype.quitarCalleHorizontal = function() {
    var nodos = this.nodos;
    var modelo = this.modelo;
    var ultima = nodos.length-1;
    var cantCuadrasHorizontales = nodos[1].length-1;
    for(i=1;i<cantCuadrasHorizontales;i++){
        var vertical = modelo.callesVerticales[i-1];
        var borde=nodos[ultima][i];
        var aEliminar=nodos[ultima-1][i];
        nodos[ultima-1][i]=borde;
        vertical.cuadras.pop();
        vertical.cuadras[ultima-2].nodoDestino = borde.id;
        modelo.nodosNoSemaforo.removeIf(function(e,idx){
            return e.id == aEliminar.id; });
        modelo.nodosSemaforo.removeIf(function(e,idx){
            return e.id == aEliminar.id; });
    }
    modelo.nodosEntrada.removeIf(function (e,idx) {
        return e.id == nodos[ultima-1][0].id ||
            e.id == nodos[ultima-1][cantCuadrasHorizontales].id;
    })
    modelo.nodosSalida.removeIf(function (e,idx) {
        return e.id == nodos[ultima-1][0].id ||
            e.id == nodos[ultima-1][cantCuadrasHorizontales].id;
    })
    modelo.callesHorizontales.pop();
    nodos.pop();
}
GrillaController.prototype.agregarCalleVertical = function() {
    var nodos = this.nodos;
    var modelo = this.modelo;
    var ultima = nodos[1].length;
    var cantCuadrasVerticales = nodos.length-1;
    for(i=1;i<cantCuadrasVerticales;i++){
        var cuadras = modelo.callesHorizontales[i-1].cuadras;
        var borde=nodos[i][ultima-1];
        var nuevo=new NodoNoSemaforo();
        nodos[i][ultima-1]=nuevo;
        nodos[i][ultima]=borde;
        //Buscar la cuadra que quedo desconectada.
        var colgada = cuadras[cuadras.length-1];
        colgada.nodoDestino =nuevo.id;
        var nuevaCuadra = new Cuadra();
        nuevaCuadra.nodoOrigen = nuevo.id;
        nuevaCuadra.nodoDestino = borde.id;
        cuadras.push(nuevaCuadra);
        modelo.nodosNoSemaforo.push(nuevo);
        // console.log(nuevo.id);
    }
    var calle = new CalleVertical();
    calle.sentido = Sentido.NORTE_SUR;
    var entrada = new NodoBorde();
    var salida = new NodoBorde();
    modelo.nodosEntrada.push(entrada);
    modelo.nodosSalida.push(salida);
    nodos[0][ultima-1]=entrada;
    nodos[cantCuadrasVerticales][ultima-1]=salida;
    modelo.callesVerticales.push(calle);
    for(i=0;i<cantCuadrasVerticales;i++){
        var cuadra = new Cuadra();
        var origen = nodos[i][ultima-1];
        var destino = nodos[i+1][ultima-1];
        cuadra.nodoOrigen = origen.id;
        cuadra.nodoDestino = destino.id;
        calle.cuadras.push(cuadra);
    }
    this.redimensionarCanvas();
    // console.log(nodos);
}
GrillaController.prototype.quitarCalleVertical = function() {
    var nodos = this.nodos;
    var modelo = this.modelo;
    var ultima = nodos[1].length-1;
    var cantCuadrasVerticales = nodos.length-1;
    for(i=1;i<cantCuadrasVerticales;i++){
        var horizontal = modelo.callesHorizontales[i-1];
        var borde=nodos[i][ultima];
        var aEliminar=nodos[i][ultima-1];
        nodos[i][ultima-1]=borde;
        horizontal.cuadras.pop();
        horizontal.cuadras[ultima-2].nodoDestino=borde.id;
        modelo.nodosNoSemaforo.removeIf(function(e,idx){
            return e.id == aEliminar.id; });
        modelo.nodosSemaforo.removeIf(function(e,idx){
            return e.id == aEliminar.id; });
        // console.log(aEliminar.id);
    }
    modelo.nodosEntrada.removeIf(function (e,idx) {
        return e.id == nodos[0][ultima-1].id ||
            e.id == nodos[cantCuadrasVerticales][ultima-1].id;
    })
    modelo.nodosSalida.removeIf(function (e,idx) {
        return e.id == nodos[0][ultima-1].id ||
            e.id == nodos[cantCuadrasVerticales][ultima-1].id;
    })
    modelo.callesVerticales.pop();
    nodos.forEach(function (fila) {
        fila.pop();
    })
}

GrillaController.prototype.galeriaMapa = function(modelo) {

    var cantidadCallesHorizontalesAAgregar;

    var cantidadCaleesVerticalesAAgregar;

    this.$scope.nombre = modelo.nombre;

    cantidadCallesHorizontalesAAgregar =  modelo.callesHorizontales[0].cuadras.length - this.$scope.callesH - 1;

    cantidadCaleesVerticalesAAgregar = modelo.callesVerticales[0].cuadras.length - this.$scope.callesV - 1;

    this.$scope.callesH = modelo.callesHorizontales[0].cuadras.length - 1;

    this.$scope.callesV = modelo.callesVerticales[0].cuadras.length - 1;

      this.nodos = [];
      var nodos = this.nodos;
      var nodo_bordes_aux = modelo.nodosEntrada;
      nodo_bordes_aux=nodo_bordes_aux.concat(modelo.nodosSalida);
      nodo_bordes_aux=nodo_bordes_aux.concat(modelo.nodosNoSemaforo);
      nodo_bordes_aux=nodo_bordes_aux.concat(modelo.nodosSemaforo);
      nodos[0]=[];
      console.log(modelo.nodosEntrada.length);
      console.log(modelo.nodosSalida.length);
      console.log(modelo.nodosNoSemaforo.length);
      console.log(modelo.nodosSemaforo.length);
      console.log(nodo_bordes_aux);

      nodos[modelo.callesVerticales[0].cuadras.length]=[];  // Uso calles verticales debido a que dependiendo de la cantidad de cuadras verticale hay calles horizontales
      for (var i=1; i < modelo.callesVerticales[0].cuadras.length; i++) {
          nodos[i]=[];

          for (var j=0; j<modelo.callesHorizontales[0].cuadras.length; j++) {

              nodos[i][j]=nodo_bordes_aux.find(function(nodo ) { return nodo.id === modelo.callesHorizontales[i-1].cuadras[j].nodoOrigen});
              console.log(nodos[i][j]);
              console.log(modelo.callesHorizontales[i-1].cuadras[j].nodoOrigen);

          }

          nodos[i][modelo.callesHorizontales[0].cuadras.length]=nodo_bordes_aux.find(function(nodo ) { return nodo.id === modelo.callesHorizontales[i-1].cuadras[j-1].nodoDestino});


      }

    for (j=1; j < modelo.callesHorizontales[0].cuadras.length; j++) {


        nodos[0][j]=nodo_bordes_aux.find(function(nodo ) { return nodo.id === modelo.callesVerticales[j-1].cuadras[0].nodoOrigen});
        nodos[modelo.callesVerticales[0].cuadras.length][j]=nodo_bordes_aux.find(function(nodo ) { return nodo.id === modelo.callesVerticales[j-1].cuadras[modelo.callesVerticales[0].cuadras.length-1].nodoDestino});
        console.log(modelo.callesVerticales[j-1].cuadras[modelo.callesVerticales[0].cuadras.length-1].nodoDestino);


    }

    var modeloParseado = JSON.parse(JSON.stringify(modelo));

    modeloParseado.__proto__ = MapaEditor.prototype;

    this.modelo=modeloParseado;

    for(var p=0;p<8;p++)

    console.log(this.modelo.nodosEntrada[p]);

    this.nodos = nodos;


     /*
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
        this.modelo.callesHorizontales.push(calle); */
//    }

    /*
    for (j=1; j < columnas+1; j++) {
        var calle = new CalleVertical();
        var entrada = new NodoBorde();
        var salida = new NodoBorde();
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

    */






  //  this.redibujar();


//    self.$scope.$apply();



}

GrillaController.prototype.setModelo = function(modelo) {

    this.modelo=modelo;

    console.log(modelo.nombre);

    this.redibujar();

}






Array.prototype.flatMap = function(lambda) {
    return Array.prototype.concat.apply([], this.map(lambda));
};

Array.prototype.removeIf = function(callback) {
    var i = this.length;
    while (i--) {
        if (callback(this[i], i)) {
            this.splice(i, 1);
        }
    }
};

//Aplicacion parcial en js. Repasar concepto de Paradigmas de programacion
function partial(fn /*, args...*/) {
    // A reference to the Array#slice method.
    var slice = Array.prototype.slice;
    // Convert arguments object to an array, removing the first argument.
    var args = slice.call(arguments, 1);

    return function() {
    // Invoke the originally-specified function, passing in all originally-
    // specified arguments, followed by any just-specified arguments.
        return fn.apply(this, args.concat(slice.call(arguments, 0)));
    };
}