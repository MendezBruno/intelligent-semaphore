app.controller('galeriaController', function($scope,$location,$sce,serveData,$cookies) {

    var sesion = $cookies.get(claveSesionUsuario)

    if (!sesion) {
        $location.url("/app/login");
    }

    var pictures =$scope.pictures=[];

    var mis_map_keys=[];
    var mis_map =[];

    var pedirMapas = function() {
        for (var mapa1 in json_mapas) {
            var mapa = json_mapas[mapa1];

            $scope.pictures.push({
                url: "../assets/img/logoImagen.jpg",
                "mapa":mapa
            });
        }
        $scope.cargado = true;
        $scope.$apply();
    };

    updateMapasFirebase(pedirMapas,sesion);

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
        if (!$scope.idSeleccionado) {
            alert('No tiene seleccionado ningún mapa');
            return;
        }
        $location.url("/app/editor/" + $scope.idSeleccionado);
    };

    $scope.mostrara1=function () {
        if (!$scope.idSeleccionado) {
            alert('No tiene seleccionado ningún mapa');
            return;
        }
        $location.url("/app/reproductor/" + $scope.idSeleccionado);
    };

    $scope.setOpacity = function(){

     document.getElementById("object-0").filter.opacity = 0.5;

    };

    $scope.itemDetail = function(link){
        $scope.detailFrame = link;
    };

    $scope.seleccionarMapa = function(picture) {
        $scope.colorValue = picture.mapa.nombre;
        $scope.idSeleccionado = picture.mapa.id;
        $scope.previewSrc = $sce.trustAsResourceUrl("/app/preview/" + picture.mapa.id);
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