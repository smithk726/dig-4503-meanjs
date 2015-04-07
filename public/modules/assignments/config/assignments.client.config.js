'use strict';

// Configuring the Articles module
angular.module('assignments').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Assignments', 'assignments', 'dropdown', '/assignments(/create)?');
		Menus.addSubMenuItem('topbar', 'assignments', 'List Assignments', 'assignments');
		Menus.addSubMenuItem('topbar', 'assignments', 'New Assignment', 'assignments/create');
	}
]);