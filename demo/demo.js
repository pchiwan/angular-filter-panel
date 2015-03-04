'use strict;'

angular.module('app.controllers', []);
angular.module('app', ['pchiwan.directives', 'app.controllers']);

///////////////////////

(function () {
	function appController ($scope, $filter) {

	    var self = this;

	    this.dataSource = [
	    	{ Cid: '000001', ClientName: 'Client 1', Cuid: '12345', Enabled: false, EntityName: 'Entity 1', CountryId: 'JP', CountryName: 'Japan' },
			{ Cid: '000001', ClientName: 'Client 1', Cuid: '23456', Enabled: true,  EntityName: 'Entity 2', CountryId: 'UK', CountryName: 'United Kingdom' },
			{ Cid: '000001', ClientName: 'Client 1', Cuid: '98713', Enabled: false, EntityName: 'Entity 3', CountryId: 'FR', CountryName: 'France' },
			{ Cid: '000001', ClientName: 'Client 1', Cuid: '89791', Enabled: false, EntityName: 'Entity 4', CountryId: 'FR', CountryName: 'France' },
			{ Cid: '000001', ClientName: null,       Cuid: '54697', Enabled: false, EntityName: 'Entity 5', CountryId: 'FR', CountryName: 'France' },
			{ Cid: '000002', ClientName: 'Client 2', Cuid: '85787', Enabled: true,  EntityName: 'Entity 1', CountryId: 'RU', CountryName: 'Russia' },
			{ Cid: '000002', ClientName: 'Client 2', Cuid: '14964', Enabled: false, EntityName: 'Entity 2', CountryId: 'DE', CountryName: 'Germany' },
			{ Cid: '000002', ClientName: 'Client 2', Cuid: '12345', Enabled: true,  EntityName: 'Entity 3', CountryId: 'DE', CountryName: 'Germany' },
			{ Cid: '000002', ClientName: 'Client 2', Cuid: '12345', Enabled: true,  EntityName: 'Entity 4', CountryId: 'DE', CountryName: '' },
			{ Cid: '000002', ClientName: 'Client 2', Cuid: '23456', Enabled: true,  EntityName: 'Entity 5', CountryId: 'UK', CountryName: 'United Kingdom' },
			{ Cid: '000003', ClientName: 'Client 3', Cuid: '98713', Enabled: true,  EntityName: 'Entity 1', CountryId: 'UK', CountryName: 'United Kingdom' },
			{ Cid: '000003', ClientName: 'Client 3', Cuid: '89791', Enabled: true,  EntityName: 'Entity 2', CountryId: 'UK', CountryName: 'United Kingdom' },
			{ Cid: '000003', ClientName: 'Client 3', Cuid: '85787', Enabled: false, EntityName: 'Entity 3', CountryId: 'RU', CountryName: 'Russia' },
			{ Cid: '000003', ClientName: 'Client 3', Cuid: '14964', Enabled: false, EntityName: 'Entity 4', CountryId: 'DE', CountryName: 'Germany' },
			{ Cid: '',       ClientName: 'Client 3', Cuid: '14964', Enabled: false, EntityName: 'Entity 5', CountryId: 'DE', CountryName: 'Germany' }
	    ];
	    this.searchExpr = '';
	    this.filterFunction = null;
	    this.filteredDataSource = [];

	    // Object.defineProperty(this, 'filteredDataSource', {
	    //       get: function () {
	    //             var arr = self.dataSource;
	    //             if (!!self.filterFunction) {
	    //                   arr = _.filter(self.dataSource, self.filterFunction);
	    //             }
	    //             console.log('recalculate filtered data source');
	    //             return $filter('filter')(arr, self.searchExpr);
	    //       }
	    // });	    

		var filterDataSource = function () {
			var arr = self.dataSource;
            if (!!self.filterFunction) {
              arr = _.filter(self.dataSource, self.filterFunction);
            }
            self.filteredDataSource = $filter('filter')(arr, self.searchExpr);
		};

		$scope.$watch(angular.bind(this, function () {
			return self.dataSource;
		}), filterDataSource);

		$scope.$watch(angular.bind(this, function () {
			return self.filterFunction;
		}), filterDataSource);

      	$scope.$on('filterPanel.applyFilters', function (event, data) {
          	self.filterFunction = data;
	    });
	}

	angular.module('app.controllers')
		.controller('appController', ['$scope', '$filter', appController]);
      
}());
