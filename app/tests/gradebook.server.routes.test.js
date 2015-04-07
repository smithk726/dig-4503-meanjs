'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Gradebook = mongoose.model('Gradebook'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, gradebook;

/**
 * Gradebook routes tests
 */
describe('Gradebook CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Gradebook
		user.save(function() {
			gradebook = {
				name: 'Gradebook Name'
			};

			done();
		});
	});

	it('should be able to save Gradebook instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Gradebook
				agent.post('/gradebooks')
					.send(gradebook)
					.expect(200)
					.end(function(gradebookSaveErr, gradebookSaveRes) {
						// Handle Gradebook save error
						if (gradebookSaveErr) done(gradebookSaveErr);

						// Get a list of Gradebooks
						agent.get('/gradebooks')
							.end(function(gradebooksGetErr, gradebooksGetRes) {
								// Handle Gradebook save error
								if (gradebooksGetErr) done(gradebooksGetErr);

								// Get Gradebooks list
								var gradebooks = gradebooksGetRes.body;

								// Set assertions
								(gradebooks[0].user._id).should.equal(userId);
								(gradebooks[0].name).should.match('Gradebook Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Gradebook instance if not logged in', function(done) {
		agent.post('/gradebooks')
			.send(gradebook)
			.expect(401)
			.end(function(gradebookSaveErr, gradebookSaveRes) {
				// Call the assertion callback
				done(gradebookSaveErr);
			});
	});

	it('should not be able to save Gradebook instance if no name is provided', function(done) {
		// Invalidate name field
		gradebook.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Gradebook
				agent.post('/gradebooks')
					.send(gradebook)
					.expect(400)
					.end(function(gradebookSaveErr, gradebookSaveRes) {
						// Set message assertion
						(gradebookSaveRes.body.message).should.match('Please fill Gradebook name');
						
						// Handle Gradebook save error
						done(gradebookSaveErr);
					});
			});
	});

	it('should be able to update Gradebook instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Gradebook
				agent.post('/gradebooks')
					.send(gradebook)
					.expect(200)
					.end(function(gradebookSaveErr, gradebookSaveRes) {
						// Handle Gradebook save error
						if (gradebookSaveErr) done(gradebookSaveErr);

						// Update Gradebook name
						gradebook.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Gradebook
						agent.put('/gradebooks/' + gradebookSaveRes.body._id)
							.send(gradebook)
							.expect(200)
							.end(function(gradebookUpdateErr, gradebookUpdateRes) {
								// Handle Gradebook update error
								if (gradebookUpdateErr) done(gradebookUpdateErr);

								// Set assertions
								(gradebookUpdateRes.body._id).should.equal(gradebookSaveRes.body._id);
								(gradebookUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Gradebooks if not signed in', function(done) {
		// Create new Gradebook model instance
		var gradebookObj = new Gradebook(gradebook);

		// Save the Gradebook
		gradebookObj.save(function() {
			// Request Gradebooks
			request(app).get('/gradebooks')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Gradebook if not signed in', function(done) {
		// Create new Gradebook model instance
		var gradebookObj = new Gradebook(gradebook);

		// Save the Gradebook
		gradebookObj.save(function() {
			request(app).get('/gradebooks/' + gradebookObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', gradebook.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Gradebook instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Gradebook
				agent.post('/gradebooks')
					.send(gradebook)
					.expect(200)
					.end(function(gradebookSaveErr, gradebookSaveRes) {
						// Handle Gradebook save error
						if (gradebookSaveErr) done(gradebookSaveErr);

						// Delete existing Gradebook
						agent.delete('/gradebooks/' + gradebookSaveRes.body._id)
							.send(gradebook)
							.expect(200)
							.end(function(gradebookDeleteErr, gradebookDeleteRes) {
								// Handle Gradebook error error
								if (gradebookDeleteErr) done(gradebookDeleteErr);

								// Set assertions
								(gradebookDeleteRes.body._id).should.equal(gradebookSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Gradebook instance if not signed in', function(done) {
		// Set Gradebook user 
		gradebook.user = user;

		// Create new Gradebook model instance
		var gradebookObj = new Gradebook(gradebook);

		// Save the Gradebook
		gradebookObj.save(function() {
			// Try deleting Gradebook
			request(app).delete('/gradebooks/' + gradebookObj._id)
			.expect(401)
			.end(function(gradebookDeleteErr, gradebookDeleteRes) {
				// Set message assertion
				(gradebookDeleteRes.body.message).should.match('User is not logged in');

				// Handle Gradebook error error
				done(gradebookDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Gradebook.remove().exec();
		done();
	});
});