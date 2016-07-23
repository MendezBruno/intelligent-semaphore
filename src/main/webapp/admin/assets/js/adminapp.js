
var adminapp = angular.module('adminapp', ['ngRoute', 'ngResource', 'ngMap']);

adminapp.run(['$rootScope', '$window', '$location',
    function($rootScope, $window, $location) {

    }]);

adminapp.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/app/admin/', {
            templateUrl: 'admin/views/home.html',
            controller: 'homeController'
        })
        .when('/app/admin/partidos', {
            templateUrl: 'admin/views/partidos.html',
            controller: 'adminPartidosController'
        })
        .when('/app/admin/usuarios', {
            templateUrl: 'admin/views/usuarios.html',
            controller: 'adminUsuariosController'
        })
        .when('/app/admin/inscripciones', {
            templateUrl: 'admin/views/inscripciones.html',
            controller: 'adminInscripcionesController'
        })
        .when('/error', {
            templateUrl: 'views/error.html',
            controller: 'emptyController'
        })
        .otherwise({
            redirectTo: '/error'
        });
});

adminapp.factory("AdminPartidos", ['$resource', function($resource) {
    return $resource("/_ah/api/partidosmanager/v1/admin/partido/:id", null,
        {
            'query': { method:'GET', isArray: false }
        });
}]);

adminapp.factory("AdminUsuarios", ['$resource', function($resource) {
    return $resource("/_ah/api/partidosmanager/v1/admin/usuario/:id", null,
        {
            'query': { method:'GET', isArray: false }
        });
}]);

adminapp.factory("AdminInscripciones", ['$resource', function($resource) {
    return $resource("/_ah/api/partidosmanager/v1/admin/inscripto/:id", null,
        {
            'query': { method:'GET', isArray: false }
        });
}]);
