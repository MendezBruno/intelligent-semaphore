/**
 * Created by Ezequiel on 26/07/2016.
 */

app.controller('reproductorController', function($scope) {



        $scope.algunaVariable = 1111;
        //var stageReproductor = new createjs.Stage("reproductor");
        //stageReproductor.addChild(new CnvCuadraReproductor(0,0,200,5,"#b3b3b3",false));
        //createjs.Ticker.on("tick", stageReproductor);
        //stageReproductor.update();
        //console.log(stageReproductor);

        var stageReproductor = new createjs.Stage("reproductor");
        stageReproductor.addChild(new CnvSemaforo());
        var logicaReproductor = new ReproductorController($scope.modelo,stageReproductor,$scope);
        createjs.Ticker.on("tick", stageReproductor);
        stageReproductor.update();
        console.log(stageReproductor);

});