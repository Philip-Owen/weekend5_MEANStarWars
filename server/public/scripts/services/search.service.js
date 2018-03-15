swapiApp.service('SearchService', ['$http', '$mdDialog', 'FavoritesService', function($http, $mdDialog, FavoritesService) {
  console.log('SearchService Loaded');

  const self = this;
  let url = 'https://swapi.co/api/';
  let search = '/?search=';
  self.swapiInfo = {
      searchFilters: {list: []}
  };

  self.selectOptions = { type: self.swapiInfo.searchFilters.list.people};
  console.log(self.selectOptions);


  self.searchReturn = {list: []};


  function getSearchFilters() {
    $http.get(url)
      .then(function (response) {
          console.log('swapi search: ', response);
          self.swapiInfo.searchFilters.list = response.data;
      })
      .catch(function (response) {
          console.log('swapi search error :', response);
      });
  }
  getSearchFilters();

  function generalSearch(searchInfo) {
    return $http.get(url + searchInfo.url + search + searchInfo.searchString)
      .then(function (response) {
          console.log(`${searchInfo.searchString} search: `, response.data.results);
          return response.data.results;
      })
      .catch(function (response) {
          console.log(`${searchInfo.searchString} search error: `, response);
      });
  }

  self.searchQuery = function(searchInfo) {
      if (searchInfo.url == 'people') {
        generalSearch(searchInfo)
          .then( function(response) {
            // console.log(response);
            self.searchReturn.list = additionalPeopleInfo(response);
          })
          .catch(function (response) {
              console.log('Error getting people results :', response);
          });
      } else if (searchInfo.url == 'species') {
        generalSearch(searchInfo)
          .then( function(response) {
            // console.log(response);
            self.searchReturn.list = additonalSpeciesInfo(response);
          })
          .catch(function (response) {
              console.log('Error getting species results :', response);
          });
      } else {
        generalSearch(searchInfo)
          .then( function(response) {
          self.searchReturn.list = response;
        });
      }
  };

  function additionalPeopleInfo(results) {
    // get species information
    for (let person of results) {
      if(person.species != undefined) {
        $http.get(person.species[0])
          .then(function (response) {
              // console.log('swapi species search: ', response.data);
              person.speciesInfo = response.data;
          })
          .catch(function (response) {
              console.log('swapi search error :', response);
          });
      }
    }
    console.log(results);
    return results;
  }

  function additonalSpeciesInfo(results) {
      // get homeworld information
    for (let species of results) {
      $http.get(species.homeworld)
      .then(function (response) {
          // console.log('swapi species search: ', response.data);
          species.homeworldInfo = response.data;
      })
      .catch(function (response) {
          console.log('swapi search error :', response);
      });
    }
    return results;
  }

  self.addToFavorites = function(item) {
    let favoriteToAdd = {};
    favoriteToAdd.url = item.url;

    if (item.hasOwnProperty('speciesInfo')) {
      favoriteToAdd.speciesInfo = item.speciesInfo.name;
    }

    if (item.hasOwnProperty('homeworldInfo')) {
      favoriteToAdd.homeworldInfo = item.homeworldInfo.name;
    }

    $http.post('/favorites', favoriteToAdd)
      .then(function (response) {
          // console.log('favorites response: ', response);
          self.addToFavoritesDialog(item);
          FavoritesService.getFavorites();
      })
      .catch(function (response) {
          // console.log('error saving favorite:', response);
          self.alreadyInFavoritesDialog();
      });
  };

  self.alreadyInFavoritesDialog = function () {
    $mdDialog.show(
      $mdDialog.alert()
        .clickOutsideToClose(true)
        .title('I\'ve got a bad feeling about this...')
        .textContent(`This is already in your favorites.`)
        .ariaLabel('Added Favorite')
        .ok('Fine!')
        .openFrom({
          top: -50,
          width: 30,
          height: 80
        })
        .closeTo({
          left: 1500
        })
    );
  };

  self.addToFavoritesDialog = function (favorite) {
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
        .title('The Force is strong with this choice!')
        .textContent(`${item} has been added to your favorites.`)
        .ariaLabel('Added Favorite')
        .ok('Got it!')
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
    };

    FavoritesService.getFavorites();

}]);
