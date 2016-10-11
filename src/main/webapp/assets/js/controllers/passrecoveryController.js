/**
 * Created by maria on 4/8/2016.
 */


app.controller('passrecoveryController', function($scope,$location,$timeout){

    var tipo;

    var tipomodo;


    if ($location.absUrl().split('?')[1]!= undefined) {
        tipo = $location.absUrl().split('?')[1];

        var modo = tipo.split('&')[1];

        tipomodo = modo.split('=')[1];
    }

    $scope.cambiarContra= function () {

        if (verificarPassword) {

            const auth = firebase.auth();

            auth.confirmPasswordReset(tipomodo, $scope.contra). then(
                function (){

                    alert("Se cambio satisfactoriamente la contraseña");

                    $location.url("/app/login");

                    $timeout(function () {
                        $scope.$apply();
                    });

                }, function (error) {

                tratarError(error);

            });


        }

    };

    function verificarPassword() {

        if($scope.contra.length < 10)
        {
            alert("El password tiene que tener como minimo 10 carateres");

            return false;

        }

        if ($scope.contra != $scope.rcontra)
        {

            alert("passwords no coinciden");

            return false;

        }
        return true;

    }


    function tratarError(error){

        if (error.code == "auth/expired-action-code")
        {

            alert("condigo expirado, por favor envie un nuevo mail")

        }

        if (error.code == "auth/user-disabled")
        {

            alert("Usuario deshabilitado")

        }

        if (error.code == "auth/user-not-found")
        {

            alert("Usuario no encontrado")

        }

    }

});

