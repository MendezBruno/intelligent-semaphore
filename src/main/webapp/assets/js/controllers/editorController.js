/**
 * Created by Ezequiel on 26/07/2016.
 */

app.controller('editorController', function($scope,logica) {

    var stage;

    stage = new createjs.Stage("mapa");
    logica.crearGrilla(4,4,30,stage);
    createjs.Ticker.on("tick", stage);
    logica.modificarGrilla(3,3,30,stage);
    stage.update();

    $scope.ver = function($event) {
        console.log($scope.callesV);

    };
});
