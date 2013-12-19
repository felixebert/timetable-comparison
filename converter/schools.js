var fs = require('fs'), csv = require('csv');
var argv = require('optimist').usage('Convert csv file of schools\nUsage: $0 [csvfile]').demand(1).argv;

var input = csv().from(argv._[0]).to(function(data) {
	console.log(data);
});
