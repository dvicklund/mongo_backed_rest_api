var mongoose = require('mongoose');

var ingredientSchema = new mongoose.Schema({
  name: {type: String, default: "beef"},
  foodType: {type: String, default: "protein"},
  quantity: {type: Number, default: 1},
  unit: {type: String, default: "lbs"},
  cost: {type: Number, default: 1}
});

var foodSchema = new mongoose.Schema({
  name: String,
  foodType: String,
  description: String,
  price: {type: Number, default: 9.99},
  meal: {type: String, default: "dinner"},
  ingredients: [ingredientSchema]
});

module.exports = mongoose.model("Food", foodSchema);