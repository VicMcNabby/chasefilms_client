(function() {
  angular
    .module('chaseFilms')
    .controller('SearchPageController', SearchPageController)

  function SearchPageController($http, MovieService) {
    const vm = this
    vm.$onInit = function() {

      vm.findMovies = function() {
        let searchTerm = vm.searchTerm

        $http.get(`https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3/search/movie/?query=${searchTerm}&api_key=82c848f0d12aeb177346f899a7979c65`)
          .then(results => {
            console.log(results);
            vm.movies = results.data.results
            let movies = vm.movies

            movies.map(movie => {
              if (movie.poster_path) {
                movie.poster_path = "http://image.tmdb.org/t/p/w185/" + movie.poster_path
              } else {
                movie.poster_path = "http://www.saidaonline.com/en/newsgfx/pop-corn-movies-saidaonline.jpg"
              }
            })

            vm.searchTerm = '';
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
