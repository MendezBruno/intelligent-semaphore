/**
 * Created by bruno on 14/10/2016.
 */
app.controller('resultadoController', function($scope,Resultados,$cookies,$timeout,$routeParams) {

    var sesion = $cookies.get(claveSesionUsuario);

    if (!sesion) {
        $location.url("/app/login");
    }

    $scope.resultado = function () {
        //ACA ESTOY PIDIENDO ACTUALIZACIONES AL ENDPOINT DEL BACKEND
        Resultados.query(function (data) {
            console.log("Resultados Trae:");
            console.log(data);
            });
    };

    var inicializarTiempoSemaforo = function (cantGenes) {
        var array = new Array();
        for (var i=1; i<cantGenes+1; i++){
            var item = {};
            item.id = i;
            array.push(item);
        }
        return array;
    }

     var cargarScopeConMejorTiempoSemaforo = function (datalini) {
         //sort de datalini por aptitud
         datalini.sort(function (tcaA, tcaB) {
             return tcaA - tcaB;});
         $scope.tiempoSemaforo = inicializarTiempoSemaforo(datalini[0].cromosoma.genes.length /2);
         var elMejor = datalini[0].cromosoma;
         var elSegundo = datalini[1].cromosoma;
         var elTercero = datalini[2].cromosoma;

         var tiempoH = 0;
         var tiempoV = 1;
         $scope.tiempoSemaforo.forEach(function (item) {
                 item.tiempoUnoH = elMejor.genes[tiempoH];
                 item.tiempoUnoV = elMejor.genes[tiempoV];
                 item.tiempoDosH = elSegundo.genes[tiempoH];
                 item.tiempoDosV = elSegundo.genes[tiempoV];
                 item.tiempoTresH = elTercero.genes[tiempoH];
                 item.tiempoTresV = elTercero.genes[tiempoV];
             tiempoH++;
             tiempoV++;
             } );
     };


    var ejecutarCargarResultados = function () {
        Resultados.query(function (data) {
            console.log("Resultados Trae:");
            console.log(data);
            if (data.tiempoCromosomaAptitud) {
                cargarScopeConMejorTiempoSemaforo(data.tiempoCromosomaAptitud);
                $scope.tiempoCromosoma = true;
            }

            if (data.tiempoCongestion) {
                drawChartLinearTiempoCongestion(data);
            }
            if (data.tiempoCongestionXcuadra){
                //drawChartLineasCongestionXCuadra(data.tiempoCongestionXcuadra);
                drawHistogramaCuadras(data.tiempoCongestionXcuadra)
            }
            if (data.tiempoVelocidad){
                drawChartLinearTiempoVelocidad(data);
            }
            if (data.tiempoVelocidadXCuadra){

                drawChartVelocidadXCuadra(data);
            }

            if(data.tiempoAptitud){

            }

        });

    };

    var iniciar = function() {
        var mapa = json_mapas[$routeParams.id];
        var modelo1 = MapaEditor.desParsear(JSON.stringify(mapa));
        //var modelo1 = MapaEditor.desParsear(mapas["modulo6"])
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

        $("#canvas-container").height($("#mapa").height())

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

    if(window.json_mapas)
        iniciar();
    else
        updateMapasFirebase(iniciar,sesion);

   //imprimirEnPdf();

    $scope.printPDF = function() {
    window.print();
    }



});