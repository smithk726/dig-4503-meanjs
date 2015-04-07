'use strict';

//Setting up route
angular.module('gradebooks').config(['$stateProvider',
	function($stateProvider) {
		// Gradebooks state routing
		$stateProvider.
		state('listGradebooks', {
			url: '/gradebooks',
			templateUrl: 'modules/gradebooks/views/list-gradebooks.client.view.html'
		}).
		state('createGradebook', {
			url: '/gradebooks/create',
			templateUrl: 'modules/gradebooks/views/create-gradebook.client.view.html'
		}).
		state('viewGradebook', {
			url: '/gradebooks/:gradebookId',
			templateUrl: 'modules/gradebooks/views/view-gradebook.client.view.html'
		}).
		state('editGradebook', {
			url: '/gradebooks/:gradebookId/edit',
			templateUrl: 'modules/gradebooks/views/edit-gradebook.client.view.html'
		});
	}
]);