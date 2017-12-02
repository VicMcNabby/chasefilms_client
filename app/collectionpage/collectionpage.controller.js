(function() {
  angular
    .module('chaseFilms')
    .controller('CollectionPageController', CollectionPageController)

  function CollectionPageController($http, MovieService) {
    const vm = this

    vm.showLoading = true;

    vm.$onInit = function() {
      let user = localStorage.user_id
      const myCollectionURL = `https://chasefilms.herokuapp.com/api/v1/users/${user}/movies/watched`

      $http.get(myCollectionURL)
        .then(results => {
          console.log(results);
          vm.showLoading = false;
          vm.movies = results.data
          let movies = vm.movies

          movies.map(movie => {
            if (movie.poster_url) {
              movie.poster_url = "http://image.tmdb.org/t/p/w185/" + movie.poster_url
            } else {
              movie.poster_url = "http://www.saidaonline.com/en/newsgfx/pop-corn-movies-saidaonline.jpg"
            }
          })
        })

      vm.movies = []
    }
    vm.service = MovieService;
    vm.getInfo = getInfo

    function getInfo(movie) {
      console.log(movie.moviedb_id);
      vm.service.movieId = movie.moviedb_id
    }
  }
}());
