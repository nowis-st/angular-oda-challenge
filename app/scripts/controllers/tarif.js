'use strict';

/**
 * @ngdoc function
 * @name odaChallengeApp.controller:TarifCtrl
 * @description
 * # TarifCtrl
 * Controller of the odaChallengeApp
 */
angular.module('odaChallengeApp')
  .controller('TarifCtrl', ['$scope','$http', '$rootScope', function ($scope, $http, $rootScope) {

    $scope.$on('$viewContentLoaded', function(event) {
      event.preventDefault();
      $http.get('http://localhost:8000/offers?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9zaWduLWluIiwiaWF0IjoxNDczMjM4NjY0LCJleHAiOjE0NzMyNDIyNjQsIm5iZiI6MTQ3MzIzODY2NCwianRpIjoiYzk5NmU0NTNmYzUyNzU2NmMxOGQ5YjRhYTM0NjJjNjUifQ.ciYS8br-lvwkPOgTNtxHs3Zx93P-fuKJ8hVCvfNY3MiXIrFf4em-7oCmr-EVRoNmdzFti9yu8ytQUWJhDlWXcw').then(
        function(response) {
          console.log(response);
           $scope.tarifList = response.data.data;
           console.log($scope.tarifList);
        },

        function(response) {
          console.log(response);
        });
    });

    $scope.subscribe = function(id){
      console.log($rootScope.user.token);
      var data = {
          data: {

          }
        };
      data.data.offerId = id;
      //data.data.Order = null;

      $http.post('http://localhost:8000/subscription?token=' + $rootScope.user.token, data).then(function(successResponse) {
              console.log(successResponse);
          }, function(errorResponse) {
              console.log(errorResponse);
          });
    }

  }]);
