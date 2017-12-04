(function() {
  angular
    .module('chaseFilms')
    .controller('MoviePageController', MoviePageController)

  function MoviePageController($http, MovieService) {
    const vm = this
    let user = localStorage.user_id
    const userMoviesURL = `https://chasefilms.herokuapp.com/api/v1/users/${user}/movies/`
    const moviesURL = 'https://chasefilms.herokuapp.com/api/v1/movies'
    const collectionURL = 'https://chasefilms.herokuapp.com/api/v1/user_movies'
    vm.$onInit = function() {

      vm.service = MovieService
      vm.updateMovieId = updateMovieId
      vm.showLoading = true

      function updateMovieId() {
        vm.service.movieId = vm.movieId
      }

      let movieId = vm.service.movieId
      vm.notInCollection = true

      $http.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=82c848f0d12aeb177346f899a7979c65&append_to_response=videos`)
        .then(results => {
          console.log(results);
          vm.movie = results
          vm.videos = results.data.videos.results
          vm.budget = results.data.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          vm.revenue = results.data.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          vm.release_date = results.data.release_date.slice(0, 4)

          function timeConvert() {
            var num = results.data.runtime;
            var hours = (num / 60);
            var rhours = Math.floor(hours);
            var minutes = (hours - rhours) * 60;
            var rminutes = Math.round(minutes);
            var hourText = null;
            var minuteText = null;
            if (rhours >= 1) {
              hourText = ' hr '
            } else {
              hourText = ''
            }
            if (rminutes >= 1) {
              minuteText = ' min'
            } else {
              minuteText = ''
            }
            if (rhours == 0) {
              rhours = ''
            }
            if (rminutes == 0) {
              rminutes = ''
            }
            return rhours + hourText + rminutes + minuteText;
          }

          vm.runtime = timeConvert()
          console.log(vm.runtime);


          console.log(movieId);
          $http.get(userMoviesURL)
            .then(data => {
              vm.movies = data.data
              let movies = vm.movies
              console.log(data);

              movies.map(movie => {
                if (movie.movie_db_id == movieId) {
                  vm.notInCollection = false
                }
              })
              vm.showLoading = false
            })
        })
      vm.movie = []
      vm.videos = []
    }

    vm.addToDatabase = function() {

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
          console.log('new movie sent to database');
        })
    }

    vm.getMovieRating = function() {
      console.log('rated ', vm.movieRating, ' stars');

      const collectionInfo = {
        "users_id": localStorage.user_id,
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
          console.log(collectionInfo);
          window.location = 'collectionpage'
        })

      vm.movieRating = ''
    }

    vm.addToWatchList = function() {

      const watchInfo = {
        "users_id": localStorage.user_id,
        "moviedb_id": vm.movie.data.id,
        "watched": "",
        "rating": vm.movieRating,
        "want_to_watch": "yes"
      }
      $http.post(collectionURL, watchInfo)
        .then(result => {
          console.log('movie sent to watchlist');
          window.location = 'watchlist';
        })
    }

    vm.deleteMovie = function() {
      $http.delete('https://chasefilms.herokuapp.com/api/v1/movies/56')
        .then(result => {
          console.log('deleted');
        })
    }

    vm.logOut = function() {
      localStorage.clear();
    }

  }
}());
