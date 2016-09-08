'use strict';

/**
 * @ngdoc function
 * @name odaChallengeApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the odaChallengeApp
 */
angular.module('odaChallengeApp')
  .controller('LogoutCtrl', ['$scope', '$http', '$rootScope', '$cookies', '$state', function ($scope, $http, $rootScope, $cookies, $state) {
    $http.get('http://api-yoda4.it-akademy.com/logout?token=' + $rootScope.user.token).then(
      function(response) {
        console.log(response);
        $cookies.remove('odaLogin');
        $rootScope.user = false;
        $state.go('home');
      },
      function(response) {
        console.log(response);
        $state.go('home');
      });
  }]);
