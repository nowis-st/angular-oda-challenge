'use strict';

/**
* @ngdoc function
* @name odaChallengeApp.controller:OrdersCtrl
* @description
* # OrdersCtrl
* Controller of the odaChallengeApp
*/
angular.module('odaChallengeApp')

.controller('OrdersCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope){
    $scope.page = {
        title: 'Commandes',
        subtitle: 'Liste'
    };

    $http.get('http://api-yoda4.it-akademy.com/admin/orders?token=' + $rootScope.user.token).then(
      function(response) {
          console.log(response.data);
          $scope.orders = response.data.data.orders;
      },
      function(response) {
        console.log(response);
      });


      $scope.formatDate = function(date){
              var dateOut = new Date(date);
              return dateOut;
        };

}])
;
