/**
 * Created by Bruno on 26/07/16.
 */
app.controller("loginController", function($scope,$location,serveData,$rootScope,$timeout,$cookies){

    document.title = "Login"

    var jsa={a:'pppp',b:'fffff',c:{d:'eeeeee',e:'fdsfsdf'}};
    var tipo;
    var tipomodo;
    var oob;

    if ($location.absUrl().split('?')[1]!= undefined) {
        tipo = $location.absUrl().split('?')[1];
        var modo = tipo.split('&')[0];
        tipomodo = modo.split('=')[1]
    }

    if(tipomodo=="resetPassword"){
        $location.url("/app/passrecovery" + '?' + tipo);
    }

    if (tipomodo=="verifyEmail"){
        var modo1 = tipo.split('&')[1];
        oob = modo1.split('=')[1];
        const auth = firebase.auth();
        auth.applyActionCode(oob).then(function(){

            alert("Usuario Activado");

        },function(error){
            console.log(error.code);
        });

    }

    $scope.enviarMailResetPass=function () {

        if (verificarMail()) {

            var r = confirm("Esta seguro que desea restablecer la contraseña?");
            if (r == true) {

                const email = $scope.mail;
                const auth = firebase.auth();
                auth.sendPasswordResetEmail(email).then(function () {
                        alert("Un mail fue enviado a su casilla de correo");
                    }, function (error) {
                        tratarError(error);
                    }
                );


            }

            else {


            }
        }

    };

    $scope.entro=function () {
            const email = $scope.mail;
            const pass = $scope.pass;
            const auth = firebase.auth();

            if(verificarMail()) {

                const promise = auth.signInWithEmailAndPassword(email, pass).then (function (user) {

                    if (user.emailVerified)
                    {

                        serveData.uid = user.uid;
                        $cookies.put(claveSesionUsuario, user.uid);
                        $location.url("app/galeria");

                        $timeout(function () {
                            $scope.$apply();
                        });

                    }else{
                        alert("No se presiono en el link del mail enviado al usuario, se envia nuevamente un mail de verificación");
                        user.sendEmailVerification();
                    }
                },function (error) {
                    tratarError(error);
                    $timeout(function () {
                        $scope.$apply();
                    });
                });

                firebase.auth().onAuthStateChanged(function (user) {
                    console.log(user.emailVerified);
                });



/*
                catch(function (error) {

                    var errorCode = error.code;

                    console.log(errorCode);

                    if(errorCode=="auth/user-not-found") {
                        alert("Usuario o contraseña mal ingresados");
                        return;
                    }

                    if(errorCode=="auth/wrong-password") {
                        alert("Usuario o contraseña mal ingresados");
                        return;
                    }

                    return;

                }); */
            }

/*
            firebase.auth().onAuthStateChanged(function (user) {
                console.log('authStateChanged', user);
                if (user) {
                    $rootScope.uid = user.uid;
                    writeUserData(user.uid,'pepe','pepe@kkkerkc.com','libro1');
                 //   var up={};
                 //   up['/UserId/libros/2/']='libro2';
                 //   up['/UserId/libros/3/']='libro3';
                 //   firebase.database().ref().update(up);
                 //   firebase.database().ref().push(jsa);
                }
            },function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
         //       console.log(error);
            }



        ); */

    };

    function verificarMail() {

        if ($scope.mail == undefined ) {
            alert("Email Invalido");

            return false;

        }

        return true;
    }

    function tratarError(error){

        if (error.code == "auth/user-not-found")
        {

            alert("Error: usuario inexistente o contraseña invalida");

        }

        if (error.code == "auth/wrong-password")
        {

            alert("Error: usuario inexistente o contraseña invalida");

        }
        if (error.code == "auth/invalid-email")
        {

            alert("Email Invalido");

        }
    }
    function writeUserData(userId, name, email,libros) {
        firebase.database().ref().child('UserId').set({
            username: name,
            email: email,
            libros: libros,
        });
    }

});