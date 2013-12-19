(function(tc, $) {
	'use strict';

	var form = {
		getSchoolNames: function() {
			var names = [];
			tc.schools.forEach(function(school) {
				names.push(school.name);
			});
			return names;
		},
		generateOptionTags: function(entries) {
			var tags = '';
			entries.forEach(function(entry) {
				tags += '<option value="' + entry + '">' + entry + '</option>';
			});
			return tags;
		},
		init: function() {
			$('#school').html(this.generateOptionTags(this.getSchoolNames()));
			$('#station').html(this.generateOptionTags(tc.stations));
		}
	};

	tc.form = form;
})(tc, jQuery);