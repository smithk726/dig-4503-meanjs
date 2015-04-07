'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Gradebook = mongoose.model('Gradebook'),
	_ = require('lodash');

/**
 * Create a Gradebook
 */
exports.create = function(req, res) {
	var gradebook = new Gradebook(req.body);
	gradebook.user = req.user;

	gradebook.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(gradebook);
		}
	});
};

/**
 * Show the current Gradebook
 */
exports.read = function(req, res) {
	res.jsonp(req.gradebook);
};

/**
 * Update a Gradebook
 */
exports.update = function(req, res) {
	var gradebook = req.gradebook ;

	gradebook = _.extend(gradebook , req.body);

	gradebook.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(gradebook);
		}
	});
};

/**
 * Delete an Gradebook
 */
exports.delete = function(req, res) {
	var gradebook = req.gradebook ;

	gradebook.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(gradebook);
		}
	});
};

/**
 * List of Gradebooks
 */
exports.list = function(req, res) { 
	Gradebook.find().sort('-created').populate('user', 'displayName').exec(function(err, gradebooks) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(gradebooks);
		}
	});
};

/**
 * Gradebook middleware
 */
exports.gradebookByID = function(req, res, next, id) { 
	Gradebook.findById(id).populate('user', 'displayName').exec(function(err, gradebook) {
		if (err) return next(err);
		if (! gradebook) return next(new Error('Failed to load Gradebook ' + id));
		req.gradebook = gradebook ;
		next();
	});
};

/**
 * Gradebook authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.gradebook.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
