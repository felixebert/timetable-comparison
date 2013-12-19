var fs = require('fs'), csv = require('csv'), wait = require('wait.for');
var argv = require('optimist').usage('Convert csv file of schools\nUsage: $0 [csvfile]').demand(1).argv;

var input = csv().from(argv._[0]).to.array(function(data) {
	delete data[0];

	var schools = [];
	data.forEach(function(line) {
		schools.push({
			'name': line[0],
			'station': line[1],
			'footway': line[2],
			'begin': line[3],
			'end5': line[4],
			'end6': line[5],
			'end8': line[6],
			'end10': line[7]
		});
	});

	console.log('tc.schools = ' + JSON.stringify(schools, null, '\t') + ';');
});
