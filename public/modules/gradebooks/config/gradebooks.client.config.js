'use strict';

// Configuring the Articles module
angular.module('gradebooks').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Gradebook', 'gradebooks', '/gradebooks(/create)?');
		/*Menus.addSubMenuItem('topbar', 'gradebooks', 'List Gradebooks', 'gradebooks');
		Menus.addSubMenuItem('topbar', 'gradebooks', 'New Gradebook', 'gradebooks/create');*/
	}
]);