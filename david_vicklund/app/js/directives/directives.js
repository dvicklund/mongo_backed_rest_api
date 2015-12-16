module.exports = function(app) {
	require('./list_directive')(app);
	require('../food/directives/food_single_directive')(app);
	require('../food/directives/food_form_directive')(app);
};