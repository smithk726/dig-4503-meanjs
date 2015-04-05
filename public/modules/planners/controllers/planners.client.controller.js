'use strict';

// Planners controller
angular.module('planners').controller('PlannersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Planners',
	function($scope, $stateParams, $location, Authentication, Planners) {
		$scope.authentication = Authentication;

		// Create new Planner
		$scope.create = function() {
			// Create new Planner object
			var planner = new Planners ({
				name: this.name
			});

			// Redirect after save
			planner.$save(function(response) {
				$location.path('planners/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Planner
		$scope.remove = function(planner) {
			if ( planner ) { 
				planner.$remove();

				for (var i in $scope.planners) {
					if ($scope.planners [i] === planner) {
						$scope.planners.splice(i, 1);
					}
				}
			} else {
				$scope.planner.$remove(function() {
					$location.path('planners');
				});
			}
		};

		// Update existing Planner
		$scope.update = function() {
			var planner = $scope.planner;

			planner.$update(function() {
				$location.path('planners/' + planner._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Planners
		$scope.find = function() {
			$scope.planners = Planners.query();
		};

		// Find existing Planner
		$scope.findOne = function() {
			$scope.planner = Planners.get({ 
				plannerId: $stateParams.plannerId
			});
		};
	}
]);