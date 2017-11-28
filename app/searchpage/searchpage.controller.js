(function() {
  angular
    .module('chaseFilms')
    .controller('SearchPageController', SearchPageController)

  function SearchPageController($http, MovieService) {
    const vm = this
    vm.$onInit = function() {

      vm.findMovies = function() {
        let searchTerm = vm.searchTerm
        $http.get(`https://api.themoviedb.org/3/search/movie/?query=${searchTerm}&api_key=82c848f0d12aeb177346f899a7979c65`)
          .then(results => {
            console.log(results);
            vm.movies = results.data.results
          })
      }
      vm.movies = []
    }

    vm.service = MovieService;
    vm.getInfo = getInfo

    function getInfo(movie) {
      console.log(movie.id);
      vm.service.movieId = movie.id
    }

  }
}());
