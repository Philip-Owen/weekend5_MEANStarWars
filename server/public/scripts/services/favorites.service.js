swapiApp.service('FavoritesService', ['$http','$mdDialog', function($http, $mdDialog) {
  console.log('FavoritesService Loaded');

  const self = this;
  self.favorites = {list:[]};

  self.getFavorites = function() {
    $http.get('/favorites')
      .then(function (response) {
          console.log('get favorites: ', response.data);
          getFavoritesInfo(response.data);
      })
      .catch(function (response) {
          console.log('error getting favorites:', response);
      });
  };

  function getFavoritesInfo(favorites) {
    let favoritesArray = [];

    for (let i = 0; i < favorites.length; i++) {
      $http.get(favorites[i].url)
        .then(function (response) {
          // console.log('converted favorites: ', response.data);
          response.data._id = favorites[i]._id;
          if (favorites[i].hasOwnProperty('speciesInfo')) {
              response.data.speciesInfo = favorites[i].speciesInfo;
          }

          if (favorites[i].hasOwnProperty('homeworldInfo')) {
              response.data.homeworldInfo = favorites[i].homeworldInfo;
          }

            favoritesArray.push(response.data);
        })
        .catch(function (response) {
            console.log('error converting favorites:', response);
        });
      self.favorites.list = favoritesArray;
    }
  }

  self.getFavorites();

  self.removeFavorite = function(item) {
    $http.delete('/favorites/' + item._id)
      .then(function (response) {
          console.log('deleted favorite: ', response.data);
          removeFavoritesDialog(item);
          self.getFavorites();
      })
      .catch(function (response) {
          console.log('error deleting favorites:', response);
      });
  };

  function removeFavoritesDialog(favorite) {
    let item;
    if (favorite.hasOwnProperty('name')) {
      item = favorite.name;
    }
    if (favorite.hasOwnProperty('title')) {
      item = favorite.title;
    }
    $mdDialog.show(
      $mdDialog.alert()
        .clickOutsideToClose(true)
        .title('A long time ago you favorited this...')
        .textContent(`${item} has been removed from your favorites.`)
        .ariaLabel('Removed Favorite')
        .ok('May the Force be with you!')
        // Or you can specify the rect to do the transition from
        .openFrom({
          top: -50,
          width: 30,
          height: 80
        })
        .closeTo({
          left: 1500
        })
      );
    }

}]);
