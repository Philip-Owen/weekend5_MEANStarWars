swapiApp.controller('SearchController', ['SearchService', function(SearchService) {
    console.log('in SearchController');
    const self = this;

    self.searchFilters = SearchService.swapiInfo.searchFilters
    self.searchInfo = {}
    self.searchReturn = SearchService.searchReturn
    
    self.searchDivs = {
        people: false,
        planets: false,
        films: false,
        species: false,
        vehicles: false,
        starships: false,
    }

    function toggleSearchDivs(params) {
        Object.keys(self.searchDivs).forEach(v => self.searchDivs[v] = false);
        switch (params) {
            case 'people':
                self.searchDivs.people = true;
                break;
            case 'planets':
                self.searchDivs.planets = true;
                break;
            case 'films':
                self.searchDivs.films = true;
                break;
            case 'species':
                self.searchDivs.species = true;
                break;
            case 'vehicles':
                self.searchDivs.vehicles = true;
                break;
            case 'starships':
                self.searchDivs.starships = true;
                break;
        }

    }

    self.searchClick = function(filter) {
        // console.log('searchClick:', filter);
        toggleSearchDivs(filter.url)
        SearchService.searchQuery(filter);
        // console.log('from service:', self.searchReturn);
    }
    

    self.addFav = function(item) {
        SearchService.addToFavorites(item);
    }


}]);