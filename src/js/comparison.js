(function(tc, _, $) {
	'use strict';

	var getURLParameter = function(name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
	};

	var rides = [{
		'id': 'begin',
		'target': 'school',
		'timeLabel': 'Beginn',
		'label': '1. Stunde'
	}, {
		'id': 'end5',
		'target': 'home',
		'timeLabel': 'Ende',
		'label': '5. Stunde'
	}, {
		'id': 'end6',
		'target': 'home',
		'timeLabel': 'Ende',
		'label': '6. Stunde'
	}, {
		'id': 'end8',
		'target': 'home',
		'timeLabel': 'Ende',
		'label': '8. Stunde'
	}, {
		'id': 'end10',
		'target': 'home',
		'timeLabel': 'Ende',
		'label': '10. Stunde'
	}];

	var formatTime = function(time) {
		var hours = Math.floor(time / 60);
		if (hours < 10) {
			hours = '0' + hours;
		}
		var minutes = time - (hours * 60);
		if (minutes < 10) {
			minutes = '0' + minutes;
		}
		return hours + ':' + minutes;
	};

	var comparison = {
		school: null,
		station: null,
		rideIndex: 0,
		ride: rides[0],
		getQueryParams: function() {
			return {
				'school': getURLParameter('school'),
				'station': getURLParameter('station')
			};
		},
		findSchoolByName: function(name, schools) {
			return _.find(schools, function(school) {
				return school.name == name;
			});
		},
		getRideLabel: function(school, station) {
			return school.name + ' - ' + station;
		},
		getRideInfo: function(school, ride) {
			var time = formatTime(school[ride.id]);
			return ride.timeLabel + ' der ' + ride.label + ': <strong>' + time + ' Uhr</strong>';
		},
		getFootwayInfo: function(school) {
			return 'Fußweg zwischen Haltestelle ' + school.station + ' und Schuleingang: <strong>' + school.footway + ' Minuten</strong>.';
		},
		getRides: function(timetable, rideMeta) {
			var startingStationIndex = timetable.stations.indexOf(rideMeta.startingPoint + ' (ab)');
			if (startingStationIndex < 0) {
				startingStationIndex = timetable.stations.indexOf(rideMeta.startingPoint);
			}
			var targetStationIndex = timetable.stations.indexOf(rideMeta.target);

			var filters = {
				'earliest': function(line) {
					var holds = line.timetable[startingStationIndex] != null && line.timetable[targetStationIndex] != null;
					var latest = rideMeta.limit + 90;
					return holds && line.timetable[startingStationIndex] >= rideMeta.limit && line.timetable[startingStationIndex] <= latest;
				},
				'latest': function(line) {
					var holds = line.timetable[startingStationIndex] && line.timetable[targetStationIndex] ? true : false;
					var earliest = rideMeta.limit - 90;
					return holds && line.timetable[targetStationIndex] <= rideMeta.limit && line.timetable[targetStationIndex] >= earliest;
				}
			};

			var relevantLines = _.filter(timetable.lines, filters[rideMeta.best]);
			var result = [];

			relevantLines.forEach(function(line) {
				var departure = line.timetable[startingStationIndex];
				var arrival = line.timetable[targetStationIndex];
				result.push({
					'name': line.name,
					'departure': departure,
					'arrival': arrival,
					'duration': arrival - departure
				});
			});

			return result;
		},
		getRideMeta: function(ride, school, station, stations) {
			var startingPoint = ride.target == 'school' ? station : school.station;
			var target = ride.target == 'school' ? school.station : station;
			var footwayConstant = ride.target == 'school' ? school.footway * -1 : school.footway;
			return {
				'startingPoint': startingPoint,
				'target': target,
				'direction': stations.indexOf(startingPoint) < stations.indexOf(target) ? 'forward' : 'reverse',
				'best': ride.target == 'school' ? 'latest' : 'earliest',
				'limit': school[ride.id] + footwayConstant
			};
		},
		getDeparturesCompact: function(rides) {
			var departures = '';
			rides.forEach(_.bind(function(ride) {
				if (departures.length > 0) {
					departures += ', ';
				}
				departures += formatTime(ride.departure);
			}, this));
			return departures;
		},
		getBestTime: function(best, rides) {
			if (!rides || !rides.length) {
				return '';
			}
			var f = best === 'latest' ? _.max : _.min;
			var bestRide = f(rides, function(ride) {
				return ride.departure;
			});
			return formatTime(bestRide.departure);
		},
		getBestLabel: function(best) {
			return best === 'latest' ? 'Späteste Hinfahrt' : 'Früheste Rückfahrt';
		},
		generateRideRows: function(rides) {
			var html = '';
			rides.forEach(function(ride) {
				html += '<tr><td>' + ride.name + '</td><td>' + formatTime(ride.departure) + '</td><td>' + formatTime(ride.arrival) + '</td><td>'
						+ ride.duration + ' Minuten</td></tr>';
			});
			return html;
		},
		onTabChange: function(event) {
			this.rideIndex = $('.nav-rides li').index($(event.target).parent());
			this.ride = rides[this.rideIndex];
			this.updateTab();
		},
		updateTable: function(rideMeta, side) {
			var rides = this.getRides(tc.timetable[rideMeta.direction + '-' + side], rideMeta);
			$('.ride-number-of-lines-' + side).text(rides.length);
			$('.ride-departures-' + side).text(this.getDeparturesCompact(rides));
			$('.ride-best-label').text(this.getBestLabel(rideMeta.best));
			$('.ride-best-' + side).text(this.getBestTime(rideMeta.best, rides));
		},
		updateTab: function() {
			$('.nav-rides li').removeClass('active');
			$('.nav-rides li:eq(' + this.rideIndex + ')').addClass('active');
			$('.ride-info').html(this.getRideInfo(this.school, this.ride));

			var rideMeta = this.getRideMeta(this.ride, this.school, this.station, tc.stations);
			this.updateTable(rideMeta, 'new');
			this.updateTable(rideMeta, 'old');
		},
		openLinesModal: function(event) {
			var plan = $(event.target).data('plan');
			var rideMeta = this.getRideMeta(this.ride, this.school, this.station, tc.stations);
			var rides = this.getRides(tc.timetable[rideMeta.direction + '-' + plan], rideMeta);

			$('.lines-modal-startingPoint').html(rideMeta.startingPoint);
			$('.lines-modal-target').text(rideMeta.target);
			$('.line-list').html(this.generateRideRows(rides));
			$('#lines-modal').modal('show');
		},
		init: function() {
			var params = this.getQueryParams();
			if (!params.school || !params.station) {
				return false;
			}

			this.school = this.findSchoolByName(params.school, tc.schools);
			this.station = params.station;

			$('#lines-modal').modal({
				show: false
			});
			$('.ride-lines-modal').on('click', _.bind(this.openLinesModal, this));
			$('.nav-rides').on('click', _.bind(this.onTabChange, this));
			$('.ride-label').html(this.getRideLabel(this.school, this.station));
			$('.ride-footway').html(this.getFootwayInfo(this.school));

			this.updateTab();
		}
	};

	tc.comparison = comparison;
})(tc, _, jQuery);