var express = require("express");
var Food = require('./foodModel');
var bodyParser = require('body-parser');
var handleError = require('./handleError');
var foodRouter = module.exports = exports = express.Router();

foodRouter.get('/food', function(req, res) {
  Food.find({}, function(err, data) {
    if(err) return handleError(err);
    res.json(data);
  });
});

foodRouter.post('/food', bodyParser.json(), function(req, res) {
  var newFood = new Food(req.body);
  newFood.save(function(err, data) {
    if(err) return handleError(err);
    res.json(data);
  });
});

foodRouter.put('/food/:id', bodyParser.json(), function(req, res) {
  var foodData = req.body;
  delete foodData._id;
  Food.update({_id: req.params.id}, foodData, function(err, data) {
    if(err) return handleError(err);
    res.json({msg: 'nailed it'});
  });
});

foodRouter.delete('/food/:id', function(req, res) {
  Food.remove({_id: req.params.id}, function(err) {
    if(err) return handleError(err);
    res.json({msg: "nailed it"});
  });
});