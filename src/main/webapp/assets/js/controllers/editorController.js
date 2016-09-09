/**
 * Created by Ezequiel on 26/07/2016.
 */

app.directive('ngTouchSpin'['$timeout', '$interval',
    function($timeout, $interval) {}]);

app.controller('editorController', function($scope,Mapa,MyService,$routeParams,$location,$timeout) {
    var largo = 30;
    var coordenadascalle;
    var mapa = $routeParams.id ? mapas[$routeParams.id]:mapas["modulo1"];
    var modelo1 = MapaEditor.desParsear(mapa);
    $scope.callesV= modelo1.callesHorizontales[0].cuadras.length - 1;
    $scope.callesH= modelo1.callesVerticales[0].cuadras.length - 1;
    $scope.nombre=modelo1.nombre;
    $scope.intervalo = 5; //se puede settear en el reproductor antes de arrancar
    var stage = new createjs.Stage("mapa");
    var logica = new GrillaController(3,3,largo,stage,$scope,$timeout);
    createjs.Ticker.on("tick", stage);
    logica.setModelo(modelo1);
    logica.redibujar();
    logica.seleccionarPrimerCuadra();

    $scope.$watch('callesH',function (newValue,oldValue){
        if (newValue===oldValue) {
            return;
        }
        if (newValue>oldValue) {
            $scope.agregarCalleH(newValue,oldValue);
        }
        if (newValue<oldValue) {
            $scope.quitarCalleH(newValue,oldValue);
        }
    });

    $scope.$watch('callesV',function (newValue,oldValue){

        if (newValue===oldValue) {
            return;
        }

        if (newValue>oldValue) {
            $scope.agregarCalleV(newValue,oldValue);
        }
        if (newValue<oldValue) {
            $scope.quitarCalleV(newValue,oldValue);
        }

    });

    $scope.generarMapa = function(){
        if ($scope.nombre != "") {
            console.log(JSON.stringify(logica.modelo));
            //Mapa.save(JSON.stringify(logica.modelo));
            //alert(JSON.stringify(logica.modelo))
            $scope.modelo = logica.modelo;
            mapas["moduloNuevo"] = JSON.stringify(logica.modelo);
            $location.url("app/reproductor/moduloNuevo");
        }
        else
        {
            alert("Debe ingresar un nombre al mapa para poder generarlo.");
        }
    }

    $scope.actualizar = function (){
    };

    $scope.agregarCalleH = function (newVal,oldVal) {
        for(h=0;h<(newVal-oldVal);h++)
        logica.agregarCalleHorizontal();
        coordenadascalle=logica.coordCuadra();
        logica.redibujar();
        logica.seleccionarCuadra(coordenadascalle);
    };

    $scope.agregarCalleV = function (newVal,oldVal) {
        for(h=0;h<(newVal-oldVal);h++)
        logica.agregarCalleVertical();
        coordenadascalle=logica.coordCuadra();
        logica.redibujar();
        logica.seleccionarCuadra(coordenadascalle);
    }

    $scope.quitarCalleH= function(newVal,oldVal){
        for(h=0;h<(oldVal-newVal);h++)
        logica.quitarCalleHorizontal();
        coordenadascalle=logica.coordCuadra();
        logica.redibujar();
        if (logica.estaDentroDelMapa(coordenadascalle[3],coordenadascalle[0]) == true)
        logica.seleccionarCuadra(coordenadascalle);
        else
            logica.seleccionarPrimerCuadra();
    }

    $scope.quitarCalleV=function(newVal,oldVal){
        for(h=0;h<(oldVal-newVal);h++)
        logica.quitarCalleVertical();
        coordenadascalle=logica.coordCuadra();
        logica.redibujar();
        if (logica.estaDentroDelMapa(coordenadascalle[1],coordenadascalle[2]) == true)
            logica.seleccionarCuadra(coordenadascalle);
        else
            logica.seleccionarPrimerCuadra();
    }
});
