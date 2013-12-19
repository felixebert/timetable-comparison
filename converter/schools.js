var fs = require('fs'), csv = require('csv');
var argv = require('optimist').usage('Convert csv file of schools\nUsage: $0 [csvfile]').demand(1).argv;

var convertTime = function(time) {
	if (!time) {
		return null;
	}
	var hours = time.substr(0, 2);
	var minutes = time.substr(3, 2);
	return (parseInt(hours, 10) * 60) + parseInt(minutes, 10);
};

var input = csv().from(argv._[0]).to.array(function(data) {
	delete data[0];

	var result = [];
	data.forEach(function(line) {
		result.push({
			'name': line[0],
			'station': line[1],
			'footway': parseInt(line[2], 10),
			'begin': convertTime(line[3]),
			'end5': convertTime(line[4]),
			'end6': convertTime(line[5]),
			'end8': convertTime(line[6]),
			'end10': convertTime(line[7])
		});
	});

	console.log('tc.schools = ' + JSON.stringify(result, null, '\t') + ';');
});
