/**
 * Created by Ezequiel on 26/07/2016.
 */

app.controller('editorController', function($scope) {
    $scope.ver = function() {
        console.log($scope.valor);
        $scope.valor = "nada";
    };
});
