var mongoose = require('mongoose');
var express = require('express');
var app = express();
var router = require(__dirname + "/lib/foodRouter");

mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/menudb");

app.use('/api', router);

app.listen(process.env.PORT || 3000, function() {
  console.log("Server listening on port " + (process.env.PORT || 3000));
});