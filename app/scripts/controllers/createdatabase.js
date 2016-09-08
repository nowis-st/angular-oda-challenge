'use strict';

/**
 * @ngdoc function
 * @name odaChallengeApp.controller:CreatedatabaseCtrl
 * @description
 * # CreatedatabaseCtrl
 * Controller of the odaChallengeApp
 */
angular.module('odaChallengeApp')
  .controller('CreatedatabaseCtrl', function ($scope, $http) {
    $scope.tableName = '';
    $scope.fieldName = '';

    $scope.fieldTypes = [
        {
            'name': 'integer',
            'attributes': [
                'unsigned'
            ],
            'params': [
              {
                'name' : 'ai',
                'controlType' : 'boolean'
              }
            ],
            'controlType' : 'number'
        },
        {
            'name': 'big-integer',
            'attributes': [
                'unsigned'
            ],
            'params': [
              {
                'name' : 'ai',
                'controlType' : 'boolean'
              }
            ],
            'controlType' : 'number'
        },
        {
            'name': 'medium-integer',
            'attributes': [
                'unsigned'
            ],
            'params': [
              {
                'name' : 'ai',
                'controlType' : 'boolean'
              }
            ],
            'controlType' : 'number'
        },
        {
            'name': 'small-integer',
            'attributes': [
                'unsigned'
            ],
            'params': [
              {
                'name' : 'ai',
                'controlType' : 'boolean'
              }
            ],
            'controlType' : 'number'
        },
        {
            'name': 'tiny-integer',
            'attributes': [
                'unsigned'
            ],
            'params': [
              {
                'name' : 'ai',
                'controlType' : 'boolean'
              }
            ],
            'controlType' : 'number'
        },
        {
            'name': 'float',
            'controlType' : 'number'
        },
        {
            'name': 'double',
            'params': [
              {
                'name' : 'digits',
                'controlType' : 'integer',
                'default' : 10
              },
              {
                'name' : 'precision',
                'controlType' : 'integer',
                'default' : 5
              }
            ],
            'controlType' : 'number'
        },
        {
            'name': 'decimal',
            'params': [
              {
                'name' : 'digits',
                'controlType' : 'integer',
                'default' : 10
              },
              {
                'name' : 'precision',
                'controlType' : 'integer',
                'default' : 5
              }
            ],
            'controlType' : 'number'
        },
        {
            'name': 'string',
            'length': 50,
            'params': [
              {
                'name' : 'length',
                'controlType' : 'integer',
                'default' : 50
              }
            ],
            'controlType' : 'string'
        },
        {
            'name': 'char',
            'params': [
              {
                'name' : 'length',
                'controlType' : 'integer',
                'default' : 50
              }
            ],
            'controlType' : 'string'
        },
        {
            'name': 'text',
            'controlType' : 'string'
        },
        {
            'name': 'long-text',
            'controlType' : 'string'
        },
        {
            'name': 'medium-text',
            'controlType' : 'string'
        },
        {
            'name': 'date',
            'controlType' : 'string'
        },
        {
            'name': 'time',
            'controlType' : 'string'
        },
        {
            'name': 'date-time',
            'controlType' : 'string'
        },
        {
            'name': 'timestamp',
            'controlType' : 'number'
        },
        {
            'name': 'enum',
            'values': ['wizard', 'muggle'],
            'controlType' : 'object'
        },
        {
            'name': 'boolean',
            'controlType' : 'bool'
        },
        {
            'name': 'json',
            'controlType' : 'string'
        },
        {
            'name': 'jsonb',
            'controlType' : 'string'
        },
        {
            'name': 'morphs',
            'controlType' : 'string'
        },
        {
            'name': 'binary',
            'controlType' : 'string'
        }
    ];

    $scope.fieldParams = [
      {
        'name' : 'default',
        'controlType' : 'string',
        'val' : ''
      },
      {
        'name' : 'nullable',
        'controlType' : 'boolean',
        'val' : false
      },
      {
        'name' : 'unique',
        'controlType' : 'boolean',
        'val' : false
      },
      {
        'name' : 'foreign',
        'controlType' : 'string',
        'val' : ''
      },
      {
        'name' : 'description',
        'controlType' : 'string',
        'val' : ''
      }
    ];

    $scope.tableParams = [
      {
        'name' : 'timestamps',
        'controlType': 'boolean'
      },
      {
        'name' : 'soft-deletes',
        'controlType': 'boolean'
      }
    ];

    $scope.fieldId = 0;

    $scope.currentFieldType = '';

    $scope.database = {
      'tableName': '',
      'fields': {}
    };

    $scope.setFieldType = function() {
      // Get current field type
      var fieldType = $scope.fieldTypes[$scope.fieldId];

      // Store defaults parameters
      var _tmpParams = angular.copy($scope.fieldParams);

      // For each specific elements in field type
      for(var i in fieldType.params) {
        // Add current speficic parameter in defaults parameters
        _tmpParams.push(fieldType.params[i]);
      }

      // Overwrite specifics parameters of field type
      fieldType.params = _tmpParams;
      _tmpParams = false;

      $scope.currentFieldType = fieldType;
    };

    $scope.addField = function() {
      if(!$scope.tableName.length) {
        throw new Error('Table name must be a string');
      }
      else if(!$scope.fieldName.length) {
        throw new Error('Field name must be a string');
      }
      else if($scope.fieldName === 'id') {
        throw new Error('Field name must not be "id"');
      }
      else {
        $scope.database.tableName = $scope.tableName;

        $scope.database.fields[ $scope.fieldName ] = {
          'type' : $scope.currentFieldType.name
        };

        for(var i in $scope.currentFieldType.params) {
          $scope.database.fields[ $scope.fieldName ][ $scope.currentFieldType.params[i].name ] = $scope.currentFieldType.params[i].val;
        }

        $scope.fieldId = 0;
        $scope.currentFieldType = '';
      }
    };

    $scope.createDb = function() {
      $http.post('http://api.it-akademy.com/table/test', $scope.database).then(
        function(success) {
          console.log('success:', success);
        },

        function(error) {
          console.log('error:',error);
        }
      );

    };
  });
