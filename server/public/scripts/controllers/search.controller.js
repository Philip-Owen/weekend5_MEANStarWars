swapiApp.controller('SearchController', ['SearchService', '$mdDialog', function(SearchService, $mdDialog) {
    console.log('in SearchController');
    const self = this;

    self.searchFilters = SearchService.swapiInfo.searchFilters;
    self.searchInfo = {};
    self.searchReturn = SearchService.searchReturn;

    self.searchDivs = {
        people: false,
        planets: false,
        films: false,
        species: false,
        vehicles: false,
        starships: false,
    };

    self.searchClick = function(filter) {
        // console.log('searchClick:', filter);
        SearchService.searchQuery(filter);
    };

    self.addFav = function(item) {
        SearchService.addToFavorites(item);
    };

}]);
