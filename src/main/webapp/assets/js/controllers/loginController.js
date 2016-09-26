/**
 * Created by bruno on 26/07/16.
 */
app.controller("loginController", function($scope,$location,MyService){

    var config = {
        apiKey: "AIzaSyCmWi3yQ4tnJ_ReiqQLOy1WnSLVcQTVGsY",
        authDomain: "mi-proyecto-c72af.firebaseapp.com",
        databaseURL: "https://mi-proyecto-c72af.firebaseio.com",
        storageBucket: "mi-proyecto-c72af.appspot.com",
        messagingSenderId: "150312729443"
    };
    firebase.initializeApp(config);

    $scope.entro=function () {

        try {

            const email = $scope.mail;

            const pass = $scope.pass;

            const auth = firebase.auth();

            const promise = auth.signInWithEmailAndPassword(email, pass);

            firebase.auth().onAuthStateChanged(function(user) {
                console.log('authStateChanged', user);
                if (user) {
                    console.log("Welcome UID:" + user.uid);
                }
            });
        }

        catch (err)
        {

            promise.catch(err.message);

        }

    }

});