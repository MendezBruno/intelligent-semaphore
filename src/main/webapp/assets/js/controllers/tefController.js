/**
 * Created by bruno on 25/9/2016.
 */

app.controller('tefController',function($scope,$location,$routeParams,Tef) {

        $scope.laTef = [];

        Tef.query(function(data){
            $scope.laTef = data.items;
        });

        $scope.actualizar = function (){
            Tef.query(function(data){
                $scope.laTef = data.items
            });
        };

        var resize = function() {
                //$("#tg-modal-container").height($(window).height()-120);
                $scope.altura = $(window).height()-160
                $scope.estilo = {
                    "height" : $scope.altura + 'px'
                }
        };
        window.addEventListener("resize", resize);
        resize();
    }

);