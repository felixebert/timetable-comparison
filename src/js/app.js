var tc = {};

(function(tc, angular) {
	var ComparisonCtrl = function($scope) {
		$scope.examples = tc.examples;
	};
	ComparisonCtrl.$inject = ['$scope', '$http'];

	tc.ComparisonCtrl = ComparisonCtrl;
})(tc, angular);