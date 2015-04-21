'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Assignment Schema
 */
var AssignmentSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill assignment name',
		trim: true
	},
	description: {
		type: String,
		default: ''
	},
	due: {
		type: Date,
		default: '',
		//required: 'Please fill in a due date'
	},
	fileup: {
		type: String,
		default: ''
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

mongoose.model('Assignment', AssignmentSchema);