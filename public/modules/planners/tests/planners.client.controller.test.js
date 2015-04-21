'use strict';

(function() {
	// Planners Controller Spec
	describe('Planners Controller Tests', function() {
		// Initialize global variables
		var PlannersController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Planners controller.
			PlannersController = $controller('PlannersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Planner object fetched from XHR', inject(function(Planners) {
			// Create sample Planner using the Planners service
			var samplePlanner = new Planners({
				name: 'New Planner'
			});

			// Create a sample Planners array that includes the new Planner
			var samplePlanners = [samplePlanner];

			// Set GET response
			$httpBackend.expectGET('planners').respond(samplePlanners);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.planners).toEqualData(samplePlanners);
		}));

		it('$scope.findOne() should create an array with one Planner object fetched from XHR using a plannerId URL parameter', inject(function(Planners) {
			// Define a sample Planner object
			var samplePlanner = new Planners({
				name: 'New Planner'
			});

			// Set the URL parameter
			$stateParams.plannerId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/planners\/([0-9a-fA-F]{24})$/).respond(samplePlanner);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.planner).toEqualData(samplePlanner);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Planners) {
			// Create a sample Planner object
			var samplePlannerPostData = new Planners({
				name: 'New Planner'
			});

			// Create a sample Planner response
			var samplePlannerResponse = new Planners({
				_id: '525cf20451979dea2c000001',
				name: 'New Planner'
			});

			// Fixture mock form input values
			scope.name = 'New Planner';

			// Set POST response
			$httpBackend.expectPOST('planners', samplePlannerPostData).respond(samplePlannerResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Planner was created
			expect($location.path()).toBe('/planners/' + samplePlannerResponse._id);
		}));

		it('$scope.update() should update a valid Planner', inject(function(Planners) {
			// Define a sample Planner put data
			var samplePlannerPutData = new Planners({
				_id: '525cf20451979dea2c000001',
				name: 'New Planner'
			});

			// Mock Planner in scope
			scope.planner = samplePlannerPutData;

			// Set PUT response
			$httpBackend.expectPUT(/planners\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/planners/' + samplePlannerPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid plannerId and remove the Planner from the scope', inject(function(Planners) {
			// Create new Planner object
			var samplePlanner = new Planners({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Planners array and include the Planner
			scope.planners = [samplePlanner];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/planners\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePlanner);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.planners.length).toBe(0);
		}));
	});
}());