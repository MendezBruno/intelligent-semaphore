app.controller('previewController', function($scope,Mapa,MyService,$routeParams,$location,$timeout) {
    var largo = 30;
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
    document.body.style.overflow = 'hidden';
    document.getElementById("preview").style.width = "100%"
    document.getElementById("preview").style.top = "0px"
    document.getElementById("preview").style.left = "0px"
});