require(__dirname + '/../../app/js/entry');
require('angular-mocks');

describe('food controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('FoodApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = $ControllerConstructor('foodController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.foods)).toBe(true);
  });

  describe('REST request functions', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('foodController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should add an array to foods with a GET all', function() {
      $httpBackend.expectGET('/api/food').respond(200, [{_id: 1, name: 'test food'}]);
      $scope.readAll();
      $httpBackend.flush();
      expect($scope.foods[0].name).toBe('test food');
    });

    it('should be able to create new food', function() {
      $httpBackend.expectPOST('/api/food', {
        name: 'test food', type: 'edible', quantity:1, unit:'each', cost:1
      }).respond(200, {name: 'a different food'});
      expect($scope.foods.length).toBe(0);
      expect($scope.newFood).toEqual($scope.defaults);
      $scope.newFood.name = 'test food';
      $scope.create($scope.newFood);
      $httpBackend.flush();
      expect($scope.foods[0].name).toBe('a different food');
      expect($scope.newFood).toEqual($scope.defaults);
    });

    it('should be able to update a food', function() {
      $httpBackend.expectPUT('/api/food/1', {
        name: 'test food', _id: 1, editing: false
      }).respond(200, {});
      $scope.update({name: 'test food', _id: 1});
      $httpBackend.flush();
    });

    it('should be able to remove a food', function() {
      $httpBackend.expectPOST('/api/food')
        .respond(200, {name: 'test'});
      $httpBackend.expectDELETE('/api/food/1')
        .respond(200, {msg: 'success!'});
      $httpBackend.expectGET('/api/food')
        .respond(200, []);
      $scope.create({name: 'test', _id: 1});
      $scope.remove({name: 'test', _id: 1});
      $httpBackend.flush();
    });
  });
});