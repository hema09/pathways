var app = angular.module("pathways", ["xeditable"]);

app.run(function(editableOptions) {
		editableOptions.theme = 'bs3';
	});

app.controller("mainCtrl", function($scope) {
		$scope.ladderName = "";
		$scope.startOccupation = "";
		$scope.pathways = [];

		$scope.addPathway = function(name) {
			$scope.pathways.push(name);
		};

		$scope.updateTitle = function(title) {
			$scope.ladderName = title;
			console.log("Title changed to : " + $scope.ladderName);
		};

		$scope.updateStartOccupation = function(occ) {
			$scope.startOccupation = occ;
			console.log("StartOccupation changed to : " + $scope.startOccupation);
		};
	});
	