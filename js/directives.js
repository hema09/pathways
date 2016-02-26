var directives = angular.module('directives', []);

directives.directive('occupationTable', function() {
	return {
		restrict : 'E',
		scope : {
			occupations : "=",
			levels : "=",
			showOccLevel : "&",
			removeOccupation : "&",
			addOccupation : "&"
		},
		templateUrl : "js/templates/occupationTable.html",
		controller : function($scope) {

		}	
	};
});


app.directive('pathwayOccupation', function() {
	return {
		restrict : 'E',
		scope : {
			occupations : "=",
			levels : "=",
			showOccLevel : "&",
			removeOccupation : "&",
			addOccupation : "&"
		},
		templateUrl : "js/templates/pathwayOccupation.html",
		controller : function($scope) {
		}	
	}
});