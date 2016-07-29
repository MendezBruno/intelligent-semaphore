/**
 * Created by Ezequiel on 26/07/2016.
 */

app.controller('editorController', function($scope) {

    var stage;

    stage = new createjs.Stage("mapa");

    stage.addChild(new Cuadra("cuadra1",0,0,200, "#F00",true));

    stage.update();

    $scope.ver = function($event) {
        console.log($scope.callesV);

    };
});
