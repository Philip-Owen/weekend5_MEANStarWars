swapiApp.controller('FavoritesController', ['FavoritesService', function(FavoritesService) {
    console.log('in FavoritesController');
    const self = this;

    self.favoritesToList = FavoritesService.favorites 

    self.getFavorites = function() {
        FavoritesService.getFavorites();
    }
     
    self.getFavorites();

    console.log(self.favoritesToList);

    self.removeFavorite = function(item) {
        FavoritesService.removeFavorite(item);
    };
    

    

}]);