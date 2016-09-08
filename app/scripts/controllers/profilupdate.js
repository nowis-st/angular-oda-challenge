  'use strict';

  /**
   * @ngdoc function
   * @name odaChallengeApp.controller:ProfilCtrl
   * @description
   * # ProfilCtrl
   * Controller of the odaChallengeApp
   */
  angular.module('odaChallengeApp')
    .controller('ProfilupdateCtrl', ['$scope', '$http', function ($scope, $http) {
    	$scope.profil = false;

      $scope.updateProfil = function() {

      	var check = true;

      	var data = {
      		data: {

      		}
      	};

      	var regEmail = new RegExp('^(([a-zA-Z]|[0-9])|([-]|[_]|[.]))+[@](([a-zA-Z0-9])|([-])){2,63}[.](([a-zA-Z0-9]){2,63})+$', 'gi');
      	var regFirstname = /^[A-Z-]*$/gi;
      	var regLastname = /^[A-Z-]*$/gi;
      	var regCity = /^[A-Z-]*$/gi;

      	if (typeof $scope.profil.username === 'undefined' || !$scope.profil.username.length) {
          $scope.errorMessage = 'Veuillez entrer un nom d\'utilisateur';
          check = false;
        }
        else if (!regEmail.test($scope.profil.email)) {
          $scope.errorMessage = 'Veuillez entrer une adresse email valide';
          check = false;
        }
        else if(!regFirstname.test($scope.profil.firstname)) {
          $scope.errorMessage = 'Veuillez entrer un prénom valide';
  		    check = false;
        } 
        else if(!regLastname.test($scope.profil.lastname)) {
    			$scope.errorMessage = 'Veuillez entrer un nom valide';
    			check = false;
        } 
        else if (typeof $scope.profil.zipcode === 'undefined' || !$scope.profil.zipcode.length) {
          $scope.errorMessage = 'Veuillez entrer un code postal';
          check = false;
  	    } 
        else if (!regCity.test($scope.profil.city)) {
          $scope.errorMessage = 'Veuillez entrer une ville valide';
          check = false;
  	    } 
        else if (typeof $scope.profil.phone === 'undefined' || !$scope.profil.phone.length) {
          $scope.errorMessage = 'Veuillez entrer un numéro de téléphone';
          check = false;
  	    }

      	if(check === true) {

    			data.data.username 	= $scope.profil.username;
    			data.data.email 	= $scope.profil.email;
    			data.data.firstname = $scope.profil.firstname;
    			data.data.lastname 	= $scope.profil.lastname;
    			data.data.address 	= $scope.profil.address;
    			data.data.zipcode 	= $scope.profil.zipcode;
    			data.data.city 		= $scope.profil.city;
    			data.data.phone 	= $scope.profil.phone;

    			console.log(data);

  		    $http.put('http://api.it-akademy.com/account/6', data).then(function(successResponse) {
  		        console.log(successResponse);
  		    }, function(errorResponse) {
  		        console.log(errorResponse);
  		    });
  		  }
      };

      $scope.$on('$viewContentLoaded', function(event) {
        event.preventDefault();

        $http.get('http://api.it-akademy.com/account/6').then(
          function(response) {
             $scope.profil = response.data.data;
             console.log($scope.profil);
          },

          function(response) {
            console.log(response);
          });
      });

    }]);
