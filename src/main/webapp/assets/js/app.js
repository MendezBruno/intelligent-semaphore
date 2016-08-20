var app = angular.module('app', ['ngRoute','ngResource']);

app.run(['$rootScope','$interval',
    function($rootScope,$interval) {
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

        .when('/app/login', {
            templateUrl: 'views/login.html',
            controller: 'loginController'
        })

        .when('/app/registro', {
            templateUrl: 'views/registro.html',
            controller: 'registroController'
        })

        .when('/app/passrecovery', {
            templateUrl: 'views/passrecovery.html',
            controller: 'passrecoveryController'
        })

        .when('/app/editor', {
            templateUrl: 'views/editor.html',
            controller: 'editorController'
        })

        .when('/app/galeria', {
            templateUrl: 'views/galeria.html',
            controller: 'galeriaController'
        })

        .when('/app/reproductor', {
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

app.factory("Mapa", ["$resource",function($resource){
    return  $resource("/api_v1.0/mapa/:id", null,
        {
            'query': { method:'GET', isArray: false }
        });
}]);

app.factory("MapaUpdate", ["$resource",function($resource){
    return  $resource("/api_v1.0/mapaUpdate", null,
        {
            'query': { method:'GET', isArray: false }
        });
}]);

