(function() {
  angular
    .module('chaseFilms')
    .controller('WatchListController', WatchListController)

  function WatchListController($http, MovieService) {
    const vm = this
    let user = localStorage.user_id

    vm.showLoading = true;

    vm.$onInit = function() {

      const myWatchListURL = `https://chasefilms.herokuapp.com/api/v1/users/${user}/movies/want_to_watch`

      $http.get(myWatchListURL)
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

    vm.getMovieInfo = function(movie) {
      console.log(movie);
      let movieInfo = movie


      vm.watchedMovie = function(movie) {

        let updateInfo = {
          "users_id": localStorage.user_id,
          "moviedb_id": movieInfo.movie_db_id,
          "watched": "yes",
          "rating": vm.movieRating,
          "want_to_watch": ''
        }

        let movieId = movieInfo.id
        console.log(updateInfo);

        let collectionUpdateURL = `https://chasefilms.herokuapp.com/api/v1/user_movies/${movieId}`
        $http.put(collectionUpdateURL, updateInfo)
          .then(result => {
            window.location.reload();
          })

      }
    }

  }
}());
