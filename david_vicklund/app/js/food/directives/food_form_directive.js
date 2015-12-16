module.exports = function(app) {
	app.directive('foodFormDirective', function() {
		return {
			restrict: 'AC',
			replace: false,
			templateUrl: 'templates/food_form_template.html',
			transclude: true,
			scope: {
				buttonText: '@',
				headingText: '@',
				formName: '@',
				food: '=',
				save: '&'
			}
		}
	});
};