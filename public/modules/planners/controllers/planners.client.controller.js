'use strict';

// Planners controller
angular.module('planners').controller('PlannersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Socket', 'Planners',
	function($scope, $stateParams, $location, Authentication, Socket, Planners) {
		$scope.authentication = Authentication;

		// Create new Planner
		$scope.create = function() {
			// Create new Planner object
			var planner = new Planners ({
				name: this.name,
				words: this.words,
				weekmess: this.weekmess,
				tests: this.tests,
				projects: this.projects,
				testdes: this.testdes,
				projectdes: this.projectdes,
				file: $scope.pfileup,
				mhwdue: this.mhwdue,
				mhwassign: this.mhwassign,
				mact: this.mact,
				mmaterials: this.mmaterials,
				thwdue: this.thwdue,
				thwassign: this.thwassign,
				tact: this.tact,
				tmaterials: this.tmaterials,
				whwdue: this.whwdue,
				whwassign: this.whwassign,
				wact: this.wact,
				wmaterials: this.wmaterials,
				thhwdue: this.thhwdue,
				thhwassign: this.thhwassign,
				thact: this.thact,
				thmaterials: this.thmaterials,
				fhwdue: this.fhwdue,
				fhwassign: this.fhwassign,
				fact: this.fact,
				fmaterials: this.fmaterials
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