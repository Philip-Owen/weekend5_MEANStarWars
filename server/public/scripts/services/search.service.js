swapiApp.service('SearchService', ['$http', function($http) {
    console.log('SearchService Loaded');
    
    const self = this;
    let url = 'https://swapi.co/api/';
    let search = '/?search=';
    self.swapiInfo = {
        searchFilters: {list: []}
    };

    self.searchReturn = {list: []};
    

    function getSearchFilters() {
        $http.get(url)
            .then(function (response) {
                // console.log('swapi search: ', response);
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
            })
            .catch(function (response) {
                console.log('error saving favorite:', response);
            });
    }

}]);