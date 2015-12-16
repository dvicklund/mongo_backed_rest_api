module.exports = function(app) {
	app.filter('list', function() {
		return function(input) {
			return input[0].toUpperCase() + input.slice(1, input.length) + ' List';
		};
	});
};