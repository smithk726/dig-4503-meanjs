'use strict';

//Setting up route
angular.module('planners').config(['$stateProvider',
	function($stateProvider) {
		// Planners state routing
		$stateProvider.
		state('listPlanners', {
			url: '/planners',
			templateUrl: 'modules/planners/views/list-planners.client.view.html'
		}).
		state('createPlanner', {
			url: '/planners/create',
			templateUrl: 'modules/planners/views/create-planner.client.view.html'
		}).
		state('viewPlanner', {
			url: '/planners/:plannerId',
			templateUrl: 'modules/planners/views/view-planner.client.view.html'
		}).
		state('editPlanner', {
			url: '/planners/:plannerId/edit',
			templateUrl: 'modules/planners/views/edit-planner.client.view.html'
		});
	}
]);