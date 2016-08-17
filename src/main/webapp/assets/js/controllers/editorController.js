/**
 * Created by Ezequiel on 26/07/2016.
 */

app.directive('ngTouchSpin'['$timeout', '$interval',
    function($timeout, $interval) {}]);

app.controller('editorController', function($scope,Mapa,MyService) {

    var stage;
    var largo = 30;

  //  var mapa = '{"callesHorizontales":[{"cantCarriles":3,"sentido":"Este-Oeste","cuadras":[{"longitud":100,"id":"cuadra-1","nodoOrigen":"nodo-1","nodoDestino":"nodo-3"},{"longitud":100,"id":"cuadra-2","nodoOrigen":"nodo-3","nodoDestino":"nodo-4"},{"longitud":100,"id":"cuadra-3","nodoOrigen":"nodo-4","nodoDestino":"nodo-5"},{"longitud":100,"id":"cuadra-4","nodoOrigen":"nodo-5","nodoDestino":"nodo-2"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]},{"cantCarriles":5,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-5","nodoOrigen":"nodo-6","nodoDestino":"nodo-8"},{"longitud":100,"id":"cuadra-6","nodoOrigen":"nodo-8","nodoDestino":"nodo-9"},{"longitud":100,"id":"cuadra-7","nodoOrigen":"nodo-9","nodoDestino":"nodo-10"},{"longitud":100,"id":"cuadra-8","nodoOrigen":"nodo-10","nodoDestino":"nodo-7"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]},{"cantCarriles":2,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-9","nodoOrigen":"nodo-11","nodoDestino":"nodo-13"},{"longitud":100,"id":"cuadra-10","nodoOrigen":"nodo-13","nodoDestino":"nodo-14"},{"longitud":100,"id":"cuadra-11","nodoOrigen":"nodo-14","nodoDestino":"nodo-15"},{"longitud":100,"id":"cuadra-12","nodoOrigen":"nodo-15","nodoDestino":"nodo-12"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]}],"callesVerticales":[{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-13","nodoOrigen":"nodo-16","nodoDestino":"nodo-3"},{"longitud":100,"id":"cuadra-14","nodoOrigen":"nodo-3","nodoDestino":"nodo-8"},{"longitud":100,"id":"cuadra-15","nodoOrigen":"nodo-8","nodoDestino":"nodo-13"},{"longitud":100,"id":"cuadra-16","nodoOrigen":"nodo-13","nodoDestino":"nodo-17"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]},{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-17","nodoOrigen":"nodo-18","nodoDestino":"nodo-4"},{"longitud":100,"id":"cuadra-18","nodoOrigen":"nodo-4","nodoDestino":"nodo-9"},{"longitud":100,"id":"cuadra-19","nodoOrigen":"nodo-9","nodoDestino":"nodo-14"},{"longitud":100,"id":"cuadra-20","nodoOrigen":"nodo-14","nodoDestino":"nodo-19"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]},{"cantCarriles":4,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-21","nodoOrigen":"nodo-20","nodoDestino":"nodo-5"},{"longitud":100,"id":"cuadra-22","nodoOrigen":"nodo-5","nodoDestino":"nodo-10"},{"longitud":100,"id":"cuadra-23","nodoOrigen":"nodo-10","nodoDestino":"nodo-15"},{"longitud":100,"id":"cuadra-24","nodoOrigen":"nodo-15","nodoDestino":"nodo-21"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]}],"nodosEntrada":[{"id":"nodo-1"},{"id":"nodo-6"},{"id":"nodo-11"},{"id":"nodo-16"},{"id":"nodo-18"},{"id":"nodo-20"}],"nodosSalida":[{"id":"nodo-2"},{"id":"nodo-7"},{"id":"nodo-12"},{"id":"nodo-17"},{"id":"nodo-19"},{"id":"nodo-21"}],"nodosSemaforo":[],"nodosNoSemaforo":[{"id":"nodo-3"},{"id":"nodo-4"},{"id":"nodo-5"},{"id":"nodo-8"},{"id":"nodo-9"},{"id":"nodo-10"},{"id":"nodo-13"},{"id":"nodo-14"},{"id":"nodo-15"}],"nombre":""}';
  //  var modelo = JSON.parse(mapa);

    var mapa1 = '{"callesHorizontales":[{"cantCarriles":2,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-1","nodoOrigen":"nodo-1","nodoDestino":"nodo-3"},{"longitud":100,"id":"cuadra-2","nodoOrigen":"nodo-3","nodoDestino":"nodo-4"},{"longitud":100,"id":"cuadra-3","nodoOrigen":"nodo-4","nodoDestino":"nodo-5"},{"longitud":100,"id":"cuadra-4","nodoOrigen":"nodo-5","nodoDestino":"nodo-2"},{"longitud":100,"id":"cuadra-32","nodoOrigen":"nodo-27","nodoDestino":"nodo-2"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]},{"cantCarriles":2,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-5","nodoOrigen":"nodo-6","nodoDestino":"nodo-8"},{"longitud":100,"id":"cuadra-6","nodoOrigen":"nodo-8","nodoDestino":"nodo-9"},{"longitud":100,"id":"cuadra-7","nodoOrigen":"nodo-9","nodoDestino":"nodo-10"},{"longitud":100,"id":"cuadra-8","nodoOrigen":"nodo-10","nodoDestino":"nodo-7"},{"longitud":100,"id":"cuadra-33","nodoOrigen":"nodo-28","nodoDestino":"nodo-7"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]},{"cantCarriles":2,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-9","nodoOrigen":"nodo-11","nodoDestino":"nodo-13"},{"longitud":100,"id":"cuadra-10","nodoOrigen":"nodo-13","nodoDestino":"nodo-14"},{"longitud":100,"id":"cuadra-11","nodoOrigen":"nodo-14","nodoDestino":"nodo-15"},{"longitud":100,"id":"cuadra-12","nodoOrigen":"nodo-15","nodoDestino":"nodo-12"},{"longitud":100,"id":"cuadra-34","nodoOrigen":"nodo-29","nodoDestino":"nodo-12"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]},{"cantCarriles":2,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-28","nodoOrigen":"nodo-25","nodoDestino":"nodo-22"},{"longitud":100,"id":"cuadra-29","nodoOrigen":"nodo-22","nodoDestino":"nodo-23"},{"longitud":100,"id":"cuadra-30","nodoOrigen":"nodo-23","nodoDestino":"nodo-24"},{"longitud":100,"id":"cuadra-31","nodoOrigen":"nodo-24","nodoDestino":"nodo-26"},{"longitud":100,"id":"cuadra-35","nodoOrigen":"nodo-30","nodoDestino":"nodo-26"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]}],"callesVerticales":[{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-13","nodoOrigen":"nodo-16","nodoDestino":"nodo-3"},{"longitud":100,"id":"cuadra-14","nodoOrigen":"nodo-3","nodoDestino":"nodo-8"},{"longitud":100,"id":"cuadra-15","nodoOrigen":"nodo-8","nodoDestino":"nodo-13"},{"longitud":100,"id":"cuadra-16","nodoOrigen":"nodo-13","nodoDestino":"nodo-17"},{"longitud":100,"id":"cuadra-25","nodoOrigen":"nodo-22","nodoDestino":"nodo-17"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]},{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-17","nodoOrigen":"nodo-18","nodoDestino":"nodo-4"},{"longitud":100,"id":"cuadra-18","nodoOrigen":"nodo-4","nodoDestino":"nodo-9"},{"longitud":100,"id":"cuadra-19","nodoOrigen":"nodo-9","nodoDestino":"nodo-14"},{"longitud":100,"id":"cuadra-20","nodoOrigen":"nodo-14","nodoDestino":"nodo-19"},{"longitud":100,"id":"cuadra-26","nodoOrigen":"nodo-23","nodoDestino":"nodo-19"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]},{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-21","nodoOrigen":"nodo-20","nodoDestino":"nodo-5"},{"longitud":100,"id":"cuadra-22","nodoOrigen":"nodo-5","nodoDestino":"nodo-10"},{"longitud":100,"id":"cuadra-23","nodoOrigen":"nodo-10","nodoDestino":"nodo-15"},{"longitud":100,"id":"cuadra-24","nodoOrigen":"nodo-15","nodoDestino":"nodo-21"},{"longitud":100,"id":"cuadra-27","nodoOrigen":"nodo-24","nodoDestino":"nodo-21"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]},{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-36","nodoOrigen":"nodo-31","nodoDestino":"nodo-27"},{"longitud":100,"id":"cuadra-37","nodoOrigen":"nodo-27","nodoDestino":"nodo-28"},{"longitud":100,"id":"cuadra-38","nodoOrigen":"nodo-28","nodoDestino":"nodo-29"},{"longitud":100,"id":"cuadra-39","nodoOrigen":"nodo-29","nodoDestino":"nodo-30"},{"longitud":100,"id":"cuadra-40","nodoOrigen":"nodo-30","nodoDestino":"nodo-32"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]}],"nodosEntrada":[{"id":"nodo-1"},{"id":"nodo-6"},{"id":"nodo-11"},{"id":"nodo-16"},{"id":"nodo-18"},{"id":"nodo-20"},{"id":"nodo-25"},{"id":"nodo-31"}],"nodosSalida":[{"id":"nodo-2"},{"id":"nodo-7"},{"id":"nodo-12"},{"id":"nodo-17"},{"id":"nodo-19"},{"id":"nodo-21"},{"id":"nodo-26"},{"id":"nodo-32"}],"nodosSemaforo":[{"id":"nodo-4"}],"nodosNoSemaforo":[{"id":"nodo-3"},{"id":"nodo-5"},{"id":"nodo-8"},{"id":"nodo-9"},{"id":"nodo-10"},{"id":"nodo-13"},{"id":"nodo-14"},{"id":"nodo-15"},{"id":"nodo-22"},{"id":"nodo-23"},{"id":"nodo-24"},{"id":"nodo-27"},{"id":"nodo-28"},{"id":"nodo-29"},{"id":"nodo-30"}],"nombre":""}'


    var modelo1 = JSON.parse(mapa1);

    $scope.callesH = 3;

    $scope.callesV = 3;

   // $scope.cantCarriles = 3;

    console.log("hola");

    stage = new createjs.Stage("mapa");
    var logica = new GrillaController(3,3,largo,stage,$scope);
    logica.redibujar();
    stage.update();
    createjs.Ticker.on("tick", stage);

 //   var modelo = JSON.parse(JSON.stringify(MyService.data));

 //     modelo1.__proto__ = MapaEditor.prototype;

 //     logica.modelo=modelo1;

 //     logica.galeriaMapa(MyService.data);

 //     logica.redibujar();
 //     stage.update();

    $scope.$watch('callesH',function (newValue,oldValue){

        if (newValue===oldValue) {
            return;
        }

        if (newValue>oldValue) {
            $scope.agregarCalleH(newValue,oldValue);
        }
        if (newValue<oldValue) {
            $scope.quitarCalleH(newValue,oldValue);
        }

    });

    $scope.$watch('callesV',function (newValue,oldValue){

        if (newValue===oldValue) {
            return;
        }

        if (newValue>oldValue) {
            $scope.agregarCalleV(newValue,oldValue);
        }
        if (newValue<oldValue) {
            $scope.quitarCalleV(newValue,oldValue);
        }

    });

    $scope.generarMapa = function(){
        console.log(JSON.stringify(logica.modelo));
        Mapa.save(JSON.stringify(logica.modelo));
        alert(JSON.stringify(logica.modelo))
        $scope.modelo = logica.modelo;
    }

    $scope.actualizar = function (){
    };

    $scope.agregarCalleH = function (newVal,oldVal) {
        for(h=0;h<(newVal-oldVal);h++)
        logica.agregarCalleHorizontal();
        logica.redibujar();
    };

    $scope.agregarCalleV = function (newVal,oldVal) {
        for(h=0;h<(newVal-oldVal);h++)
        logica.agregarCalleVertical();
        logica.redibujar();
    }

    $scope.quitarCalleH= function(newVal,oldVal){
        for(h=0;h<(oldVal-newVal);h++)
        logica.quitarCalleHorizontal();
        logica.redibujar();
    }

    $scope.quitarCalleV=function(newVal,oldVal){
        for(h=0;h<(oldVal-newVal);h++)
        logica.quitarCalleVertical();
        logica.redibujar();

    }

    var mapa = {
        nombre: "San telmo",
        nodosEntrada: [
            {
                id:"nodo-1",
                cantMaxima:1,
                intervalo:5
            },
            {
                id:"nodo-2",
                cantMaxima:1,
                intervalo:5
            },
            {
                id:"nodo-3",
                cantMaxima:1,
                intervalo:5
            },
            {
                id:"nodo-4",
                cantMaxima:1,
                intervalo:5
            }
        ],
        nodosSalida: [
            {
                id:"nodo-5",
                cantMaxima:1,
                intervalo:5
            },
            {
                id:"nodo-6",
                cantMaxima:1,
                intervalo:5
            },
            {
                id:"nodo-7",
                cantMaxima:1,
                intervalo:5
            },
            {
                id:"nodo-8",
                cantMaxima:1,
                intervalo:5
            }
        ],
        nodosSemaforo: [
            {
                id:"nodo-9",
                tiempoVertical: 120,
                tiempoHorizontal: 120
            }
        ],
        nodosNoSemaforo: [
            {
                id: "nodo-10"
            },
            {
                id: "nodo-11"
            },
            {
                id: "nodo-12"
            }
        ],
        callesVerticales: [
            {
                cantCarriles:2,
                sentido:"Norte-Sur",
                preferencia: 2,
                cuadras: [
                    {
                        id: "cuadra-1",
                        longitud: 100,
                        nodoOrigen: "nodo-1",
                        nodoDestino: "nodo-9"
                    },
                    {
                        id: "cuadra-2",
                        longitud: 100,
                        nodoOrigen: "nodo-9",
                        nodoDestino: "nodo-10"
                    },
                    {
                        id: "cuadra-3",
                        preferencia: 1,
                        longitud: 100,
                        nodoOrigen: "nodo-10",
                        nodoDestino: "nodo-5"
                    }
                ]
            },
            {
                cantCarriles:2,
                sentido:"Norte-Sur",
                preferencia: 2,
                cuadras: [
                    {
                        id: "cuadra-4",
                        longitud: 100,
                        nodoOrigen: "nodo-2",
                        nodoDestino: "nodo-11"
                    },
                    {
                        id: "cuadra-5",
                        longitud: 100,
                        nodoOrigen: "nodo-11",
                        nodoDestino: "nodo-12"
                    },
                    {
                        id: "cuadra-6",
                        longitud: 100,
                        nodoOrigen: "nodo-12",
                        nodoDestino: "nodo-6"
                    }
                ]
            }
        ],
        callesHorizontales: [
            {
                cantCarriles:2,
                sentido:"Oeste-Este",
                preferencia: 2,
                cuadras: [
                    {
                        id: "cuadra-7",
                        longitud: 100,
                        nodoOrigen: "nodo-4",
                        nodoDestino: "nodo-9"
                    },
                    {
                        id: "cuadra-8",
                        longitud: 100,
                        nodoOrigen: "nodo-9",
                        nodoDestino: "nodo-11"
                    },
                    {
                        id: "cuadra-9",
                        longitud: 100,
                        nodoOrigen: "nodo-11",
                        nodoDestino: "nodo-7"
                    }
                ]
            },
            {
                cantCarriles:2,
                sentido:"Oeste-Este",
                preferencia: 2,
                cuadras: [
                    {
                        id: "cuadra-10",
                        longitud: 100,
                        nodoOrigen: "nodo-4",
                        nodoDestino: "nodo-10"
                    },
                    {
                        id: "cuadra-11",
                        longitud: 100,
                        nodoOrigen: "nodo-10",
                        nodoDestino: "nodo-12"
                    },
                    {
                        id: "cuadra-12",
                        longitud: 100,
                        nodoOrigen: "nodo-12",
                        nodoDestino: "nodo-8"
                    }
                ]
            }
        ]
    };
});
