module.exports = function(app) {
	app.directive('foodSingleDirective', function() {
		return {
			restrict: 'AC',
			templateUrl: '/templates/food_single_template.html',
			scope: {
				food: '='
			}
		}
	});
};