var scotchTodo = angular.module('storeFinder', []);

function mainController($scope, $http) {
	$scope.formData = {};

	$scope.saveStore = function() {
		$http.post('/api/saveStores', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
}
