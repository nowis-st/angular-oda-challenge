'use strict';

/**
* @ngdoc function
* @name odaChallengeApp.controller:DashboardCtrl
* @description
* # DashboardCtrl
* Controller of the odaChallengeApp
*/
angular.module('odaChallengeApp')

.controller('DashboardCtrl', ['$scope', '$http', '$rootScope', '$state', function ($scope, $http, $rootScope, $state){
    $scope.page = {
        title: 'Dashboard',
        subtitle: 'ODA4'
    };

    if (!$rootScope.user.isAdmin) {
        $state.go('home');
    }

    $scope.getUsers = function(){
        $http.get('http://api-yoda4.it-akademy.com/admin/dashboard/active-users?token=' + $rootScope.user.token).then(
          function(response) {
             $scope.users_number = Number(response.data.data.number);
             $scope.total_admin = Number(response.data.data.total_admin);
             $scope.total_customer = Number(response.data.data.total_customer);
             $scope.total_registered = Number(response.data.data.total_registered);
          },
          function(response) {
            console.log(response);
          });
    };
    $scope.getCommandes = function(){
        $http.get('http://api-yoda4.it-akademy.com/admin/dashboard/valid-orders?token=' + $rootScope.user.token).then(
          function(response) {
              console.log(response.data.data);
             $scope.commandes_number = response.data.data.number;
             $scope.total_sub1 = Number(response.data.data.total_sub1);
             $scope.total_sub2 = Number(response.data.data.total_sub2);
             $scope.total_sub3 = Number(response.data.data.total_sub3);
             $scope.commandes_sum = Number(response.data.data.sum);
             $scope.sum_sub1 = Number(response.data.data.sum_sub1);
             $scope.sum_sub2 = Number(response.data.data.sum_sub2);
             $scope.sum_sub3 = Number(response.data.data.sum_sub3);
          },
          function(response) {
            console.log(response);
          });
    };

    $scope.getUsers();
    $scope.getCommandes();
}])

.controller('RealtimeLoadCtrl', function($scope, $interval){
    $scope.options1 = {
        renderer: 'area',
        height: 133
    };

    $scope.seriesData = [ [], []];
    var random = new Rickshaw.Fixtures.RandomData(50);

    for (var i = 0; i < 50; i++) {
        random.addData($scope.seriesData);
    }

    var updateInterval = 800;

    $interval(function() {
        random.removeData($scope.seriesData);
        random.addData($scope.seriesData);
    }, updateInterval);

    $scope.series1 = [{
        name: 'Series 1',
        color: 'steelblue',
        data: $scope.seriesData[0]
    }, {
        name: 'Series 2',
        color: 'lightblue',
        data: $scope.seriesData[1]
    }];

    $scope.features1 = {
        hover: {
            xFormatter: function(x) {
                return new Date(x * 1000).toUTCString();
            },
            yFormatter: function(y) {
                return Math.floor(y) + '%';
            }
        }
    };
})

.controller('MessageWidgetCtrl', function($scope){

    // $scope.getEmails = function(){
    //     $http.get('http://api-yoda4.it-akademy.com/admin/dashboard/emails?token=' + $rootScope.user.token).then(
    //       function(response) {
    //           console.log(response.data.data);
    //          $scope.emails = response.data.data;
    //       },
    //       function(response) {
    //         console.log(response);
    //       });
    // };
    //
    // $scope.getEmails();

  $scope.availableRecipients = ['RLake@nec.gov','RBastian@lacus.io','VMonroe@orci.ly','YMckenzie@mattis.gov','VMcmyne@molestie.org','BKliban@aliquam.gov','HHellems@tincidunt.org','KAngell@sollicitudin.ly'];
  $scope.recipients = {};
  $scope.recipients.emails = ['RLake@nec.gov','VMonroe@orci.ly'];

  $scope.messageContent = '<h3>Bonjour,</h3><p>Lorem ipsum dolor sit amet.... bla bla bla</p><p>Cordialement</p><p>ODA4 Team</p>';
})

.controller('AppointmentsWidgetCtrl', function($scope){
  $scope.date = new Date();
})
;
