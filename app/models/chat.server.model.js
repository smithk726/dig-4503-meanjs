'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Chat Schema
 */
var ChatSchema = new Schema({
	name: {
		type: String,
		default: ''
	},
	chatname: {
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

mongoose.model('Chat', ChatSchema);