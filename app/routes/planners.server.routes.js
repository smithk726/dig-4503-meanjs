'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var planners = require('../../app/controllers/planners.server.controller');
	var multer = require('multer');

	app.use(multer({ dest:'./public/uploads'}));

	// Planners Routes
	app.route('/planners')
		.get(planners.list)
		.post(users.requiresLogin, planners.create);

	app.route('/planners/:plannerId')
		.get(planners.read)
		.put(users.requiresLogin, planners.hasAuthorization, planners.update)
		.delete(users.requiresLogin, planners.hasAuthorization, planners.delete);

	// Finish by binding the Planner middleware
	app.param('plannerId', planners.plannerByID);
};
