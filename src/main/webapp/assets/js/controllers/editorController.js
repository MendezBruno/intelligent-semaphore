/**
 * Created by Ezequiel on 26/07/2016.
 */

app.directive('ngTouchSpin'['$timeout', '$interval',
    function($timeout, $interval) {}]);

app.controller('editorController', function($scope,Mapa,MyService,$routeParams,$location,$timeout) {
    var largo = 30;
    var coordenadascalle;

    var iniciar = function() {
        var modelo1;
        if ($routeParams.id && json_mapas[$routeParams.id]) {
            modelo1 = json_mapas[$routeParams.id]
        } else {
            modelo1 = json_mapas["modulo1"]
        }

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
        $timeout(function() {
            $scope.$apply();
        });
    }

    if(window.json_mapas)
        iniciar();
    else
        updateMapasFirebase(iniciar);

    $scope.setNombre = function() {
        modelo1.nombre = $scope.nombre;
    }

    $scope.actualizarMapa = function() {

        var valorSent = $scope.calle.sentido;

        coordenadascalle=logica.coordCuadra();

        logica.cambiarFlechas(coordenadascalle);

        $scope.calle.sentido = valorSent;

    };

    $scope.$watch('calle.sentido',function (newValue){

        if(newValue=="Oeste-Este") {
            $scope.flecha1 = "flechaDerecha.jpeg";
            $scope.flecha2 = "flechaDerecha.jpeg";
        }
        if(newValue=="Este-Oeste")
        {
            $scope.flecha1 = "flechaIzquierda.jpeg";
            $scope.flecha2 = "flechaIzquierda.jpeg";
        }

        if(newValue=="Norte-Sur")
        {
            $scope.flecha1 = "flechaAbajo.jpeg";
            $scope.flecha2 = "flechaAbajo.jpeg";
        }

        if(newValue=="Sur-Norte")
        {
            $scope.flecha1 = "flechaArriba.jpeg";
            $scope.flecha2 = "flechaArriba.jpeg";
        }

    });

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
            var newPostKey = firebase.database().ref().child('mapas').push().key;
            var updates = {};
            //Mapa.save(JSON.stringify(logica.modelo));
            alert(JSON.stringify(logica.modelo));
            $scope.modelo = logica.modelo;
            updates['/' + 'pepe' +'/mapas/' + newPostKey] = $scope.modelo;
            console.log(JSON.stringify(logica.modelo));
            mapas["moduloNuevo"] = JSON.stringify(logica.modelo);
  //          firebase.database().ref().push($scope.modelo);
            firebase.database().ref().update(updates);
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
        logica.sacarSemaforoDeCalleSacadaHorizontal(oldVal);
        for(h=0;h<(oldVal-newVal);h++)
        logica.quitarCalleHorizontal();
        coordenadascalle=logica.coordCuadra();
        logica.redibujar();
        if (logica.estaDentroDelMapa(coordenadascalle[0],coordenadascalle[1]) == true)
        logica.seleccionarCuadra(coordenadascalle);
        else
            logica.seleccionarPrimerCuadra();
    }

    $scope.quitarCalleV=function(newVal,oldVal){
        logica.sacarSemaforoDeCalleSacadaVertical(oldVal);
        for(h=0;h<(oldVal-newVal);h++)
        logica.quitarCalleVertical();
        coordenadascalle=logica.coordCuadra();
        logica.redibujar();
        if (logica.estaDentroDelMapa(coordenadascalle[0],coordenadascalle[1]) == true)
            logica.seleccionarCuadra(coordenadascalle);
        else
            logica.seleccionarPrimerCuadra();
    }
});
