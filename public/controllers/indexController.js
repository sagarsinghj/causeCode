

angular.module('storeFinder', []).controller("mainController",  function($scope, $http) {
	$scope.formData = {};

	$http.get('/api/getStores')
		.success(function(data) {
			$scope.stores = data;
		})
		.error(function(data) {
		console.log('Error: ' + data);
	});

	$scope.saveStore = function() {
		$http.post('/api/saveStores', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.stores = data;
			})
			.error(function(data) {
				$scope.stores = data;
			});
	};

	$scope.deleteStore = function(storeId) {
	$http.delete('/api/deleteStore/' + storeId)
		.success(function(data) {
			$scope.stores = data;
		})
		.error(function(data) {
			$scope.stores = data;
		});
	};

	$scope.editStore = function(store) {
		$scope.formData.storeName = store.storeName;
		$scope.formData.lat = store.position[0];
		$scope.formData.lon = store.position[1];
		$scope.formData.id = store._id;
	};

	$scope.updateStore = function() {
	$http.put('/api/updateStore/' + $scope.formData.id, $scope.formData)
		.success(function(data) {
			$scope.formData = {};
			$scope.stores = data;
		})
		.error(function(data) {
			$scope.stores = data;
		});
	};

	$scope.findStores = function() {
	$http.post('/api/findStore', $scope.fdata)
		.success(function(data) {
			$scope.fdata = {};
			$scope.sdata = data.stores;
			$scope.zipcodeCity = data.zipcodeCity;
			$scope.zipcodeState = data.zipcodeState;
			$scope.zipcode = data.zipcode;
			$scope.distance = data.distance;
		})
		.error(function(data) {
			$scope.sdata = data;
		});
	};
})