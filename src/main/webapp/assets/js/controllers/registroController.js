/**
 * Created by maria on 4/8/2016.
 */


app.controller("registroController", function($scope,$location,$timeout){

    document.title = "Registro"

    $scope.registro = function () {

            var fueError=false;


            if (verificarPassword() && verificarMails()) {

                const email = $scope.email;

                const pass = $scope.contra;

                const auth = firebase.auth();

                const promise = auth.createUserWithEmailAndPassword(email, pass).then(function(user){

                    user.sendEmailVerification();

                    alert("Un mensaje con un link fue enviado a su casilla de correo, es necesario que presione en el link para poder loguearse");

                    var updates = {};
                    var clave = firebase.database().ref().child('/'+user.uid+'/mapas').push().key

                    updates['/'+user.uid+'/mapas/'+clave] = MapaEditor.desParsear(mapas["modulo1"])  //mapas["modulo1"];
                    firebase.database().ref().update(updates);

                    $location.url("app/login");

                    $timeout(function () {
                        $scope.$apply();
                    });

                }, function (error) {

                    tratarError(error);

                    $scope.estilo2={
                        backgroundColor:'red'
                    };
                    $timeout(function () {
                        $scope.$apply();
                    });

                });

/*

                    firebase.auth().onAuthStateChanged(function (user) {
                        if (user) {

                            user.sendEmailVerification();

                            alert("Email de verificacion enviado a su casilla de correo");

                            $location.url("app/login");

                        } else {
                            // No user is signed in.
                        }
                    });
*/
            }


    };

    function verificarMails() {

        if($scope.email == undefined || $scope.remail == undefined)
        {
            alert("Email Invalido");

            $scope.estilo2={
                backgroundColor:'red'
            };

            $timeout(function () {
                $scope.$apply();
            });

            return false;

        }

        if ($scope.email != $scope.remail)
        {

            alert("Los E-Mails no coinciden");

            $scope.estilo2={
                backgroundColor:'red'
            };
            $timeout(function () {
                $scope.$apply();
            });

            return false;

        }
        return true;

    }

    function verificarPassword() {

        if($scope.contra.length < 6 || $scope.contra.length > 20)
        {
            alert("La contraseña debe tener entre 6 y 20 caracteres");

            $scope.estilo1={
                backgroundColor:'red'
            };
            $timeout(function () {
                $scope.$apply();
            });

            return false;

        }

        if ($scope.contra != $scope.rcontra)
        {

            alert("Las contraseñas no coinciden");

            $scope.estilo1={
                backgroundColor:'red'
            };
            $timeout(function () {
                $scope.$apply();
            });

            return false;

        }
        return true;

    }

    function tratarError(error){

        if (error.code == "auth/email-already-in-use")
        {

            alert("El e-mail ya está siendo utilizado por otro usuario, ingresa uno distinto por favor");


        }

        if (error.code == "auth/invalid-email")
        {

            alert("Email Invalido");


        }

    }
});