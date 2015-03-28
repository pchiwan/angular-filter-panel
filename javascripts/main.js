
angular.module('app', ['pchiwan.directives'])
      .controller('appCtrl', function ($scope) {

      	$scope.dataSource = [
      		{ Id:  1, Client: 'Client 1', Code: 'AAAAA', Enabled: false, Sport: 'Football',   Country: 'Japan'          },
			{ Id:  2, Client: 'Client 1', Code: 'BBBBB', Enabled: true,  Sport: 'Basketball', Country: 'United Kingdom' },
			{ Id:  3, Client: 'Client 1', Code: 'CCCCC', Enabled: false, Sport: 'Running',    Country: 'France'         },
			{ Id:  4, Client: 'Client 1', Code: 'DDDDD', Enabled: false, Sport: 'Climbing',   Country: 'France'         },
			{ Id:  5, Client: null,       Code: 'FFFFF', Enabled: false, Sport: 'Football',   Country: 'France'         },
			{ Id:  6, Client: 'Client 2', Code: 'CCCCC', Enabled: true,  Sport: 'Basketball', Country: 'Russia'         },
			{ Id:  7, Client: 'Client 2', Code: 'AAAAA', Enabled: false, Sport: 'Running',    Country: 'Germany'        },
			{ Id:  8, Client: 'Client 2', Code: 'CCCCC', Enabled: true,  Sport: 'Football',   Country: 'Germany'        },
			{ Id:  9, Client: 'Client 2', Code: 'BBBBB', Enabled: true,  Sport: 'Football',   Country: ''               },
			{ Id: 10, Client: 'Client 2', Code: 'DDDDD', Enabled: true,  Sport: 'Football',   Country: 'United Kingdom' },
			{ Id: 11, Client: 'Client 3', Code: 'CCCCC', Enabled: true,  Sport: 'Tennis',     Country: 'United Kingdom' },
			{ Id: 12, Client: 'Client 3', Code: 'BBBBB', Enabled: true,  Sport: 'Running',    Country: 'United Kingdom' },
			{ Id: 13, Client: 'Client 3', Code: 'FFFFF', Enabled: false, Sport: 'Basketball', Country: 'Russia'         },
			{ Id: 14, Client: 'Client 3', Code: 'DDDDD', Enabled: false, Sport: 'Tennis',     Country: 'Germany'        },
			{ Id: 15, Client: 'Client 3', Code: 'AAAAA', Enabled: false, Sport: 'Basketball', Country: 'Japan'          }
      	];

        $scope.filteredDataSource = $scope.dataSource;
      	
      	
      });
