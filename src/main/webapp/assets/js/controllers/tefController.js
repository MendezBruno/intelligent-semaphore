/**
 * Created by bruno on 25/9/2016.
 */

app.controller('tefController',function($scope,$location,$routeParams,Tef) {

        Tef.query(function(data){
            $scope.laTef = data.items;
        });

        $scope.actualizar = function (){
            Tef.query(function(data){
                $scope.laTef = data.items
            });
            console.log("me actualice");
        }
    }

);