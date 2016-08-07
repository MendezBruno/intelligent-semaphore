/**
 * Created by Ezequiel on 06/08/2016.
 */

describe("redimensionar el mapa", function () {
    var logica;
    var stageMock;
    var modelo;

    beforeEach(function () {
        stageMock = {
            canvas: {},
            update: function () { }
        };
        logica = new GrillaController(3,3,40,stageMock,{});
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
});

var loggearNodos = function(nodos) {
    for (i=0;i<nodos.length;i++) {
        var str = "";
        for (j=0;j<nodos[i].length;j++) {
            if (!nodos[i][j]) continue;
            str+=" "+nodos[i][j].id;
        }
        console.log(str);
    }
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