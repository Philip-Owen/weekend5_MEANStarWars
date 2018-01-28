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
        let favoritesArray = []
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
        console.log(item._id);
        $http.delete('/favorites/' + item._id)
            .then(function (response) {
                console.log('deleted favorite: ', response.data);
                self.getFavorites();

            })
            .catch(function (response) {
                console.log('error deleting favorites:', response);
            });
    };

}]);