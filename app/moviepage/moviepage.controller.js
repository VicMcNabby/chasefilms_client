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

      let movieId = vm.movieId
      console.log(movieId);
      $http.get("https://api.themoviedb.org/3/movie/11?api_key=82c848f0d12aeb177346f899a7979c65&append_to_response=videos")
        .then(results => {
          console.log(results);
          vm.movie = results
          vm.videos = results.data.videos.results
        })
      vm.movie = []
      vm.videos = []
      // $http.get("https://api.themoviedb.org/3/search/movie/?query=thor&api_key=82c848f0d12aeb177346f899a7979c65")
    }
  }
}());
