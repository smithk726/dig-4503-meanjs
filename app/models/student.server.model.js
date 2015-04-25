'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Student Schema
 */
var StudentSchema = new Schema({
	name: {
		type: String,
		default: ''
	},
	lname: {
		type: String,
		default: ''
	},
	stype: {
		type: String
	},
	scode: {
		type: String
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

mongoose.model('Student', StudentSchema);