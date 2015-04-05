'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Planner Schema
 */
var PlannerSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Planner name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Planner', PlannerSchema);