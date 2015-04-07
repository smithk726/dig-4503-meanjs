'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Gradebook Schema
 */
var GradebookSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Gradebook name',
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

mongoose.model('Gradebook', GradebookSchema);