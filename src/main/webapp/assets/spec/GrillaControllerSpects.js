/**
 * Created by Ezequiel on 06/08/2016.
 */

describe("redimensionar el mapa", function () {
    var logica;
    var stageMock;
    var scopeMock;
    var modelo;

    beforeEach(function () {
        stageMock = {
            canvas: {},
            children: new Array(),
            update: function () { },
            addChild: function (child){
                this.children.push(child);
            },
            removeAllChildren: function (){}
        };
        scopeMock = {
            $apply: function () { console.log("$scope.$apply()"); }
        }
        logica = new GrillaController(3,3,40,stageMock,scopeMock);
        modelo = logica.modelo;
    })
    
    it("Agregar y quitar calle H debe dejar las calles horizontales del modelo igual", function () {
        var idsOrigen = getIdsCalle(modelo.callesHorizontales);
        logica.agregarCalleHorizontal();
        logica.quitarCalleHorizontal();
        var idsResultado = getIdsCalle(modelo.callesHorizontales);
        expect(idsOrigen).toBe(idsResultado);
    });

    it("Agregar y quitar calle H debe dejar las calles verticales del modelo igual", function () {
        var idsOrigen = getIdsCalle(modelo.callesVerticales);
        logica.agregarCalleHorizontal();
        logica.quitarCalleHorizontal();
        var idsResultado = getIdsCalle(modelo.callesVerticales);
        expect(idsOrigen).toBe(idsResultado);
    });

    it("Agregar y quitar calle H debe dejar los nodos de entrada del modelo igual", function () {
        var idsOrigen = getIds(modelo.nodosEntrada);
        logica.agregarCalleHorizontal();
        logica.quitarCalleHorizontal();
        var idsResultado = getIds(modelo.nodosEntrada);
        expect(idsOrigen).toBe(idsResultado);
    });
    
    it("Agregar y quitar calle H debe dejar los nodos de salida del modelo igual", function () {
        var idsOrigen = getIds(modelo.nodosSalida);
        logica.agregarCalleHorizontal();
        logica.quitarCalleHorizontal();
        var idsResultado = getIds(modelo.nodosSalida);
        expect(idsOrigen).toBe(idsResultado);
    });

    it("Agregar y quitar calle H debe dejar los nodos noSemaforo del modelo igual", function () {
        var idsOrigen = getIds(modelo.nodosNoSemaforo);
        logica.agregarCalleHorizontal();
        logica.quitarCalleHorizontal();
        var idsResultado = getIds(modelo.nodosNoSemaforo);
        expect(idsOrigen).toBe(idsResultado);
    });

    it("Agregar y quitar calle H debe dejar los nodos semaforo del modelo igual", function () {
        var idsOrigen = getIds(modelo.nodosSemaforo);
        logica.agregarCalleHorizontal();
        logica.quitarCalleHorizontal();
        var idsResultado = getIds(modelo.nodosSemaforo);
        expect(idsOrigen).toBe(idsResultado);
    });

    it("Agregar y quitar calle H debe dejar estructura auxiliar de nodos igual", function () {
        var idsOrigen = getIds(logica.nodos);
        logica.agregarCalleHorizontal();
        logica.quitarCalleHorizontal();
        var idsResultado = getIds(logica.nodos);
        expect(idsOrigen).toBe(idsResultado);
    });

    it("Agregar y quitar calle V debe dejar las calles verticales del modelo igual", function () {
        var idsOrigen = getIdsCalle(modelo.callesVerticales);
        logica.agregarCalleVertical();
        logica.quitarCalleVertical();
        var idsResultado = getIdsCalle(modelo.callesVerticales);
        expect(idsOrigen).toBe(idsResultado);
    });

    it("Agregar y quitar calle V debe dejar las calles horizontales del modelo igual", function () {
        var idsOrigen = getIdsCalle(modelo.callesHorizontales);
        logica.agregarCalleVertical();
        logica.quitarCalleVertical();
        var idsResultado = getIdsCalle(modelo.callesHorizontales);
        expect(idsOrigen).toBe(idsResultado);
    });

    it("Agregar y quitar calle V debe dejar los nodos de entrada del modelo igual", function () {
        var idsOrigen = getIds(modelo.nodosEntrada);
        logica.agregarCalleVertical();
        logica.quitarCalleVertical();
        var idsResultado = getIds(modelo.nodosEntrada);
        expect(idsOrigen).toBe(idsResultado);
    });

    it("Agregar y quitar calle V debe dejar los nodos de salida del modelo igual", function () {
        var idsOrigen = getIds(modelo.nodosSalida);
        logica.agregarCalleVertical();
        logica.quitarCalleVertical();
        var idsResultado = getIds(modelo.nodosSalida);
        expect(idsOrigen).toBe(idsResultado);
    });

    it("Agregar y quitar calle V debe dejar los nodos noSemaforo del modelo igual", function () {
        var idsOrigen = getIds(modelo.nodosNoSemaforo);
        logica.agregarCalleVertical();
        logica.quitarCalleVertical();
        var idsResultado = getIds(modelo.nodosNoSemaforo);
        expect(idsOrigen).toBe(idsResultado);
    });

    it("Agregar y quitar calle V debe dejar los nodos semaforo del modelo igual", function () {
        var idsOrigen = getIds(modelo.nodosSemaforo);
        logica.agregarCalleVertical();
        logica.quitarCalleVertical();
        var idsResultado = getIds(modelo.nodosSemaforo);
        expect(idsOrigen).toBe(idsResultado);
    });

    it("Agregar y quitar calle V debe dejar estructura auxiliar de nodos igual", function () {
        var idsOrigen = getIds(logica.nodos);
        logica.agregarCalleVertical();
        logica.quitarCalleVertical();
        var idsResultado = getIds(logica.nodos);
        expect(idsOrigen).toBe(idsResultado);
    });

    it("Agregar calle H y V", function () {
        // var idsOrigen = getIds(logica.nodos);
        // console.log(logica.nodos);
        loggearNodos(logica.nodos);
        loggearModelo(modelo);
        logica.agregarCalleVertical();
        loggearNodos(logica.nodos);
        loggearModelo(modelo);
        // console.log(logica.nodos);
        logica.agregarCalleHorizontal();
        loggearNodos(logica.nodos);
        loggearModelo(modelo);
        // var idsResultado = getIds(logica.nodos);
        // console.log(logica.nodos);
        expect(true).toBe(true);
    });

    it("Intercambiar nodo NO semáforo por semáforo", function () {
        logica.redibujar();
        var nodo = stageMock.children.find(function(child){
            return child instanceof CnvNodoControl;
        })
        var cantidadNodosNoSemaforos = logica.modelo.nodosNoSemaforo.length;
        nodo.cambiarTipoDeNodoCentral(logica.modelo);
        expect(logica.modelo.nodosNoSemaforo.length).toBe(cantidadNodosNoSemaforos-1);
        expect(logica.modelo.nodosSemaforo.length).toBe(1);
        var nodoSemaforo = logica.modelo.nodosSemaforo.pop();
        expect(!nodoSemaforo.tiempoHorizontal).toBe(false);
        expect(!nodoSemaforo.tiempoVertical).toBe(false);
    });

    it("Intercambiar nodo semáforo por NO semáforo", function () {
        logica.redibujar();
        var nodo = stageMock.children.find(function(child){
            return child instanceof CnvNodoControl;
        })
        var cantidadNodosNoSemaforos = logica.modelo.nodosNoSemaforo.length;
        nodo.cambiarTipoDeNodoCentral(logica.modelo);
        nodo.cambiarTipoDeNodoCentral(logica.modelo);

        var nodoNoSemaforo = logica.modelo.nodosNoSemaforo.find(function(n){
            return n.id == nodo.id;
        })

        expect(logica.modelo.nodosNoSemaforo.length).toBe(cantidadNodosNoSemaforos);
        expect(logica.modelo.nodosSemaforo.length).toBe(0);

        expect(!nodoNoSemaforo.tiempoHorizontal).toBe(true);
        expect(!nodoNoSemaforo.tiempoVertical).toBe(true);
    });

    it("Cambiar sentido calle cambia atributos de los nodos borde", function () {
        logica.redibujar();
        var cuadra = stageMock.children.find(function(child){
            return child instanceof CnvCuadra;
        });
        var calle = cuadra.calle;
        var nodo1 = calle.nodo1().nodo;
        var nodo2 = calle.nodo2().nodo;
        var cme = nodo1.cantMaxima;
        var ie = nodo1.intervalo;
        var cms = nodo2.cantMaxima;
        var is = nodo2.intervalo;

        //Provoco que el $scope se actualice con la cuadra seleccionada.
        cuadra.handleClick();

        //Provoco un intercambio
        calle.nodo1().handleClick();

        //que los nodos intercambien valor
        expect(nodo1.cantMaxima).toBe(cms);
        expect(nodo1.intervalo).toBe(is);
        expect(nodo2.cantMaxima).toBe(cme);
        expect(nodo2.intervalo).toBe(ie);

        //que los nodos se intercambien de listas
        expect(modelo.nodosEntrada.some(function (n) {
            return n.id == nodo2.id;
        })).toBe(true);
        expect(modelo.nodosSalida.some(function (n) {
            return n.id == nodo1.id;
        })).toBe(true);

        //que no cambien los valores de nodo1 y nodo2 del scope
        expect(scopeMock.nodoEntrada.cantMaxima).toBe(cme);
        expect(scopeMock.nodoEntrada.intervalo).toBe(ie);
        expect(scopeMock.nodoSalida.cantMaxima).toBe(cms);
        expect(scopeMock.nodoSalida.intervalo).toBe(is);
    })
});

var loggearNodos = function(nodos) {
    console.log("");
    for (i=0;i<nodos.length;i++) {
        var str = "";
        if (i==0 || i==nodos.length-1) str+="         ";
        for (j=0;j<nodos[i].length;j++) {
            if (!nodos[i][j]) continue;
            str+=" "+nodos[i][j].id;
        }
        console.log(str);
    }
}

var loggearModelo = function(modelo) {
    var horizontales = modelo.callesHorizontales;
    var verticales = modelo.callesVerticales;
    console.log("");
    console.log("H");
    horizontales.forEach(function (calle) {
        var str = "";
        calle.cuadras.forEach(function (cuadra) {
            str+="(O:"+cuadra.nodoOrigen+" D:"+cuadra.nodoDestino+") ";
        });
        console.log(str);
    });
    console.log("V");
    verticales.forEach(function (calle) {
        var str = "";
        calle.cuadras.forEach(function (cuadra) {
            str+="(O:"+cuadra.nodoOrigen+" D:"+cuadra.nodoDestino+") ";
        });
        console.log(str);
    });
}

var getIds = function(listaNodos) {
    var str = "";
    listaNodos.forEach(function (n) {
        str+=" "+n.id;
    });
    return str;
}

var getIdsCalle = function (calles) {
    var str = "";
    calles.forEach(function (calle) {
        calle.cuadras.forEach(function (cuadra) {
            str+=" "+cuadra.id;
        });
    });
    return str;
}

var getIdsAuxNodos = function (aux) {
    var str = "";
    aux.forEach(function (fila) {
        fila.forEach(function (n) {
            str+=" "+n.id;
        });
    });
    return str;
}