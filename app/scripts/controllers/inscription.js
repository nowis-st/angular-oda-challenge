'use strict';

/**
 * @ngdoc function
 * @name odaChallengeApp.controller:InscriptionCtrl
 * @description
 * # InscriptionCtrl
 * Controller of the odaChallengeApp
 */
angular.module('odaChallengeApp')
  .controller('InscriptionCtrl', ['$scope', '$http', '$rootScope', '$cookies', '$state', function ($scope, $http, $rootScope, $cookies, $state) {
    $scope.inscriptionSubmit = function() {
      var tem = true;
      $scope.usernameMessage    = false;
      $scope.emailMessage       = false;
      $scope.passwordMessage    = false;
      $scope.firstnameMessage   = false;
      $scope.lastnameMessage    = false;
      $scope.addressMessage     = false;
      $scope.zipcodeMessage     = false;
      $scope.cityMessage        = false;
      $scope.phoneMessage       = false;

      if (typeof $scope.username === 'undefined' || !$scope.username.length) {
        $scope.usernameMessage = 'Veuillez entrer un nom d\'utilisateur';
        tem = false;
      }

      if (typeof $scope.email === 'undefined' || !$scope.email.length) {
        $scope.emailMessage = 'Veuillez entrer une adresse email';
        tem = false;
      }

      if (typeof $scope.password === 'undefined' || !$scope.password.length) {
        $scope.passwordMessage = 'Veuillez entrer un mot de passe';
        tem = false;
      } else if (typeof $scope.passwordConfirm === 'undefined' || !$scope.passwordConfirm.length) {
        $scope.passwordMessage = 'Veuillez entrer un mot de passe de confirmation';
        tem = false;
      } else if (!angular.equals($scope.password, $scope.passwordConfirm)) {
        $scope.passwordMessage = 'Veuillez confirmer votre mot de passe';
        tem = false;
      }

      if (typeof $scope.firstname === 'undefined' || !$scope.firstname.length) {
        $scope.firstnameMessage = 'Veuillez entrer un prénom';
        tem = false;
      }

      if (typeof $scope.lastname === 'undefined' || !$scope.lastname.length) {
        $scope.lastnameMessage = 'Veuillez entrer un nom de famille';
        tem = false;
      }

      if (typeof $scope.address === 'undefined' || !$scope.address.length) {
        $scope.addressMessage = 'Veuillez entrer une adresse';
        tem = false;
      }

      if (typeof $scope.zipcode === 'undefined' || !$scope.zipcode.length) {
        $scope.zipcodeMessage = 'Veuillez entrer un code postal';
        tem = false;
      }

      if (typeof $scope.city === 'undefined' || !$scope.city.length) {
        $scope.cityMessage = 'Veuillez entrer une ville';
        tem = false;
      }

      if (typeof $scope.phone === 'undefined' || !$scope.phone.length) {
        $scope.phoneMessage = 'Veuillez entrer un numéro de téléphone';
        tem = false;
      }


      if (!tem) {
        return false;
      }

      var dataStructured = {
          data : {
            username: $scope.username,
            email: $scope.email,
            password: $scope.password,
            firstname: $scope.firstname,
            lastname: $scope.lastname,
            address: $scope.address,
            zipcode: $scope.zipcode,
            city: $scope.city,
            phone: $scope.phone
          }
      };

      var dataLogin = {
        data: {
          email: $scope.email,
          password: $scope.password
        }
      };

      $http.post('http://api-yoda4.it-akademy.com/registration', dataStructured).then(function(successResponse) {
        console.log(successResponse);
        $http.post('http://api-yoda4.it-akademy.com/sign-in', dataLogin).then(function(successResponse) {
          console.log(successResponse);
          $rootScope.user = {
            token: successResponse.data.token,
            idSession: successResponse.data.idSession,
            idUser: successResponse.data.user.id
          };
          $http.get('http://api-yoda4.it-akademy.com/is-admin?token=' + $rootScope.user.token).then(
            function(response) {
              console.log(response);
              $rootScope.user.isAdmin = response.data.data.is_admin;
              console.log($rootScope.user);
              $cookies.putObject('odaLogin', $rootScope.user);
              if ($rootScope.user.isAdmin) {
                  $state.go('admin-dashboard');
              } else {
                  $state.go('home');
              }
            },
            function(response) {
              console.log(response);
            });
        }, function(errorResponse) {
          console.log(errorResponse);
        });
      }, function(errorResponse) {
        console.log(errorResponse);
      });
    };
  }]);
