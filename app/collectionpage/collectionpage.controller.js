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
              movie.poster_url = "https://image.tmdb.org/t/p/w185/" + movie.poster_url
            } else {
              movie.poster_url = "https://www.saidaonline.com/en/newsgfx/pop-corn-movies-saidaonline.jpg"
            }
          })
          vm.showDiv1 = false;
          vm.showDiv2 = false;
          vm.showDiv3 = false;
          vm.showDiv4 = false;
          vm.showDiv5 = false;


          movies.map(movie => {
            if (movie.rating == 1) {
              vm.showDiv1 = true
            } else if (movie.rating == 2) {
              vm.showDiv2 = true
            } else if (movie.rating == 3) {
              vm.showDiv3 = true
            } else if (movie.rating == 4) {
              vm.showDiv4 = true
            } else if (movie.rating == 5) {
              vm.showDiv5 = true
            }
          })
          vm.noMovies = true;
          if (movies.length > 0) {
            vm.noMovies = false
          }


        })

      vm.movies = []
    }
    vm.service = MovieService;
    vm.getInfo = getInfo

    function getInfo(movie) {
      console.log(movie.moviedb_id);
      vm.service.movieId = movie.moviedb_id
    }

    vm.logOut = function() {
      localStorage.clear();
    }

  }
}());
