'use strict';

// Chats controller
angular.module('chats').controller('ChatsController', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'Chats', 'Socket',
	function($scope, $http, $stateParams, $location, Authentication, Chats, Socket) {
		$scope.authentication = Authentication;

		$scope.messages = [
			{text:'Welcome to the Chat Room', chatname:'' }
		];

		$scope.theusers = [];

		// Create new Chat
		$scope.create = function() {
			// Create new Chat object
			var chat = new Chats ({
				name: $scope.name,
				chatname: $scope.authentication.user.displayName
			});

			// Redirect after save
			chat.$save(function(response) {
				//$location.path('chats/' + response._id);

				// Clear form fields
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		Socket.on('chat.created', function(chat) {
			console.log(chat.name);
			$scope.messages.push({text:chat.name, chatname:chat.chatname});
			$scope.$apply();
			$scope.name='';
		});

		Socket.on('chat.new', function(chat) {
			console.log(chat.chatname);
			$scope.theusers.push(chat.chatname);
		});

		// Remove existing Chat
		$scope.remove = function(chat) {
			if ( chat ) { 
				chat.$remove();

				for (var i in $scope.chats) {
					if ($scope.chats [i] === chat) {
						$scope.chats.splice(i, 1);
					}
				}
			} else {
				$scope.chat.$remove(function() {
					$location.path('chats');
				});
			}
		};

		// Update existing Chat
		$scope.update = function() {
			var chat = $scope.chat;

			chat.$update(function() {
				$location.path('chats/' + chat._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Chats
		$scope.find = function() {
			$scope.chats = Chats.query();
		};

		// Find existing Chat
		$scope.findOne = function() {
			$scope.chat = Chats.get({ 
				chatId: $stateParams.chatId
			});
		};
	}
]);