module.exports = function(app) {
  app.controller('foodController', ['$scope', '$http', function($scope, $http) {
    $scope.foods = [];
    $scope.errors = [];
    
    var defaults = {
      name: 'default',
      type: 'edible',
      quantity: 1,
      unit: 'each',
      cost: 1.00
    };
    $scope.newFood = angular.copy($scope.defaults);

    var tmp = {};

    $scope.create = function(food) {
      $http.post('/api/food', food)
        .then(function(res) {
          $scope.foods.push(res.data);
          $scope.newFood = angular.copy($scope.defaults);
        }, function(err) {console.log(err);});
    };

    $scope.readAll = function() {
      $http.get('/api/food')
        .then(function(res) {
          $scope.foods = res.data;
        }, function(err) {
          console.log(err.data);
        });
    };
    
    $scope.update = function(food) {
      food.editing = false;
      $http.put('/api/food/' + food._id, food)
        .then(function(res) {
          console.log('Success.  Great job.  New lasagna properties.');
        }, function(err) {
          $scope.errors.push('Could not patch up your lasagna :(');
          console.log(err.data);
        });
    };

    $scope.remove = function(food) {
      $scope.foods.splice($scope.foods.indexOf(food), 1);
      $http.delete('/api/food/' + food._id)
        .then(function(res) {
          console.log('Lasagna successfully dropped from water tower.');
        }, function(err) {
          console.log(err.data);
          $scope.errors.push('Could not drop the lasagna');
          $scope.getAll();
        });
    };

    $scope.edit = function(food) {
      food.tmp = food.name;
      food.editing = true;
    };

    $scope.cancel = function(food) {
      food.name = food.tmp;
      food.editing = false;
    };
  }]);
};