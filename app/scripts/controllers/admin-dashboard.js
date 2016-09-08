'use strict';

/**
* @ngdoc function
* @name odaChallengeApp.controller:DashboardCtrl
* @description
* # DashboardCtrl
* Controller of the odaChallengeApp
*/
angular.module('odaChallengeApp')

.controller('DashboardCtrl', function($scope,$http){
    $scope.page = {
        title: 'Dashboard',
        subtitle: 'ODA4'
    };

    $scope.getUsers = function(){
        $scope.data=[];
        var url = 'http://api.it-akademy.com/?rows=10&fname={firstName}&lname={lastName}&delay=3&callback=JSON_CALLBACK';

        $http.jsonp(url).success(function(data){
            $scope.data=data;
        });
    };

    $scope.getUsers();
})

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
  $scope.availableRecipients = ['RLake@nec.gov','RBastian@lacus.io','VMonroe@orci.ly','YMckenzie@mattis.gov','VMcmyne@molestie.org','BKliban@aliquam.gov','HHellems@tincidunt.org','KAngell@sollicitudin.ly'];
  $scope.recipients = {};
  $scope.recipients.emails = ['RLake@nec.gov','VMonroe@orci.ly'];

  $scope.messageContent = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>';
})

.controller('AppointmentsWidgetCtrl', function($scope){
  $scope.date = new Date();
})
;
