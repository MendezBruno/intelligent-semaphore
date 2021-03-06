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

                    alert("Email de verificacion enviado a su casilla de correo");

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
            alert("email o password mal ingresados");

            return false;

        }

        if ($scope.email != $scope.remail)
        {

            alert("email o password mal ingresados");

            return false;

        }
        return true;

    }

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

        if (error.code == "auth/email-already-in-use")
        {

            alert("mail en uso, por favor utilice otro mail")

        }

        if (error.code == "auth/invalid-email")
        {

            alert("email mal ingresado")

        }

    }







});