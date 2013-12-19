var fs = require('fs'), csv = require('csv');
var argv = require('optimist').usage('Convert csv file of stations\nUsage: $0 [csvfile]').demand(1).argv;

var input = csv().from(argv._[0]).to.array(function(data) {
	delete data[0];

	var result = [];
	data.forEach(function(line) {
		result.push(line[0]);
	});

	console.log('tc.stations = ' + JSON.stringify(result, null, '\t') + ';');
});
