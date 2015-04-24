'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$rootScope', 'Authentication', 'Menus', 'Socket',
	function($scope, $rootScope, Authentication, Menus, Socket) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

		Socket.on('assignment.created', function(assignment) {
			console.log(assignment);
                  $rootScope.myValue=true;
		});

		Socket.on('planner.created', function(planner) {
			console.log(planner);
                  $rootScope.myPlanner=true;
		});
	}
]);