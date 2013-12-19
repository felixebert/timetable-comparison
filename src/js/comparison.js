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
		findSchoolByName: function(name) {
			return _.find(tc.schools, function(school) {
				return school.name == name;
			});
		},
		getRideLabel: function() {
			return this.school.name + ' - ' + this.station;
		},
		getRideInfo: function() {
			var time = this.school[this.ride.id].substr(0, 5);
			return this.ride.timeLabel + ' der ' + this.ride.label + ': <strong>' + time + ' Uhr</strong>';
		},
		getFootwayInfo: function() {
			return 'Fußweg zwischen Haltestelle ' + this.school.station + ' und Schuleingang: <strong>' + this.school.footway + ' Minuten</strong>.';
		},
		onTabChange: function(event) {
			this.rideIndex = $('.nav-rides li').index($(event.target).parent());
			this.ride = rides[this.rideIndex];
			this.updateTab();
		},
		updateTab: function() {
			$('.nav-rides li').removeClass('active');
			$('.nav-rides li:eq(' + this.rideIndex + ')').addClass('active');

			$('.ride-info').html(this.getRideInfo());
		},
		init: function() {
			var params = this.getQueryParams();
			if (!params.school || !params.station) {
				return false;
			}

			this.school = this.findSchoolByName(params.school);
			this.station = params.station;

			$('.nav-rides').on('click', _.bind(this.onTabChange, this));
			$('.ride-label').html(this.getRideLabel());
			$('.ride-footway').html(this.getFootwayInfo());

			this.updateTab();
		}
	};

	tc.comparison = comparison;
})(tc, _, jQuery);