var express = require('express');
var app = express();
var mongoose = require('mongoose');
var fs = require('fs');
process.env.APP_SECRET = process.env.APP_SECRET || 'somesortofstringorsomesuch';

var router = require(__dirname + "/routes/foodRouter");
 
var auth = require(__dirname + "/routes/authRouter");

mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/menudb");

app.use(express.static(__dirname + '/build'));

app.use('/api', router);
app.use('/api', auth);

app.get('/:filename', function(req, res, next) {
  fs.stat(__dirname + '/build/' + req.params.filename, function(err, stats) {
    if(err) {
      console.log(err);
      return next();
    }

    if(!stats.isFile()) return next();

    var file = fs.createReadStream(__dirname + '/build/' + req.params.filename);
    file.pipe(res);
  });
});

app.use(function(req, res) {
  res.status(404).send('could not find file');
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server listening on port " + (process.env.PORT || 3000));
});