/**
 * Created by Ezequiel on 26/07/2016.
 */


// app.run(function($rootScope){
//     $rootScope.mapeos = {
//         modulo1 : '{"callesHorizontales":[{"cantCarriles":3,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-1","nodoOrigen":"nodo-1","nodoDestino":"nodo-3"},{"longitud":100,"id":"cuadra-2","nodoOrigen":"nodo-3","nodoDestino":"nodo-4"},{"longitud":100,"id":"cuadra-3","nodoOrigen":"nodo-4","nodoDestino":"nodo-5"},{"longitud":100,"id":"cuadra-4","nodoOrigen":"nodo-5","nodoDestino":"nodo-2"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]},{"cantCarriles":5,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-5","nodoOrigen":"nodo-6","nodoDestino":"nodo-8"},{"longitud":100,"id":"cuadra-6","nodoOrigen":"nodo-8","nodoDestino":"nodo-9"},{"longitud":100,"id":"cuadra-7","nodoOrigen":"nodo-9","nodoDestino":"nodo-10"},{"longitud":100,"id":"cuadra-8","nodoOrigen":"nodo-10","nodoDestino":"nodo-7"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]},{"cantCarriles":2,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-9","nodoOrigen":"nodo-11","nodoDestino":"nodo-13"},{"longitud":100,"id":"cuadra-10","nodoOrigen":"nodo-13","nodoDestino":"nodo-14"},{"longitud":100,"id":"cuadra-11","nodoOrigen":"nodo-14","nodoDestino":"nodo-15"},{"longitud":100,"id":"cuadra-12","nodoOrigen":"nodo-15","nodoDestino":"nodo-12"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]}],"callesVerticales":[{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-13","nodoOrigen":"nodo-16","nodoDestino":"nodo-3"},{"longitud":100,"id":"cuadra-14","nodoOrigen":"nodo-3","nodoDestino":"nodo-8"},{"longitud":100,"id":"cuadra-15","nodoOrigen":"nodo-8","nodoDestino":"nodo-13"},{"longitud":100,"id":"cuadra-16","nodoOrigen":"nodo-13","nodoDestino":"nodo-17"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]},{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-17","nodoOrigen":"nodo-18","nodoDestino":"nodo-4"},{"longitud":100,"id":"cuadra-18","nodoOrigen":"nodo-4","nodoDestino":"nodo-9"},{"longitud":100,"id":"cuadra-19","nodoOrigen":"nodo-9","nodoDestino":"nodo-14"},{"longitud":100,"id":"cuadra-20","nodoOrigen":"nodo-14","nodoDestino":"nodo-19"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]},{"cantCarriles":4,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-21","nodoOrigen":"nodo-20","nodoDestino":"nodo-5"},{"longitud":100,"id":"cuadra-22","nodoOrigen":"nodo-5","nodoDestino":"nodo-10"},{"longitud":100,"id":"cuadra-23","nodoOrigen":"nodo-10","nodoDestino":"nodo-15"},{"longitud":100,"id":"cuadra-24","nodoOrigen":"nodo-15","nodoDestino":"nodo-21"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]}],"nodosEntrada":[{"id":"nodo-1"},{"id":"nodo-6"},{"id":"nodo-11"},{"id":"nodo-16"},{"id":"nodo-18"},{"id":"nodo-20"}],"nodosSalida":[{"id":"nodo-2"},{"id":"nodo-7"},{"id":"nodo-12"},{"id":"nodo-17"},{"id":"nodo-19"},{"id":"nodo-21"}],"nodosSemaforo":[],"nodosNoSemaforo":[{"id":"nodo-3"},{"id":"nodo-4"},{"id":"nodo-5"},{"id":"nodo-8"},{"id":"nodo-9"},{"id":"nodo-10"},{"id":"nodo-13"},{"id":"nodo-14"},{"id":"nodo-15"}],"nombre":""}',}
// })



app.controller('galeriaController', function($scope,$location,MyService,$sce,$rootScope) {

    var pictures =$scope.pictures=[];

    var mis_map_keys=[];
    var mis_map =[];

    var pedirMapas = function () {
        firebase.database().ref('/' + 'pepe/mapas' ).once('value', function(snapshot) {
            json_mapas = snapshot.val();
            for (var mapa1 in json_mapas) {
                var mapa = json_mapas[mapa1];

                $scope.pictures.push({
                    url: "../assets/img/logoImagen.jpg",
                    title: mapa.nombre,
                    id: mapa1
                });
            }
            $scope.$apply();
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

    };

    pedirMapas();

    $scope.addPics=function (i) {
        $scope.pictures.push({
            url:"../assets/img/logoImagen.jpg",
            title:mis_map[i].nombre
        });
        console.log(mis_map[i].nombre);
        console.log(pictures);
    };

    $scope.mostrarDB = function() {
        console.log(mapas);
        $scope.algo = mapas;
    };

    $scope.mainColWidth = function() {
        return $scope.colorValue?'col-sm-7':'col-sm-12'
    };

    $scope.mostrar=function (id) {

        var mapaElegido;

        console.log(id);

        mapaElegido = mis_map.find(function(mapa) {return mapa.nombre === id;});

        MyService.data = mapaElegido;

        $location.url("/app/editor");

    };

    $scope.mostrara=function () {

        $location.url("/app/editor/" + $scope.colorValue);

    };

    $scope.mostrara1=function () {

        $location.url("/app/reproductor/" + $scope.colorValue);

    };

    $scope.setOpacity = function(){

     document.getElementById("object-0").filter.opacity = 0.5;

    };

    $scope.itemDetail = function(link){
        $scope.detailFrame = link;
    };

    $scope.seleccionarMapa = function(picture) {
        $scope.colorValue = picture.title;
        $scope.previewSrc = $sce.trustAsResourceUrl("/app/preview/" + picture.id);
    };

    $scope.colorValue = undefined;

    //   $scope.nombres    = ['modelo1','modelo2'];

    var resize = function () {
        $("#mapasContainer").css("height",tgngviewheight-15);
        $("#mapasContainer").css("margin-bottom",15);
    };

    window.addEventListener("resize", resize);
    resize();

});