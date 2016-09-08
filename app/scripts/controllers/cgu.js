'use strict';

/**
 * @ngdoc function
 * @name odaChallengeApp.controller:CguCtrl
 * @description
 * # CguCtrl
 * Controller of the odaChallengeApp
 */
angular.module('odaChallengeApp')
  .controller('CguCtrl', ['$scope','$http', function ($scope, $http) {

    $scope.$on('$viewContentLoaded', function(event) {
      event.preventDefault();

      $http.get('http://api-yoda4.it-akademy.com/content/cgu').then(
        function(response) {
          console.log(response);
          $scope.pageContent = response.data.data.content;
        },
        function(response){
          console.log(response);
        }
      );
    });
  }]);
