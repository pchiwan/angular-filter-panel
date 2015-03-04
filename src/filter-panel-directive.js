
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
			template: 
				'<div class="adp-filter-panel container-fluid">' +
					'<div class="row">' +
						'<filter ng-repeat="group in fpCtrl.filterGroups" title="group.title"></filter>' +
					'</div>' +
					'<div class="adp-filter-panel-buttons row">' +
						'<button class="btn btn-default" ng-click="fpCtrl.clearAll()">Clear all</button>' +
						'<button class="btn btn-primary" ng-click="fpCtrl.apply()">Apply</button>' +
					'</div>' +
				'</div>',
			restrict: 'E',
			replace: true
		};
	});
