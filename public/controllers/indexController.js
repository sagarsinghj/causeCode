var scotchTodo = angular.module('storeFinder', []);

function mainController($scope, $http) {
	$scope.formData = {};

	$scope.saveStore = function() {
		$http.post('/api/saveStores', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.stores = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.getStore = function() { console.log("calling")
		$http.get('/api/getStores')
			.success(function(data) {
				$scope.stores = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
}
