'use strict';

/**
 * @ngdoc function
 * @name odaChallengeApp.controller:ProfilupdateCtrl
 * @description
 * # ProfilupdateCtrl
 * Controller of the odaChallengeApp
 */
angular.module('odaChallengeApp')
  .controller('ProfilCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
    $scope.$on('$viewContentLoaded', function(event) {
      event.preventDefault();

      $http.get('http://api-yoda4.it-akademy.com/account/' + $rootScope.user.idUser + '?token=' + $rootScope.user.token).then(
        function(response) {
           $scope.profil = response.data.data;
           console.log($scope.profil);
        },

        function(response) {
          console.log(response);
        });
    });
  }]);
