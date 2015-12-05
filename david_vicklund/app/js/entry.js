require('angular/angular');
var angular = window.angular;

var foodApp = angular.module('FoodApp', []);
require('./services/services')(foodApp);
require('./controllers/controllers')(foodApp);
