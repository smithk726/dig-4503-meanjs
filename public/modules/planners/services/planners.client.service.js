'use strict';

// transform the file (passed in as data) using a fd to submit it using mulitpart.
function transformFile2(data) {
    if (data === undefined)
      return data;

	console.log('transforming data',data);

    var fd = new FormData();

	fd.append('file', data.file);
	fd.append('name', data.name);
	fd.append('words', data.words);
	fd.append('weekmess', data.weekmess);
	fd.append('tests', data.tests);
	fd.append('projects', data.projects);
	fd.append('testdes', data.testdes);
	fd.append('projectdes', data.projectdes);

	fd.append('mhwdue', data.mhwdue);
	fd.append('mhwassign', data.mhwassign);
	fd.append('mact', data.mact);
	fd.append('mmaterials', data.mmaterials);

	fd.append('thwdue', data.thwdue);
	fd.append('thwassign', data.thwassign);
	fd.append('tact', data.tact);
	fd.append('tmaterials', data.tmaterials);

	fd.append('whwdue', data.whwdue);
	fd.append('whwassign', data.whwassign);
	fd.append('wact', data.wact);
	fd.append('wmaterials', data.wmaterials);

	fd.append('thhwdue', data.thhwdue);
	fd.append('thhwassign', data.thhwassign);
	fd.append('thact', data.thact);
	fd.append('thmaterials', data.thmaterials);

	fd.append('fhwdue', data.fhwdue);
	fd.append('fhwassign', data.fhwassign);
	fd.append('fact', data.fact);
	fd.append('fmaterials', data.fmaterials);

	return fd;
}

//Planners service used to communicate Planners REST endpoints
angular.module('planners').factory('Planners', ['$resource',
	function($resource) {
		return $resource('planners/:plannerId', { plannerId: '@_id'
		}, {
			update: {
				method: 'PUT'
			},
			save: {
				method: 'POST',
							transformRequest: transformFile2,
							headers: {'Content-Type':undefined}
			}

		});
	}
]);