app.controller('mainController', function($scope, Favorito) {
$scope.variable= "funciono";

    Favorito.query(function(data) {
        console.log(data);
        });
});