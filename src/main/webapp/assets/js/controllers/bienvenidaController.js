/**
 * Created by maria on 25/8/2016.
 */

app.controller('bienvenidaController', function($scope,$timeout,$location) {


    $timeout( function() {
        $location.url("/app/login");
    }, 4000 );

})