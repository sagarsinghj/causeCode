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

	$scope.getStore = function() {
		$http.get('/api/getStores')
			.success(function(data) {
				$scope.stores = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.deleteStore = function(storeId) {
	$http.delete('/api/deleteStore/' + storeId)
		.success(function(data) {
			$scope.stores = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	$scope.editStore = function(store) {
		$scope.formData.storeName = store.storeName;
		$scope.formData.lat = store.position[0];
		$scope.formData.lon = store.position[1];
	};

	$scope.updateStore = function(storeId) {
	$http.put('/api/deleteStore/' + storeId, $scope.formData)
		.success(function(data) {
			$scope.formData = {};
			$scope.stores = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};
}
