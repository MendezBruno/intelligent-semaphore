/**
 * Created by Ezequiel on 26/07/2016.
 */

app.controller('editorController', function($scope,logica) {

    var stage;

    stage = new createjs.Stage("mapa");
    logica.crearGrilla(4,4,30,stage);
    stage.update();
//    createjs.Ticker.on("tick", stage);

    $scope.ver = function($event) {
        console.log($scope.callesV);
        logica.modificarGrilla($scope.callesV,$scope.callesH,30,stage);

        stage.update();


    };
});
