/**
 * Created by Ezequiel on 26/07/2016.
 */

app.controller('editorController', function($scope,logica) {

    var stage;

    stage = new createjs.Stage("mapa");
    logica.crearGrilla(5,5,50,stage);

    stage.update();

    $scope.ver = function($event) {
        console.log($scope.callesV);

    };
});
