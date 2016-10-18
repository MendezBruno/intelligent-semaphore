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

    var ejecutarCargarResultados = function () {
        Resultados.query(function (data) {
            console.log("Resultados Trae:");
            console.log(data);
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