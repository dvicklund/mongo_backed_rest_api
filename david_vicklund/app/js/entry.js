require('angular/angular');
require('angular-route');
var angular = window.angular;

var foodApp = angular.module('FoodApp', ['ngRoute']);
require('./services/services')(foodApp);
require('./controllers/controllers')(foodApp);
require('./directives/directives')(foodApp);
require('./filters/filters')(foodApp);

foodApp.config(['$routeProvider', function($route) {
	$route
		.when('/food', {
			templateUrl: '/templates/food_view.html',
			controller: 'foodController'
		})
		.otherwise({
			redirectTo: '/food'
		})
		
}]);
