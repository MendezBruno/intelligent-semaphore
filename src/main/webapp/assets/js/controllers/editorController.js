/**
 * Created by Ezequiel on 26/07/2016.
 */

app.controller('editorController', function($scope,logica) {

    var stage;

    stage = new createjs.Stage("mapa");
    logica.crearGrilla(4,4,30,stage);
    stage.update();
    logica.modificarGrilla(5,5,30,stage);
    stage.update();
    logica.modificarGrilla(3,3,30,stage);
    stage.update();
    createjs.Ticker.on("tick", stage);

    $scope.ver = function() {
        console.log($scope.callesV);
        logica.modificarGrilla(parseInt($scope.callesV),parseInt($scope.callesH),30,stage);

        stage.update();


    };

});
