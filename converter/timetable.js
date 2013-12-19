var fs = require('fs'), csv = require('csv');
var argv = require('optimist').usage('Convert timetable csv file\nUsage: $0 [csvfile] [type]').demand(2).argv;

var convertTime = function(time) {
	if (!time) {
		return null;
	}
	var hours = Math.floor(time);
	var minutes = Math.round((time - hours) * 100);
	// console.log((hours * 60) + minutes);
	return (hours * 60) + minutes;
};

var input = csv().from(argv._[0]).to.array(function(data) {
	var result = {
		'stations': [],
		'lines': []
	};

	delete data[0][0];
	data[0].forEach(function(line) {
		result.lines.push({
			name: line,
			timetable: []
		});
	});

	delete data[0];
	data.forEach(function(columns) {
		result.stations.push(columns[0]);
		for ( var i = 1; i < columns.length; i++) {
			var minutes = convertTime(columns[i]);
			result.lines[i - 1].timetable.push(minutes);
		}
	});

	console.log('tc.timetable[\'' + argv._[1] + '\'] = ' + JSON.stringify(result, null, '\t') + ';');
});
