'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Planner = mongoose.model('Planner'),
	_ = require('lodash');

/**
 * Create a Planner
 */
exports.create = function(req, res) {
	console.log(req.body);
	console.log(req.files);

	var planner = new Planner(req.body);
	planner.user = req.user;

	if(req.files.file) {
		planner.pfileup = req.files.file.path.substring(7);
		console.log(planner.pfileup);
	} else
		planner.pfileup='';

	planner.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(planner);
		}
	});
};

/**
 * Show the current Planner
 */
exports.read = function(req, res) {
	res.jsonp(req.planner);
};

/**
 * Update a Planner
 */
exports.update = function(req, res) {
	var planner = req.planner ;

	planner = _.extend(planner , req.body);

	planner.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(planner);
		}
	});
};

/**
 * Delete an Planner
 */
exports.delete = function(req, res) {
	var planner = req.planner ;

	planner.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(planner);
		}
	});
};

/**
 * List of Planners
 */
exports.list = function(req, res) { 
	Planner.find().sort('-created').populate('user', 'displayName').exec(function(err, planners) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(planners);
		}
	});
};

/**
 * Planner middleware
 */
exports.plannerByID = function(req, res, next, id) { 
	Planner.findById(id).populate('user', 'displayName').exec(function(err, planner) {
		if (err) return next(err);
		if (! planner) return next(new Error('Failed to load Planner ' + id));
		req.planner = planner ;
		next();
	});
};

/**
 * Planner authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.planner.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
