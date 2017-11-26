(function() {
  angular
    .module('chaseFilms')
    .controller('SearchPageController', SearchPageController)

  function SearchPageController($http) {
    const vm = this
    vm.$onInit = function() {

      $http.get("https://api.themoviedb.org/3/search/movie/?query=thor&api_key=82c848f0d12aeb177346f899a7979c65")
        .then(results => {
          console.log(results);
          vm.movies = results.data.results
        })
      vm.movies = []
    }
  }
}());
