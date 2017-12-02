(function() {
  angular
    .module('chaseFilms')
    .controller('LandingPageController', LandingPageController)

  function LandingPageController($http) {
    const vm = this
    const logInURL = "https://chasefilms.herokuapp.com/api/v1/auth/login"

    vm.logInUser = function() {

      let userInfo = {
        "email": vm.email,
        "password": vm.password
      }
      $http.post(logInURL, userInfo)
        .then(result => {
          localStorage.token = result.data.token;
          localStorage.user_id = result.data.id;
          console.log('Logged In');
        })
    }


  }
}());
