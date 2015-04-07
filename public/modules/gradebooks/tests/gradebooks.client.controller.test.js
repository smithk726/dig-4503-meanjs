'use strict';

(function() {
	// Gradebooks Controller Spec
	describe('Gradebooks Controller Tests', function() {
		// Initialize global variables
		var GradebooksController,
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

			// Initialize the Gradebooks controller.
			GradebooksController = $controller('GradebooksController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Gradebook object fetched from XHR', inject(function(Gradebooks) {
			// Create sample Gradebook using the Gradebooks service
			var sampleGradebook = new Gradebooks({
				name: 'New Gradebook'
			});

			// Create a sample Gradebooks array that includes the new Gradebook
			var sampleGradebooks = [sampleGradebook];

			// Set GET response
			$httpBackend.expectGET('gradebooks').respond(sampleGradebooks);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.gradebooks).toEqualData(sampleGradebooks);
		}));

		it('$scope.findOne() should create an array with one Gradebook object fetched from XHR using a gradebookId URL parameter', inject(function(Gradebooks) {
			// Define a sample Gradebook object
			var sampleGradebook = new Gradebooks({
				name: 'New Gradebook'
			});

			// Set the URL parameter
			$stateParams.gradebookId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/gradebooks\/([0-9a-fA-F]{24})$/).respond(sampleGradebook);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.gradebook).toEqualData(sampleGradebook);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Gradebooks) {
			// Create a sample Gradebook object
			var sampleGradebookPostData = new Gradebooks({
				name: 'New Gradebook'
			});

			// Create a sample Gradebook response
			var sampleGradebookResponse = new Gradebooks({
				_id: '525cf20451979dea2c000001',
				name: 'New Gradebook'
			});

			// Fixture mock form input values
			scope.name = 'New Gradebook';

			// Set POST response
			$httpBackend.expectPOST('gradebooks', sampleGradebookPostData).respond(sampleGradebookResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Gradebook was created
			expect($location.path()).toBe('/gradebooks/' + sampleGradebookResponse._id);
		}));

		it('$scope.update() should update a valid Gradebook', inject(function(Gradebooks) {
			// Define a sample Gradebook put data
			var sampleGradebookPutData = new Gradebooks({
				_id: '525cf20451979dea2c000001',
				name: 'New Gradebook'
			});

			// Mock Gradebook in scope
			scope.gradebook = sampleGradebookPutData;

			// Set PUT response
			$httpBackend.expectPUT(/gradebooks\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/gradebooks/' + sampleGradebookPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid gradebookId and remove the Gradebook from the scope', inject(function(Gradebooks) {
			// Create new Gradebook object
			var sampleGradebook = new Gradebooks({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Gradebooks array and include the Gradebook
			scope.gradebooks = [sampleGradebook];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/gradebooks\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleGradebook);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.gradebooks.length).toBe(0);
		}));
	});
}());