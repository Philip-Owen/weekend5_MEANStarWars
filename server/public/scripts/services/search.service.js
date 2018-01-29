swapiApp.service('SearchService', ['$http', '$mdDialog',  function($http, $mdDialog) {
    console.log('SearchService Loaded');
    
    const self = this;
    let url = 'https://swapi.co/api/';
    let search = '/?search=';
    self.swapiInfo = {
        searchFilters: {list: []}
    };

    self.selectOptions = { type: self.swapiInfo.searchFilters.list.people}
    console.log(self.selectOptions);
    

    self.searchReturn = {list: []};
    

    function getSearchFilters() {
        $http.get(url)
            .then(function (response) {
                console.log('swapi search: ', response);
                self.swapiInfo.searchFilters.list = response.data
            })
            .catch(function (response) {
                // console.log('swapi search error :', response);
            })
    }
    getSearchFilters();

    self.searchQuery = function(searchInfo) {
        if (searchInfo.url == 'people') {
            $http.get(url + searchInfo.url + search + searchInfo.searchString)
                .then(function (response) {     
                    console.log(`${searchInfo.searchString} search: `, response.data.results);
                    self.searchReturn.list = response.data.results;
                    additionalPeopleInfo(response.data.results);
                })
                .catch(function (response) {
                    console.log(`${searchInfo.searchString} search error: `, response);
                });  
        } else if (searchInfo.url == 'species') {
            $http.get(url + searchInfo.url + search + searchInfo.searchString)
                .then(function (response) {     
                    
                    console.log(`${searchInfo.searchString} search: `, response.data.results);
                    additonalSpeciesInfo(response.data.results);
                    self.searchReturn.list = response.data.results;
                })
                .catch(function (response) {
                    console.log(`${searchInfo.searchString} search error: `, response);
                });  
        } else {
            $http.get(url + searchInfo.url + search + searchInfo.searchString)
                .then(function (response) {     
                    // console.log(`${searchInfo.searchString} search: `, response.data.results);
                    self.searchReturn.list = response.data.results;
                })
                .catch(function (response) {
                    console.log(`${searchInfo.searchString} search error: `, response);
                    openOffscreen();
                });  
        }
    }

    function additionalPeopleInfo(results) {
        // get species information
        for (let i = 0; i < results.length; i++) {
            if (results[i].species[0] != undefined) {
                // console.log(results[i].species[0].length);
                
                $http.get(results[i].species[0])
                    .then(function (response) {
                        // console.log('swapi species search: ', response.data);
                        results[i].speciesInfo = response.data
                    })
                    .catch(function (response) {
                        console.log('swapi search error :', response);
                    });
            }
        }
    }

    function additonalSpeciesInfo(results) {
        // get homeworld information
        for (let i = 0; i < results.length; i++) {
            $http.get(results[i].homeworld)
            .then(function (response) {
                // console.log('swapi species search: ', response.data);
                results[i].homeworldInfo = response.data
            })
            .catch(function (response) {
                console.log('swapi search error :', response);
            });
        }
    }
    
    self.addToFavorites = function(item) {
        let favoriteToAdd = {};
        favoriteToAdd.url = item.url;

        if (item.hasOwnProperty('speciesInfo')) {
            favoriteToAdd.speciesInfo = item.speciesInfo.name
        }

        if (item.hasOwnProperty('homeworldInfo')) {
            favoriteToAdd.homeworldInfo = item.homeworldInfo.name
        }
        
        $http.post('/favorites', favoriteToAdd)
            .then(function (response) {
                // console.log('favorites response: ', response);
                self.addToFavoritesDialog(item);
            })
            .catch(function (response) {
                // console.log('error saving favorite:', response);
                self.alreadyInFavoritesDialog();
            });
    }

    self.alreadyInFavoritesDialog = function () {
        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('I\'ve got a bad feeling about this...')
            .textContent(`This is already in your favorites.`)
            .ariaLabel('Added Favorite')
            .ok('Fine!')
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

      self.addToFavoritesDialog = function (favorite) {
        let item;
        if (favorite.hasOwnProperty('name')) {
            item = favorite.name
        }
        if (favorite.hasOwnProperty('title')) {
            item = favorite.title
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

}]);