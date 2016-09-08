'use strict';

/**
 * @ngdoc function
 * @name odaChallengeApp.controller:TarifCtrl
 * @description
 * # TarifCtrl
 * Controller of the odaChallengeApp
 */
angular.module('odaChallengeApp')
  .controller('TarifCtrl', ['$scope','$http', '$rootScope', function ($scope, $http) {

    $scope.$on('$viewContentLoaded', function(event) {
      event.preventDefault();
      $http.get('http://api.it-akademy.com/offers?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9zaWduLWluIiwiaWF0IjoxNDczMjM4NjY0LCJleHAiOjE0NzMyNDIyNjQsIm5iZiI6MTQ3MzIzODY2NCwianRpIjoiYzk5NmU0NTNmYzUyNzU2NmMxOGQ5YjRhYTM0NjJjNjUifQ.ciYS8br-lvwkPOgTNtxHs3Zx93P-fuKJ8hVCvfNY3MiXIrFf4em-7oCmr-EVRoNmdzFti9yu8ytQUWJhDlWXcw').then(
        function(response) {
          console.log(response);
           $scope.tarifList = response.data.data;
           console.log($scope.tarifList);
        },

        function(response) {
          console.log(response);
        });
    });

  }]);
