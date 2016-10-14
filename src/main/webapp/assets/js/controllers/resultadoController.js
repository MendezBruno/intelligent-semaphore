/**
 * Created by bruno on 14/10/2016.
 */
app.controller('resultadoController', function($scope,Resultados,$cookies) {

    $scope.resultado = function () {

        //ACA ESTOY PIDIENDO ACTUALIZACIONES AL ENDPOINT DEL BACKEND

        Resultados.query(function (data) {
            console.log("Resultados Trae:");
            console.log(data);
            });
    };

});