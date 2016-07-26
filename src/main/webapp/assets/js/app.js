var app = angular.module('app', ['ngRoute','ngResource']);

app.run(['$rootScope',
    function($rootScope) {

        $rootScope.cargandoHttp=true;
        //$rootScope.splashes = splashes;



    }]);

app.config(function($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider

        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'mainController'
        })
        .when('/app', {
            templateUrl: 'views/home.html',
            controller: 'mainController'
        });


});


app.factory("Favorito", ['$resource', function($resource) {
    return  $resource("/api_v1.0/favorites/:id", null,
        {
            'query': { method:'GET', isArray: false }
        });
}]);
