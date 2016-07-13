var app, deps;

deps = ['angularBootstrapNavTree', 'ngRoute', 'ngResource', 'ngMap', 'ngTagsInput'];

// if (angular.version.full.indexOf("1.2") >= 0) {
//     deps.push('ngAnimate');
// }

app = angular.module('app', deps);

app.config(function($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'mainController'
        })
        .otherwise({
            redirectTo: '/error'
        });
});

app.factory('someFactory', ['$http', function($http) {

    var SomeFactory = {};

    SomeFactory.getSome = function () {
        return $http.get();
    };

    return SomeFactory;
}]);

app.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };
}]);
