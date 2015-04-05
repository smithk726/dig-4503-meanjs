'use strict';

//Planners service used to communicate Planners REST endpoints
angular.module('planners').factory('Planners', ['$resource',
	function($resource) {
		return $resource('planners/:plannerId', { plannerId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);