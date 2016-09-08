'use strict';

/**
 * @ngdoc function
 * @name odaChallengeApp.controller:PasswordCtrl
 * @description
 * # PasswordCtrl
 * Controller of the odaChallengeApp
 */
angular.module('odaChallengeApp')
  .controller('PasswordCtrl', ['$scope', '$http', function ($scope, $http) {

    var data = {
      data: {}
    };

    $scope.updatePassword = function() {
      if (!$scope.password && !$scope.password.length) {
        $scope.errorMessage = 'Veuillez entrer votre ancien mot de passe';
      } else if($scope.new_password && $scope.new_password.length){
        if (typeof $scope.passwordConfirm === 'undefined' || !$scope.passwordConfirm.length) {
          $scope.errorMessage = 'Veuillez entrer un mot de passe de confirmation';
        } else if (!angular.equals($scope.new_password, $scope.passwordConfirm)) {
          $scope.errorMessage = 'Veuillez confirmer votre mot de passe';
        } else {
          data.data.password = $scope.password;
          data.data.new_password = $scope.new_password;

          console.log(data);

          $http.put('http://api.yoda4.it-akademy.com/account/6/password', data).then(function(successResponse) {
            console.log(successResponse);
          }, function(errorResponse) {
            console.log(errorResponse);
          });
        }
      }
    };
  }]);
