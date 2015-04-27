'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Todo Schema
 */
var TodoSchema = new Schema({
	dothis: {
		type: String,
		default: ''
	},
	done: {
		type: Boolean
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

mongoose.model('Todo', TodoSchema);