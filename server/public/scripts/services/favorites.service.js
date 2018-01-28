swapiApp.service('FavoritesService', ['$http', function($http) {
    console.log('FavoritesService Loaded');
    
    const self = this;

    self.favorites = {}


    self.getFavorites = function() {
        self.favorites.list = [];
        $http.get('/favorites')
            .then(function (response) {
                console.log('get favorites: ', response.data);
                getFavoritesInfo(response.data)

            })
            .catch(function (response) {
                console.log('error getting favorites:', response);
            });
    }

    function getFavoritesInfo(favorites) {
        for (let i = 0; i < favorites.length; i++) {
            $http.get(favorites[i].url)
                .then(function (response) {
                    // console.log('converted favorites: ', response.data);
                    
                    if (favorites[i].hasOwnProperty('speciesInfo')) {
                        response.data.speciesInfo = favorites[i].speciesInfo;
                    }
            
                    if (favorites[i].hasOwnProperty('homeworldInfo')) {
                        response.data.homeworldInfo = favorites[i].homeworldInfo;
                    }

                    self.favorites.list.push(response.data);
                })
                .catch(function (response) {
                    console.log('error converting favorites:', response);
                });
            
        }
    }

}]);