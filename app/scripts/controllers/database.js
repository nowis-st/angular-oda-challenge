'use strict';

/**
 * @ngdoc function
 * @name odaChallengeApp.controller:DatabaseCtrl
 * @description
 * # DatabaseCtrl
 * Controller of the odaChallengeApp
 */
angular.module('odaChallengeApp')
  .controller('DatabaseCtrl', function ($scope, $http, $state, $timeout) {
    var jsonPostDatas = false;
    $scope.dbDatas    = false;
    $scope.gridsDatas = [];
    $scope.dbName     = false;

    var getDbDatas = function(_jsonDatas) {
      $http.post('http://api-yoda4.it-akademy.com/get-data/user-table', {'data':_jsonDatas}).then(
        function(successGetDbDatas) {
          $scope.dbDtas = successGetDbDatas.data.data;

          $timeout(function(){
            $scope.gridsDatas = createStrucutredJson(successGetDbDatas.data.data);
            console.log($scope.gridsDatas);
          },false);

        },
        function(errorGetDbDatas) {
          console.log(errorGetDbDatas);
        }
      );
    };

    var createStrucutredJson = function(_nonStructuredDatas) {

      var structuredJson = {
          enableCellEditOnFocus: true,
          paginationPageSizes: [25, 50, 75],
          paginationPageSize: 25,
          data: _nonStructuredDatas,
          columnDefs: []
        };

      for(var field in _nonStructuredDatas[0]) {
        var columnDef = {
          name: field,
          enableCellEdit: false
        };

        if(field !== 'id') {
          columnDef.enableCellEdit = true;
        }

        structuredJson.columnDefs.push(columnDef);
      }

      return structuredJson;
    };

    $scope.$on('$viewContentLoaded', function(event) {
      event.preventDefault();

      $scope.dbName = $state.params.dbname;

      jsonPostDatas = {
        'tableName': $state.params.dbname
      };

      getDbDatas(jsonPostDatas);
    });
  });
