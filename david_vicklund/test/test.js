var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var Food = require(__dirname + "/../models/foodModel");

process.env.MONGOLAB_URI = "mongodb://localhost/menudb";
require(__dirname + "/../server");

describe('routes', function() {

  describe('food routes', function() {
    it('should be able to make some food', function(done) {
      var foodData = {name: "allspice"};
      chai.request('localhost:3000')
        .post('/api/food')
        .send(foodData)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.name).to.eql('allspice');
          expect(res.body).to.have.property('_id');
          done();
        });
    });

    it('should get all food', function(done) {
      chai.request('localhost:3000')
        .get('/api/food')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(Array.isArray(res.body)).to.eql(true);
          done();
        });
    });

    describe('food transformation', function() {
      beforeEach(function(done) {
        (new Food({name: 'thyme'})).save(function(err, data) {
          expect(err).to.eql(null);
          this.food = data;
          done();
        }.bind(this));
      });

      it('should be able to modify some food', function(done) {
        chai.request('localhost:3000')
          .put('/api/food/' + this.food._id)
          .send({name: 'rosemary'})
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res.body.msg).to.eql('nailed it');
            done();
          });
      });

      it('should be able to remove food', function(done) {
        chai.request('localhost:3000')
          .delete('/api/food/' + this.food._id)
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res.body.msg).to.eql('nailed it');
            done();
          });
      });
    });
  });

  describe('auth routes', function() {
    it('should be able to create a user', function(done) {
      chai.request('localhost:3000')
        .post('/api/signup')
        .send({username: 'test', password: 'pass'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('should sign a user in', function(done) {
      chai.request('localhost:3000')
        .get('/api/signin')
        .auth('test', 'pass')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('should refuse bad username', function(done) {
      chai.request('localhost:3000')
        .get('/api/signin')
        .auth('wrong', 'bad')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.eql('You do not exist!  (Try creating a user)');
          done();
        });
    });

    it('should refuse bad password', function(done) {
      chai.request('localhost:3000')
        .get('/api/signin')
        .auth('test', 'bad')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.eql("Plz don't feed the trolls");
          done();
        });
    });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });
});