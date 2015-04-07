'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var gradebooks = require('../../app/controllers/gradebooks.server.controller');

	// Gradebooks Routes
	app.route('/gradebooks')
		.get(gradebooks.list)
		.post(users.requiresLogin, gradebooks.create);

	app.route('/gradebooks/:gradebookId')
		.get(gradebooks.read)
		.put(users.requiresLogin, gradebooks.hasAuthorization, gradebooks.update)
		.delete(users.requiresLogin, gradebooks.hasAuthorization, gradebooks.delete);

	// Finish by binding the Gradebook middleware
	app.param('gradebookId', gradebooks.gradebookByID);
};
