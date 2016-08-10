/**
 * Created by Ezequiel on 26/07/2016.
 */

app.controller('reproductorController', function($scope) {



        $scope.algunaVariable = 1111;
        var stageReproductor = new createjs.Stage("reproductor");
        var circle = new createjs.Shape();
        circle.graphics.beginFill("red").beginStroke("#000000").setStrokeStyle(1).drawCircle(0,0, 50);
        circle.x = 15;
        circle.y = 10;
        stageReproductor.addChild(circle);
        createjs.Ticker.on("tick", stageReproductor);
        stageReproductor.update();
        console.log(stageReproductor);

});