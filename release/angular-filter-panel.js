/********************
 * angular-filter-panel
 * by Sílvia Mur Blanch aka PchiwaN
 * https://github.com/pchiwan/angular-filter-panel
 *
 * NOTE: Latest version of Underscore.js is required.
 ********************/
'use strict;'

String.prototype.capitalizeFirstLetter = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.format = function () {
	var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match;
    });	
};

String.prototype.splitWord = function () {
	return this.split(/(?=[A-Z])/).join(' ');
};

angular.module('pchiwan.directives', []);

angular.module('pchiwan.directives').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/filter-directive.html',
    "<div class=\"adp-filter col-md-3 col-xs-4\">\r" +
    "\n" +
    "\t<div class=\"row adp-filter-header\">\r" +
    "\n" +
    "\t\t<h4>{{group.title}}<h4>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "\t<div class=\"row adp-filter-content\">\r" +
    "\n" +
    "\t\t<div class=\"adp-filter-item\" ng-repeat=\"filterItem in group.source\">\r" +
    "\n" +
    "\t\t\t<input type=\"checkbox\" ng-model=\"filterItem.selected\">\r" +
    "\n" +
    "\t\t\t&nbsp;<span>{{filterItem.value}}&nbsp;({{filterItem.count}})</span>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('src/filter-panel-directive.html',
    "<div class=\"adp-filter-panel container-fluid\">\r" +
    "\n" +
    "\t<div class=\"row\">\r" +
    "\n" +
    "\t\t<adp-filter ng-repeat=\"group in fpCtrl.filterGroups\" title=\"group.title\"></adp-filter>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "\t<div class=\"adp-filter-panel-buttons row\">\r" +
    "\n" +
    "\t\t<button class=\"btn btn-default\" ng-click=\"fpCtrl.clearAll()\">Clear all</button>\r" +
    "\n" +
    "\t\t<button class=\"btn btn-primary\" ng-click=\"fpCtrl.apply()\">Apply</button>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</div>"
  );

}]);


angular.module('pchiwan.directives')
	.directive('filterPanel', function () {

		var controller = function ($scope, $attrs) {

			var self = this,
				filterProps = $attrs.filterProps.split(','),
				allowNulls = 'allowNulls' in $attrs,
				selectedFilters = {};

			this.filterGroups = [];

			//#region private methods

			function createFilters(dataSource) {

				self.filterGroups = [];

				for (var i = 0, l = filterProps.length; i < l; i++) {
					var filterProp = filterProps[i];

					//if no nulls -or empty values- allowed, filter them out
					if (!allowNulls) {
						dataSource = _.reject(dataSource, function (x) {
							return x[filterProp] === null || x[filterProp] === '';
						});
					}
					//group filter property by values
					var groups = _.groupBy(dataSource, function (x) {
						return x[filterProp];
					});
					self.filterGroups.push({
						prop: filterProp,
						title: filterProp.splitWord().capitalizeFirstLetter(),
						hasNulls: _.some($scope.originalSource, function (x) {
							return x[filterProp] === null;
						}),
						source: _.values(_.mapObject(groups, function (val, key) {
							return {
								value: key,
								count: val.length,
								selected: isFilterValueSelected(filterProp, key)
							}
						}))	
					});
				}
			}

			function isFilterValueSelected(filterProp, value) {

				if (selectedFilters.hasOwnProperty(filterProp)) {
					return _.contains(selectedFilters[filterProp].values, value);
				}
				return false;
			};

			function collectSelectedFilters() {
				
				selectedFilters = {};

				for (var i = 0, l1 = self.filterGroups.length; i < l1; i++) {
					//retrieve checked items in filter group
					var selectedItems = _.filter(self.filterGroups[i].source, function (x) {
						return x.selected;
					});
					if (selectedItems.length) {
						selectedFilters[self.filterGroups[i].prop] = {
							hasNulls: self.filterGroups[i].hasNulls,
							values: _.pluck(selectedItems, 'value')
						};
					}
				}
			};

			function generateFilterConditions() {

				var conditions = [];

				for (var filterProp in selectedFilters) {
					var subconditions = [];
					for (var i = 0, l = selectedFilters[filterProp].values.length; i < l; i++) {
						if (selectedFilters[filterProp].values[i] === "null") {
							continue;
						}
						subconditions.push('item.{0}.toString() == "{1}"'.format(filterProp, selectedFilters[filterProp].values[i]));	
					}
					conditions.push((selectedFilters[filterProp].hasNulls ? '(item.{0} !== null && ({1}))' : '({1})').format(filterProp, subconditions.join(' || ')));
				};

				return conditions.join(' && ');
			};

			//#endregion

			//#region public methods

			this.clearAll = function () {

				selectedFilters = {};
				createFilters($scope.originalSource);
			};

			this.apply = function () {

				var filterConditions,
					filterFunction;
				
				collectSelectedFilters();
				filterConditions = generateFilterConditions();

				filterFunction = new Function('item', 'return {0};'.format(!!filterConditions ? filterConditions : 'true'));
				$scope.$emit('filterPanel.applyFilters', filterFunction);

				createFilters(_.filter($scope.originalSource, filterFunction));
			};

			//#endregion

			//initialize directive
			$scope.$watch('originalSource', function (newVal) {
				createFilters(newVal);
			});			
		};

		return {
			controller: ['$scope', '$attrs', controller],
			controllerAs: 'fpCtrl',
			scope: {
				originalSource: '=source'
			},
			templateUrl: 'filter-panel-directive.html',
			restrict: 'E',
			replace: true
		};
	});


angular.module('pchiwan.directives')
	.directive('filter', function () {

		return {
			templateUrl: 'filter-directive.html',
			restrict: 'E',
			replace: true
		};
	});