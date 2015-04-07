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
		default: '',
		required: 'Please fill first name',
		trim: true
	},
	lname: {
		type: String,
		default: '',
		required: 'Please fill in last name',
		trim: true
	},
	studid: {
		type: String,
		default: '',
		required: 'Please fill in Student ID'
	},
	pname: {
		type: String,
		default: '',
		required: 'Please fill in parent name',
		trim: true
	},
	plname: {
		type: String,
		default: '',
		required: 'Please fill in parent last name',
		trim: true
	},
	phonenum: {
		type: String,
		default: '',
		required: 'Please fill in phone number',
	},
	pemail: {
		type: String,
		default: '',
		required: 'Please fill in email',
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