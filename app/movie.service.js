(function() {

  angular
    .module('chaseFilms')
    .factory('MovieService', MovieService)


  function MovieService() {
    return {
      movieId: 11
    }
  }

})();
