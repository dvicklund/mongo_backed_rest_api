require('angular/angular');
var angular = window.angular;

var foodApp = angular.module('FoodApp', []);
require('./controllers/controllers')(foodApp);
