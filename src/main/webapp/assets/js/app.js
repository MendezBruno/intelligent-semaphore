
var app = angular.module('app', ['ngRoute', 'ngResource', 'ngMap']);

app.run(['$rootScope', '$window', '$location', 'fbAuth',
    function($rootScope, $window, $location, fbAuth) {

        $rootScope.cargandoHttp=true;
        $rootScope.splashes = splashes;

        $window.fbAsyncInit = function() {
            FB.init({
                appId: '793357694115348',
                status: true,
                cookie: true,
                xfbml: true
            });
            fbAuth.watchAuthenticationStatusChange();
            fbAuth.getLoginStatus();

            $rootScope.nextRoute = {templateUrl: ''};
            //Watch route changes
            $rootScope.$on( "$routeChangeStart", function(event, next, current) {

                if($rootScope.nextRoute.templateUrl != next.templateUrl &&
                    next.templateUrl != 'views/home.html' && !$rootScope.loggedUser){

                    event.preventDefault();
                    $rootScope.nextRoute = next;

                    FB.login(function(response){
                        if (response.authResponse) {
                            $location.path(next.originalPath);
                        }
                        else{
                            alert("No te logeaste correctamente!")
                        }
                    }, {
                        scope: 'user_friends, publish_actions, publish_pages'
                    });

                }
            });
        };
        (function(d){
            var js,
                id = 'facebook-jssdk',
                ref = d.getElementsByTagName('script')[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement('script');
            js.id = id;
            js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            ref.parentNode.insertBefore(js, ref);
        }(document));
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
        })
        .when('/app/recomendaciones', {
            templateUrl: 'views/recomendaciones.html',
            controller: 'recomendacionesController'
        })
        .when('/app/inscripciones', {
            templateUrl: 'views/inscripciones.html',
            controller: 'inscripcionesController'
        })
        .when('/app/partidos', {
            templateUrl: 'views/partidos.html',
            controller: 'misPartidosController'
        })
        .when('/app/partidos/nuevo', {
            templateUrl: 'views/nuevoPartido.html',
            controller: 'nuevoPartidoController'
        })
        .when('/app/partidos/:id', {
            templateUrl: 'views/partido.html',
            controller: 'partidoController'
        })
        .when('/app/friends/partidos', {
            templateUrl: 'views/friends/partidos.html',
            controller: 'friendsPartidosController'
        })
        .when('/error', {
            templateUrl: 'views/error.html',
            controller: 'emptyController'
        })
        .otherwise({
            redirectTo: '/error'
        });

    $httpProvider.interceptors.push('myHttpInterceptor');
});

app.factory('myHttpInterceptor', ['$q', '$rootScope',
    function ($q, $rootScope) {
        $rootScope.cargandoHttp=true;
        $rootScope.http = null;
        return {
            'request': function (config) {
                var xAT = config.headers["x-access-token"];
                //alert(xAT);
                //console.log(xAT);
                if (!xAT) {
                    //alert("Levantando header de localStorage....");
                    console.log("Levantando header de localStorage....");
                    config.headers["x-access-token"] = window.localStorage['accessToken'];
                    $rootScope.cargandoHttp=false;
                }
                return config;
            }
        }
    }
]);

app.factory("Partido", ['$resource', function($resource) {

    return $resource("/_ah/api/partidosmanager/v1/partido/:id", null,
        {
            'query': { method:'GET', isArray: false }
        });
}]);

app.factory("Inscripto", ['$resource', function($resource) {
    return  $resource("/_ah/api/partidosmanager/v1/inscripto/:id", null,
        {
            'query': { method:'GET', isArray: false }
        });
}]);

app.factory("PartidoInscripto", ['$resource', function($resource) {

    return $resource("/_ah/api/partidosmanager/v1/partido/:id/inscripto", null,
        {
            'query': { method:'GET', isArray: false }
        });
}]);

app.factory("FriendPartido", ['$resource', function($resource) {
    return $resource("/_ah/api/partidosmanager/v1/friends/partido/:id", null,
        {
            'query': { method:'GET', isArray: false }
        });

}]);

app.factory("Recomendacion", ['$resource', function($resource) {
    return $resource("/_ah/api/partidosmanager/v1/recomendacion/:id", null,
        {
            'query': { method:'GET', isArray: false }
        });
}]);

app.factory("AdminPartidos", ['$resource', function($resource) {
    return $resource("/_ah/api/partidosmanager/v1/admin/partido/:id", null,
        {
            'query': { method:'GET', isArray: false }
        });
}]);

app.factory("AdminUsuarios", ['$resource', function($resource) {
    return $resource("/_ah/api/partidosmanager/v1/admin/usuario/:id", null,
        {
            'query': { method:'GET', isArray: false }
        });
}]);

app.factory("AdminInscripciones", ['$resource', function($resource) {
    return $resource("/_ah/api/partidosmanager/v1/admin/inscripto/:id", null,
        {
            'query': { method:'GET', isArray: false }
        });
}]);
