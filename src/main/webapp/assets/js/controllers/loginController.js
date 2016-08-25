/**
 * Created by bruno on 26/07/16.
 */
app.controller("loginController", function($scope,$location){

    console.log("hola");

    $scope.entro=function () {

        if ($scope.mail== "admin@hotmail.com")
        {


            if ($scope.pass=="admin")
            {

                $location.url("/app/galeria")


            }
            else

            {


                alert("Contraseña o usuario mal ingresados");
            }


        }
        else
        {

            alert("Contraseña o usuario mal ingresados");

        }



    }

});