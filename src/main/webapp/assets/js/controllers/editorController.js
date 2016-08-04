/**
 * Created by Ezequiel on 26/07/2016.
 */

app.controller('editorController', function($scope,logica) {

    var stage;
    var largo = 30;

    stage = new createjs.Stage("mapa");
    logica.crearGrilla(3,3,largo,stage,$scope);
    stage.update();
    //logica.modificarGrilla(3,3,largo,stage);
    //stage.update();
    createjs.Ticker.on("tick", stage);

    $scope.ver = function() {
        console.log($scope.callesV);
        logica.modificarGrilla(parseInt($scope.callesV),parseInt($scope.callesH),largo,stage);
        console.log($scope.cantCarriles);
        stage.update();
    };

    $scope.actualizar = function (){


    };
});
