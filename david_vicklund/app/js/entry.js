require('angular/angular');
var angular = window.angular;

var foodApp = angular.module('foodstream', []);
foodApp.controller('foodController', ['$scope', function($scope) {
  $scope.food = 'This is a test of the emergency hot dog system';

  $scope.alertGreeting = function() {
    alert($scope.food);
  };
}]);