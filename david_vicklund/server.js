var mongoose = require('mongoose');
var express = require('express');
var app = express();
var router = require(__dirname + "/lib/foodRouter");
var auth = require(__dirname + "/lib/authRouter");

mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/menudb");

app.use('/api', router);
app.use('/api', auth);

app.listen(process.env.PORT || 3000, function() {
  console.log("Server listening on port " + (process.env.PORT || 3000));
});