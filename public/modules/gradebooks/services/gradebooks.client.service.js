'use strict';

//Gradebooks service used to communicate Gradebooks REST endpoints
angular.module('gradebooks').factory('Gradebooks', ['$resource',
	function($resource) {
		return $resource('gradebooks/:gradebookId', { gradebookId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);