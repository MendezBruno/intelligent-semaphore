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

        .when('/login', {
            templateUrl: 'views/home.html',
            controller: 'loginController'
        })

        .when('/passrecovery', {
            templateUrl: 'views/home.html',
            controller: 'loginController'
        })

        .when('/editor', {
            templateUrl: 'views/editor.html',
            controller: 'editorController'
        })

        .when('/galeria', {
            templateUrl: 'views/galeria.html',
            controller: 'galeriaController'
        })

        .when('/reproductor', {
            templateUrl: 'views/reproductor.html',
            controller: 'reproductorController'
        });
});


app.factory("Favorito", ['$resource', function($resource) {
    return  $resource("/api_v1.0/favorites/:id", null,
        {
            'query': { method:'GET', isArray: false }
        });
}]);
