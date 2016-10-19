app.controller('mainController', function($scope,$location,$cookies) {
    $scope.location = $location;

    $scope.desloguear=function (){

        $cookies.remove(claveSesionUsuario);
        $location.url('/');

    }

});