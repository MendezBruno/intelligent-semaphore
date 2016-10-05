app.controller('previewController', function($scope,Mapa,MyService,$routeParams,$location,$timeout) {
    // var mapa = $routeParams.id ? mapasPreview[$routeParams.id]:mapas["modulo1"];
    var mapa = parent.json_mapas[$routeParams.id];
    var modelo1 = MapaEditor.desParsear(JSON.stringify(mapa));
    $scope.callesV= modelo1.callesHorizontales[0].cuadras.length - 1;
    $scope.callesH= modelo1.callesVerticales[0].cuadras.length - 1;
    $scope.nombre=modelo1.nombre;
    $scope.intervalo = 5; //se puede settear en el reproductor antes de arrancar
    var stage = new createjs.Stage("mapa");
    var logica = new GrillaController(3,3,30,stage,$scope,$timeout);
    logica.setModelo(modelo1);
    logica.redibujar();
});