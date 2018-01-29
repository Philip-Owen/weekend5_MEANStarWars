const swapiApp = angular.module('swapiApp', ['ngRoute', 'ngMaterial', 'ngMessages']);

// swapiApp configuration
swapiApp.config(function($routeProvider) {
    console.log('config loaded');
    $routeProvider
        .when('/search', {
            templateUrl: '/views/search.view.html',
            controller: 'SearchController as vm'
        })
        .when('/favorites', {
            templateUrl: '/views/favorites.view.html',
            controller: 'FavoritesController as vm'
        })
        .otherwise(
            { redirectTo: '/search' }
        );
});


