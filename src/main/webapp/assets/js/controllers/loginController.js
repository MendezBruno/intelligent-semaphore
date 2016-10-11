/**
 * Created by bruno on 26/07/16.
 */
app.controller("loginController", function($scope,$location,MyService,$rootScope,$timeout){

    var jsa={a:'pppp',b:'fffff',c:{d:'eeeeee',e:'fdsfsdf'}};

    var tipo;

    var tipomodo;


    if ($location.absUrl().split('?')[1]!= undefined) {
        tipo = $location.absUrl().split('?')[1];

        var modo = tipo.split('&')[0];

        tipomodo = modo.split('=')[1]
    }

    if(tipomodo=="resetPassword")
    {

        $location.url("/app/passrecovery" + '?' + tipo);

    }

    $scope.enviarMailResetPass=function () {

        const email = $scope.mail;

        const auth = firebase.auth();

        auth.sendPasswordResetEmail(email).then(function(){

            alert("Un mail fue enviado a su casilla de correo");


        },function (error) {

                tratarError(error);

            }

        );


    }

    $scope.entro=function () {

            const email = $scope.mail;

            const pass = $scope.pass;

            const auth = firebase.auth();

            if(verificarMail()) {

                const promise = auth.signInWithEmailAndPassword(email, pass).then (function (user) {

                    $location.url("app/galeria");

                    $timeout(function () {
                        $scope.apply();
                    });


                },function (error) {

                    tratarError(error);

                    console.log(error.code);

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
            alert("email o password mal ingresados");

            return false;

        }

        return true;
    }

    function tratarError(error){

        if (error.code == "auth/user-not-found")
        {

            alert("email mal ingresado")

        }

        if (error.code == "auth/invalid-email")
        {

            alert("email mal ingresado")

        }

    }

    function tratarError(error){

        if (error.code == "auth/user-not-found")
        {

            alert("mail ingresado incorrecto")

        }

        if (error.code == "auth/wrong-password")
        {

            alert("password mal ingresado")

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