(function() {
  angular
    .module('chaseFilms')
    .controller('MoviePageController', MoviePageController)

  function MoviePageController($http, MovieService) {
    const vm = this
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

    vm.clicked5 = function() {
      vm.movieRating = 5
    }

    vm.clicked4 = function() {
      vm.movieRating = 4
    }

    vm.clicked3 = function() {
      vm.movieRating = 3
    }
    vm.clicked2 = function() {
      vm.movieRating = 2
    }

    vm.clicked1 = function() {
      vm.movieRating = 1
    }

    vm.getMovieRating = function() {
      console.log(vm.movieRating);
      console.log(vm.movie.data.title);
    }

  }
}());
