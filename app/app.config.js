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
      })

    $urlServiceProvider.rules.otherwise({
      state: 'home'
    })
  }

}());
