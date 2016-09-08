'use strict';

/**
 * @ngdoc function
 * @name odaChallengeApp.controller:InformationrequestCtrl
 * @description
 * # InformationrequestCtrl
 * Controller of the odaChallengeApp
 */
angular.module('odaChallengeApp')
  .controller('InformationrequestCtrl', ['$scope','$http', function ($scope, $http) {

  	$scope.$on('$viewContentLoaded', function(event) {
      event.preventDefault();
      $http.get('http://api-yoda4.it-akademy.com/DataTest/phone.json').then(
        function (response) {
           $scope.phone = response.data.phone;
           console.log($scope.phone);
        },
        function (response) {
          console.log(response);
        });
    });

    $scope.reqInfo = {};

    $scope.sendQuestion = function(reqInfo) {

	    $scope.errorSubject = '';
		$scope.errorMessage = '';

      var check = true;

      if(!reqInfo.subject || reqInfo.subject === '') {
        $scope.errorSubject = 'Merci de renseigner un sujet';
        check = false;
      }

      if(!reqInfo.message || reqInfo.message === '') {
        $scope.errorMessage = 'Merci d\'indiquer votre problème';
        check = false;
      }

      if(check === true) {
        $http.post('http://api-yoda4.it-akademy.com/supportContact', reqInfo);
      }

    };

  }]);
