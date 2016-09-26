/**
 * Created by maria on 4/8/2016.
 */


app.controller("registroController", function($scope){

    $scope.registro = function () {

        try {


            const email = $scope.email;

            const pass = $scope.contra;

            const auth = firebase.auth();

            const promise = auth.createUserWithEmailAndPassword(email, pass);

        }

        catch(err) {

            console.log(err);
        }

    }


});