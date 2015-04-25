'use strict';

// Assignments controller
angular.module('assignments').controller('AssignmentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Socket', 'Assignments',
	function($scope, $stateParams, $location, Authentication, Socket, Assignments) {
		$scope.authentication = Authentication;

		$scope.currentDate = new Date();

		// Create new Assignment
		$scope.create = function() {
			// Create new Assignment object
			var assignment = new Assignments ({
				name: this.name,
				description: this.description,
				due: $scope.due,
				file: $scope.fileup,
				acode: $scope.authentication.user.accesscode
			});

			// Redirect after save
			assignment.$save(function(response) {
				$location.path('assignments/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Assignment
		$scope.remove = function(assignment) {
			if ( assignment ) { 
				assignment.$remove();

				for (var i in $scope.assignments) {
					if ($scope.assignments [i] === assignment) {
						$scope.assignments.splice(i, 1);
					}
				}
			} else {
				$scope.assignment.$remove(function() {
					$location.path('assignments');
				});
			}
		};

		// Update existing Assignment
		$scope.update = function() {
			var assignment = $scope.assignment;

			assignment.$update(function() {
				$location.path('assignments/' + assignment._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Assignments
		$scope.find = function() {
			$scope.assignments = Assignments.query();
		};

		// Find existing Assignment
		$scope.findOne = function() {
			$scope.assignment = Assignments.get({ 
				assignmentId: $stateParams.assignmentId
			});
		};
	}
])

.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);