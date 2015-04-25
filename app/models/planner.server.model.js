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
	words: {
		type: String,
		default: ''
	},
	weekmess: {
		type: String,
		default: ''
	},
	tests: {
		type: String,
		default: ''
	},
	projects: {
		type: String,
		default: ''
	},
	testdes: {
		type: String,
		default: ''
	},
	projectdes: {
		type: String,
		default: ''
	},
	pfileup: {
		type: String,
		default: ''
	},
	mhwdue: {
		type: String,
		default: ''
	},
	mhwassign: {
		type: String,
		default: ''
	},
	mact: {
		type: String,
		default: ''
	},
	mmaterials: {
		type: String,
		default: ''
	},
	thwdue: {
		type: String,
		default: ''
	},
	thwassign: {
		type: String,
		default: ''
	},
	tact: {
		type: String,
		default: ''
	},
	tmaterials: {
		type: String,
		default: ''
	},
	whwdue: {
		type: String,
		default: ''
	},
	whwassign: {
		type: String,
		default: ''
	},
	wact: {
		type: String,
		default: ''
	},
	wmaterials: {
		type: String,
		default: ''
	},
	thhwdue: {
		type: String,
		default: ''
	},
	thhwassign: {
		type: String,
		default: ''
	},
	thact: {
		type: String,
		default: ''
	},
	thmaterials: {
		type: String,
		default: ''
	},
	fhwdue: {
		type: String,
		default: ''
	},
	fhwassign: {
		type: String,
		default: ''
	},
	fact: {
		type: String,
		default: ''
	},
	fmaterials: {
		type: String,
		default: ''
	},
	pcode: {
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

mongoose.model('Planner', PlannerSchema);