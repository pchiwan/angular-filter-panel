
angular.module('pchiwan.directives')
	.directive('filter', function () {

		return {
			templateUrl: 'filter-directive.html',
			restrict: 'E',
			replace: true
		};
	});