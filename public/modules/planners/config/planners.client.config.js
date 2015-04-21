'use strict';

// Configuring the Articles module
angular.module('planners').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Planners', 'planners', 'dropdown', '/planners(/create)?');
		Menus.addSubMenuItem('topbar', 'planners', 'List Planners', 'planners');
		Menus.addSubMenuItem('topbar', 'planners', 'New Planner', 'planners/create');
	}
]);