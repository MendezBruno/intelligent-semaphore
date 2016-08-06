/**
 * Created by Ezequiel on 26/07/2016.
 */

app.directive('ngTouchSpin'['$timeout', '$interval',
    function($timeout, $interval) {}]);

app.controller('editorController', function($scope) {

    var stage;
    var largo = 30;

    $scope.callesH = 3;

    $scope.callesV = 3;

    console.log("hola");

    stage = new createjs.Stage("mapa");
    var logica = new GrillaController(3,3,largo,stage,$scope);
    logica.redibujar();
    stage.update();
    //logica.modificarGrilla(3,3,largo,stage);
    //stage.update();
    createjs.Ticker.on("tick", stage);

    //$scope.ver = function() {
    //    console.log($scope.callesV);
    //    logica.modificarGrilla(parseInt($scope.callesV),parseInt($scope.callesH),largo,stage);
    //    console.log($scope.cantCarriles);
    //    stage.update();
    //};

    $scope.$watch('callesH',function (newValue,oldValue){

        if (newValue===oldValue) {
            return;
        }

        if (newValue>oldValue) {
            $scope.agregarCalleH(newValue,oldValue);
        }
        if (newValue<oldValue) {
            $scope.quitarCalleH();
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
            $scope.quitarCalleV();
        }

    });

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

    $scope.quitarCalleH= function(){
        for(h=0;h<(oldValue-newValue);h++)
        logica.quitarCalleHorizontal();
        logica.redibujar();
    }

    $scope.quitarCalleV=function(){
        for(h=0;h<(oldValue-newValue);h++)
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
