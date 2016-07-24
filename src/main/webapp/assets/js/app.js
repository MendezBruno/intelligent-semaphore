
var app = angular.module('app', ['ngRoute', 'ngResource', 'ngMap']);

app.run(['$rootScope', '$window', '$location', 'fbAuth',
    function($rootScope, $window, $location, fbAuth) {

        $rootScope.cargandoHttp=true;
        $rootScope.splashes = splashes;



    }]);

app.config(function($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider

        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'emptyController'
        })
        .when('/app', {
            templateUrl: 'views/home.html',
            controller: 'mainController'
        });


});

