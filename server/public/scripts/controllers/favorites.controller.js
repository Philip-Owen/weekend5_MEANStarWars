swapiApp.controller('FavoritesController', ['FavoritesService', function(FavoritesService) {
    // console.log('in FavoritesController');
    const self = this;

    self.favoritesToList = FavoritesService.favorites;

    self.removeFavorite = function(item) {
        FavoritesService.removeFavorite(item);
    };

}]);
