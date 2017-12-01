(function() {
  angular
    .module('chaseFilms')
    .controller('MoviePageController', MoviePageController)

  function MoviePageController($http, MovieService) {
    const vm = this
    const moviesURL = 'https://chasefilms.herokuapp.com/api/v1/movies'
    const collectionURL = 'https://chasefilms.herokuapp.com/api/v1/user_movies'
    vm.$onInit = function() {

      vm.service = MovieService
      vm.updateMovieId = updateMovieId

      function updateMovieId() {
        vm.service.movieId = vm.movieId
      }

      let movieId = vm.service.movieId
      console.log(movieId);
      $http.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=82c848f0d12aeb177346f899a7979c65&append_to_response=videos`)
        .then(results => {
          console.log(results);
          vm.movie = results
          vm.videos = results.data.videos.results

        })
      vm.movie = []
      vm.videos = []
    }

    vm.addToCollection = function() {

      const movieInfo = {
        "title": vm.movie.data.title,
        "poster_url": vm.movie.data.poster_path,
        "overview": vm.movie.data.overview,
        "tagline": vm.movie.data.tagline,
        "movie_db_id": vm.movie.data.id
      }
      console.log('collection pushed');
      $http.post(moviesURL, movieInfo)
        .then(result => {
          console.log('new movie sent!');
        })
    }

    vm.getMovieRating = function() {
      console.log('rated ', vm.movieRating, ' stars');

      const collectionInfo = {
        "users_id": 1,
        "moviedb_id": vm.movie.data.id,
        "watched": "yes",
        "rating": vm.movieRating,
        "want_to_watch": ''
      }

      $http.post(collectionURL, collectionInfo, {
          headers: {
            "content-type": "application/json"
          }
        })
        .then(result => {
          console.log('user movie sent!');
        })

      vm.movieRating = ''
    }

    vm.deleteMovie = function() {
      $http.delete('https://chasefilms.herokuapp.com/api/v1/user_movies/6')
        .then(result => {
          console.log('deleted');
        })
    }

  }
}());
