(function() {

  angular
    .module('chaseFilms')
    .config(config)

  function config($stateProvider, $locationProvider, $urlServiceProvider) {
    $locationProvider.html5Mode(true)

    $stateProvider
      .state('home', {
        url: '/',
        component: 'landingpage'
      }).state('searchpage', {
        url: '/searchpage',
        component: 'searchpage'
      }).state('moviepage', {
        url: '/moviepage',
        component: 'moviepage'
      }).state('collectionpage', {
        url: '/collectionpage',
        component: 'collectionpage'
      }).state('watchlist', {
        url: '/watchlist',
        component: 'watchlist'
      })

    $urlServiceProvider.rules.otherwise({
      state: 'home'
    })
  }

}());
