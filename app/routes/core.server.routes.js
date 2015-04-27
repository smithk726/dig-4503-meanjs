'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	var users = require('../../app/controllers/users.server.controller');
	var todos = require('../../app/controllers/todos.server.controller');
	app.route('/').get(core.index);

	app.route('/')
		.get(todos.read)
		.delete(users.requiresLogin, todos.hasAuthorization, todos.delete);
};