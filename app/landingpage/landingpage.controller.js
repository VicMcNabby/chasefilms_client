(function() {
  angular
    .module('chaseFilms')
    .controller('LandingPageController', LandingPageController)

  function LandingPageController($http) {
    const vm = this
    const logInURL = "https://chasefilms.herokuapp.com/api/v1/auth/login"
    const newUserURL = "https://chasefilms.herokuapp.com/api/v1/users"

    vm.$onInit = function() {

      vm.alreadyLoggedIn = false

      if (localStorage.token) {
        vm.alreadyLoggedIn = true
      }
    }


    vm.logInUser = function() {

      vm.error = false

      let userInfo = {
        "email": vm.email,
        "password": vm.password
      }
      $http.post(logInURL, userInfo)
        .then(result => {
          localStorage.token = result.data.token;
          localStorage.user_id = result.data.id;
          console.log('Logged In');
          window.location = 'collectionpage'
        }).catch(error => {
          vm.errorMessage = error.data.message;
          vm.error = true
        });
    }

    vm.addNewUser = function() {
      let newUser = {
        "name": vm.newName,
        "email": vm.newEmail,
        "password": vm.newPassword
      }
      let newUserLogIn = {
        "email": vm.newEmail,
        "password": vm.newPassword
      }

      $http.post(newUserURL, newUser)
        .then(result => {
          console.log('New User');
          $http.post(logInURL, newUserLogIn)
            .then(result => {
              console.log('NEW USER LOGGED IN');
              localStorage.token = result.data.token;
              localStorage.user_id = result.data.id;
              window.location = 'collectionpage'
            })
        }).catch(error => {
          vm.errorMessage = error.data.message;
          vm.error = true
        });

    }

    vm.logOutLP = function() {
      localStorage.clear();
      window.location.reload();
    }


  }
}());
