module.exports = function(app) {
  app.controller('foodController', ['$scope', '$http', 'foodResource', function($scope, $http, $foodResource) {

    $scope.foods = [];
    $scope.errors = [];
    
    $scope.defaults = {
      name: 'default',
      foodType: 'edible',
      quantity: 1,
      unit: 'each',
      cost: 1.00
    };

    $scope.newFood = angular.copy($scope.defaults);

    var foodResource = $foodResource('food');
    
    var tmp = {};

    $scope.readAll = function() {
      foodResource.readAll(function(err, data) {
        if(err) return err;
        $scope.foods = data;
      });
    };
    
    $scope.create = function(food) {
      foodResource.create(food, function(err, data) {
        if(err) return err;
        $scope.foods.push(data);
        $scope.newFood = angular.copy($scope.defaults);
      });
    };

    $scope.update = function(food) {
      food.editing = false;
      foodResource.update(food, function(err, data) {
        if(err) return err;
      });
    };

    // $scope.update = function(food) {
    //   food.editing = false;
    //   $http.put('/api/food/' + food._id, food)
    //     .then(function(res) {
    //       console.log('Success.  Great job.  New lasagna properties.');
    //     }, function(err) {
    //       $scope.errors.push('Could not patch up your lasagna :(');
    //       console.log(err.data);
    //     });
    // };

    $scope.remove = function(food) {
      $scope.foods.splice($scope.foods.indexOf(food), 1);
      foodResource.delete(food, function(err, data) {
        if(err) return err;
        $scope.readAll();
      });
    };

    // $scope.remove = function(food) {
    //   $scope.foods.splice($scope.foods.indexOf(food), 1);
    //   $http.delete('/api/food/' + food._id)
    //     .then(function(res) {
    //       console.log('Lasagna successfully dropped from water tower.');
    //     }, function(err) {
    //       console.log(err.data);
    //       $scope.errors.push('Could not drop the lasagna');
    //       $scope.readAll();
    //     });
    // };

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