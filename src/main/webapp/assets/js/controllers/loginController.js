/**
 * Created by bruno on 26/07/16.
 */
app.controller("loginController", function($scope,$location,MyService,$rootScope){

    var jsa={a:'pppp',b:'fffff',c:{d:'eeeeee',e:'fdsfsdf'}};

    new Firebase();

    $scope.entro=function () {

            const email = $scope.mail;

            const pass = $scope.pass;

            const auth = firebase.auth();

            const promise = auth.signInWithEmailAndPassword(email, pass).catch(function(error){console.log(error);});

            console.log("hola");

            console.log(auth.currentUser);

            firebase.auth().onAuthStateChanged(function (user) {
                console.log('authStateChanged', user);
                if (user) {
                    $rootScope.uid = user.uid;
                    writeUserData(user.uid,'pepe','pepe@kkkerkc.com','libro1');
                    var up={};
                    up['/UserId/libros/2/']='libro2';
                    up['/UserId/libros/3/']='libro3';
                    firebase.database().ref().update(up);
                    firebase.database().ref().push(jsa);
                }
            },function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
         //       console.log(error);
            }
        );

    }


    function writeUserData(userId, name, email,libros) {
        firebase.database().ref().child('UserId').set({
            username: name,
            email: email,
            libros: libros,
        });
    }

});