'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Planner = mongoose.model('Planner'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, planner;

/**
 * Planner routes tests
 */
describe('Planner CRUD tests', function() {
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

		// Save a user to the test db and create new Planner
		user.save(function() {
			planner = {
				name: 'Planner Name'
			};

			done();
		});
	});

	it('should be able to save Planner instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Planner
				agent.post('/planners')
					.send(planner)
					.expect(200)
					.end(function(plannerSaveErr, plannerSaveRes) {
						// Handle Planner save error
						if (plannerSaveErr) done(plannerSaveErr);

						// Get a list of Planners
						agent.get('/planners')
							.end(function(plannersGetErr, plannersGetRes) {
								// Handle Planner save error
								if (plannersGetErr) done(plannersGetErr);

								// Get Planners list
								var planners = plannersGetRes.body;

								// Set assertions
								(planners[0].user._id).should.equal(userId);
								(planners[0].name).should.match('Planner Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Planner instance if not logged in', function(done) {
		agent.post('/planners')
			.send(planner)
			.expect(401)
			.end(function(plannerSaveErr, plannerSaveRes) {
				// Call the assertion callback
				done(plannerSaveErr);
			});
	});

	it('should not be able to save Planner instance if no name is provided', function(done) {
		// Invalidate name field
		planner.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Planner
				agent.post('/planners')
					.send(planner)
					.expect(400)
					.end(function(plannerSaveErr, plannerSaveRes) {
						// Set message assertion
						(plannerSaveRes.body.message).should.match('Please fill Planner name');
						
						// Handle Planner save error
						done(plannerSaveErr);
					});
			});
	});

	it('should be able to update Planner instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Planner
				agent.post('/planners')
					.send(planner)
					.expect(200)
					.end(function(plannerSaveErr, plannerSaveRes) {
						// Handle Planner save error
						if (plannerSaveErr) done(plannerSaveErr);

						// Update Planner name
						planner.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Planner
						agent.put('/planners/' + plannerSaveRes.body._id)
							.send(planner)
							.expect(200)
							.end(function(plannerUpdateErr, plannerUpdateRes) {
								// Handle Planner update error
								if (plannerUpdateErr) done(plannerUpdateErr);

								// Set assertions
								(plannerUpdateRes.body._id).should.equal(plannerSaveRes.body._id);
								(plannerUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Planners if not signed in', function(done) {
		// Create new Planner model instance
		var plannerObj = new Planner(planner);

		// Save the Planner
		plannerObj.save(function() {
			// Request Planners
			request(app).get('/planners')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Planner if not signed in', function(done) {
		// Create new Planner model instance
		var plannerObj = new Planner(planner);

		// Save the Planner
		plannerObj.save(function() {
			request(app).get('/planners/' + plannerObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', planner.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Planner instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Planner
				agent.post('/planners')
					.send(planner)
					.expect(200)
					.end(function(plannerSaveErr, plannerSaveRes) {
						// Handle Planner save error
						if (plannerSaveErr) done(plannerSaveErr);

						// Delete existing Planner
						agent.delete('/planners/' + plannerSaveRes.body._id)
							.send(planner)
							.expect(200)
							.end(function(plannerDeleteErr, plannerDeleteRes) {
								// Handle Planner error error
								if (plannerDeleteErr) done(plannerDeleteErr);

								// Set assertions
								(plannerDeleteRes.body._id).should.equal(plannerSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Planner instance if not signed in', function(done) {
		// Set Planner user 
		planner.user = user;

		// Create new Planner model instance
		var plannerObj = new Planner(planner);

		// Save the Planner
		plannerObj.save(function() {
			// Try deleting Planner
			request(app).delete('/planners/' + plannerObj._id)
			.expect(401)
			.end(function(plannerDeleteErr, plannerDeleteRes) {
				// Set message assertion
				(plannerDeleteRes.body.message).should.match('User is not logged in');

				// Handle Planner error error
				done(plannerDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Planner.remove().exec();
		done();
	});
});