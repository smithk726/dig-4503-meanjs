'use strict';

// Todos controller
angular.module('todos').controller('TodosController', ['$scope', '$http', '$stateParams', '$route', '$location', 'Authentication', 'Todos',
	function($scope, $http, $stateParams, $route, $location, Authentication, Todos) {
		$scope.authentication = Authentication;

		// Create new Todo
		$scope.create = function() {
			// Create new Todo object
			var todo = new Todos ({
				dothis: this.dothis
			});

			// Redirect after save
			todo.$save(function(response) {
				//$location.path('#!/');

				// Clear form fields
				$scope.dothis = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
			$scope.todos = Todos.query();
			$scope.dothis = '';
		};

		// Remove existing Todo
		$scope.remove = function(todo) {
			if ( todo ) { 
				todo.$remove();

				for (var i in $scope.todos) {
					if ($scope.todos [i] === todo) {
						$scope.todos.splice(i, 1);
					}
				}
			} else {
				$scope.todo.$remove(function() {
					$location.path('todos');
				});
			}
		};

		$scope.deleteTodo = function(id) {
	        $http.delete('todos/' + id)
	            .success(function(data) {
	                $scope.todos = data;
	                //$scope.apply(function() {
	                //	$scope.todos = data;
	                //});
	            	$scope.todos = Todos.query();
	            })
	            .error(function(data) {
	                console.log('Error: ' + data);
	            });
	    };

		// Update existing Todo
		$scope.update = function() {
			var todo = $scope.todo;

			todo.$update(function() {
				$location.path('todos/' + todo._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Todos
		$scope.find = function() {
			$scope.todos = Todos.query();
		};

		// Find existing Todo
		$scope.findOne = function() {
			$scope.todo = Todos.get({ 
				todoId: $stateParams.todoId
			});
		};
	}
]);