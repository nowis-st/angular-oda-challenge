'use strict';

/**
 * @ngdoc function
 * @name odaChallengeApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the odaChallengeApp
 */
angular.module('odaChallengeApp')
  .controller('LoginCtrl', ['$scope','$http', '$rootScope', '$cookies', '$state',  function ($scope, $http, $rootScope, $cookies, $state) {

    var data = {};
    $scope.user = {};

    $scope.login = function(user) {
      $scope.errorMail = '';
      $scope.errorPwd = '';

      var check = true;

      if( !user.email || user.email === '' ) {
        $scope.errorMail = 'Merci de renseigner votre adresse mail';
        check = false;
      }

      if( !user.password || user.password === '' ) {
        $scope.errorPwd = 'Merci de renseigner votre mot de passe';
        check = false;
      }

      if( check === true ) {
        data = {
          data: user
        };

        $http.post('http://api-yoda4.it-akademy.com/sign-in', data).then(
          function(successResponse) {
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
          },
          function(errorResponse) {
            console.log('Error:', errorResponse);
          }
      );
      }
    };
  }]);
