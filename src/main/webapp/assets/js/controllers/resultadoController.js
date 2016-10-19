/**
 * Created by bruno on 14/10/2016.
 */
app.controller('resultadoController', function($scope,Resultados,$cookies,$timeout) {

    $scope.resultado = function () {
        //ACA ESTOY PIDIENDO ACTUALIZACIONES AL ENDPOINT DEL BACKEND
        Resultados.query(function (data) {
            console.log("Resultados Trae:");
            console.log(data);
            });
    };

    var inicializarTiempoSemaforo = function (cantGenes) {
        var array = new Array();
        for (var i=1; i<cantGenes; i++){
            var item = {};
            item.id = 1;
            array.add(item);
        }
        return array;
    }

    // var cargarScopeConMejorTiempoSemaforo = function (datalini) {
    //     //sort de datalini por aptitud
    //     datalini.sort(function (tcaA, tcaB) {
    //         return tcaA - tcaB;});
    //     $scope.tiempoSemaforo = inicializarTiempoSemaforo(datalini.cromosoma.genes.size);
    //     var tresMejores = datalini.slice(0,3);
    //     tresMejores.forEach(function (cromosoma) {
    //         $scope.tiempoSemaforo.forEach(function (item) {
    //             item.tiempoUnoH = cromosoma
    //             item.tiempoUnoV =
    //             item.tiempoDosH =
    //             item.tiempoDosV =
    //             item.tiempoTresH =
    //             item.tiempoTresV =
    //         } )
    //
    //     });
    //
    //     $scope.tiempoSemaforo
    //     //armar una lista de objetos para mostrar
    //         //tiempo id es lo que esta adentro del gen
    //         //el tiempo de esa posicion
    //         //el tiempo de segundo objeto, osea la posicion 1
    //         //el tiempo del tercer objeto, o sea la posicion 2
    // };


    var ejecutarCargarResultados = function () {
        Resultados.query(function (data) {
            console.log("Resultados Trae:");
            console.log(data);
            cargarScopeConMejorTiempoSemaforo(data.tiempoCromosomaAptitud);
            drawChartLinearTiempoCongestion(data);

        });

    };

    var iniciar = function() {
        var modelo1 = MapaEditor.desParsear(mapas["modulo6"])
        $scope.callesV= modelo1.callesHorizontales[0].cuadras.length - 1;
        $scope.callesH= modelo1.callesVerticales[0].cuadras.length - 1;
        $scope.nombre=modelo1.nombre;
        $scope.intervalo = 5; //se puede settear en el reproductor antes de arrancar
        stage = new createjs.Stage("mapa");
        logica = new GrillaController(3,3,30,stage,$scope,$timeout);
        createjs.Ticker.on("tick", stage);
        logica.setModelo(modelo1);
        logica.redibujar();
        var i = 1

        logica.centrales.forEach(function(c) {
            c.forEach(function(d){
                if (d instanceof CnvNodoControl && d.esSemaforo) {
                    d.setNumero(i)
                    i++
                }
            })
        })

        $timeout(function() {
            $scope.$apply();
        });

        ejecutarCargarResultados();
    }

    iniciar();
});