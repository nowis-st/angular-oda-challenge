'use strict';

/**
 * @ngdoc function
 * @name odaChallengeApp.controller:ProfilupdateCtrl
 * @description
 * # ProfilupdateCtrl
 * Controller of the odaChallengeApp
 */
angular.module('odaChallengeApp')
  .controller('ProfilCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.$on('$viewContentLoaded', function(event) {
      event.preventDefault();

      $http.get('http://api.yoda4.it-akademy.com/account/6').then(
        function(response) {
           $scope.profil = response.data.data;
           console.log($scope.profil);
        },

        function(response) {
          console.log(response);
        });
    });
  }]);
