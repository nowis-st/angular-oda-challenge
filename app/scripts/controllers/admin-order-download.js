'use strict';

/**
* @ngdoc function
* @name odaChallengeApp.controller:OrderDownloadCtrl
* @description
* # OrderDownloadCtrl
* Controller of the odaChallengeApp
*/
angular.module('odaChallengeApp')

.controller('OrderDownloadCtrl', function($scope,$http,$state,$rootScope){

    $scope.page = {
        title: 'Commandes',
        subtitle: 'Liste'
    };

    var currentId = $state.params.id;

    $http.get('http://api-yoda4.it-akademy.com/admin/orders/'+currentId+'/download?token=' + $rootScope.user.token).then(
      function(response) {
          console.log(response.data);
          $scope.download = response.data.data;
      },
      function(response) {
        console.log(response);
      });



      $scope.formatDate = function(date){
              var dateOut = new Date(date);
              return dateOut;
        };

})
;
