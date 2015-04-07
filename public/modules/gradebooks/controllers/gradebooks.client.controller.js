'use strict';

// Gradebooks controller
angular.module('gradebooks').controller('GradebooksController', ['$scope', '$stateParams', '$location', 'Authentication', 'Gradebooks',
	function($scope, $stateParams, $location, Authentication, Gradebooks) {
		$scope.authentication = Authentication;

		// Create new Gradebook
		$scope.create = function() {
			// Create new Gradebook object
			var gradebook = new Gradebooks ({
				name: this.name
			});

			// Redirect after save
			gradebook.$save(function(response) {
				$location.path('gradebooks/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Gradebook
		$scope.remove = function(gradebook) {
			if ( gradebook ) { 
				gradebook.$remove();

				for (var i in $scope.gradebooks) {
					if ($scope.gradebooks [i] === gradebook) {
						$scope.gradebooks.splice(i, 1);
					}
				}
			} else {
				$scope.gradebook.$remove(function() {
					$location.path('gradebooks');
				});
			}
		};

		// Update existing Gradebook
		$scope.update = function() {
			var gradebook = $scope.gradebook;

			gradebook.$update(function() {
				$location.path('gradebooks/' + gradebook._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Gradebooks
		$scope.find = function() {
			$scope.gradebooks = Gradebooks.query();
		};

		// Find existing Gradebook
		$scope.findOne = function() {
			$scope.gradebook = Gradebooks.get({ 
				gradebookId: $stateParams.gradebookId
			});
		};
	}
]);