'use strict';

// transform the photo (passed in as data) using a fd to submit it using mulitpart.
function transformFile(data) {
    if (data === undefined)
      return data;
  console.log('transforming data',data);
    var fd = new FormData();
  fd.append('file', data.file);
  fd.append('name', data.name);
  fd.append('due', data.due);
  fd.append('description', data.description);
  fd.append('acode', data.acode);

  return fd;
}
//Assignments service used to communicate Assignments REST endpoints
angular.module('assignments').factory('Assignments', ['$resource',
	function($resource) {
		return $resource('assignments/:assignmentId', { assignmentId: '@_id'
		}, {
			update: {
				method: 'PUT'
			},
			save: {
			  method: 'POST',
                          transformRequest: transformFile,
                          headers: {'Content-Type': undefined}
			}

		});
	}
]);