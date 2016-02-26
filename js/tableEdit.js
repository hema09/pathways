var app = angular.module("tableEditor", ['ui.bootstrap', 'xeditable', 'directives', 'services']);

app.constants('AUTH_EVENTS', {
	loginSuccess: 'auth-login-success',
	loginFailed: 'auth-login-failed',
	logoutSuccess: 'auth-logout-success',
	sessionTimeout: 'auth-session-timeout',
	notAuthenticated: 'auth-not-authenticated',
	notAuthorized: 'auth-not-authorized'
});

app.run(function(editableOptions){
	editableOptions.theme = "bs3";
});

app.controller('tableCtrl',function($scope, $filter, $modal, levelService, ladderService) {
	$scope.ladder = ladderService.getLadder();
	
	$scope.updateLadder = function(data) {
		console.log('title update to  : ' + data);
		$scope.ladder = ladderService.updateLadder(data);
	};
	
	$scope.pathModal = function(path) {
		var modalInstance = $modal.open({
			templateUrl : 'js/templates/pathModal.html',
			controller : function($scope, $modalInstance, path) {
				var clone = {};
				angular.copy(path, clone);
				$scope.path = clone;
				$scope.occupations = path.occupations ? path.occupations : [];
				$scope.levels = levelService.getLevels();
				console.log("occupations" + $scope.occupations.length + ", levels=" + $scope.levels.length);
				$scope.updatePathway = function(data) {
					$scope.path = {title : data};
					clone = $scope.path;
					console.log('path title: ' + $scope.path.title + ", clone title = " + clone.title);
				};
				$scope.ok = function () {
					clone.occupations = $scope.occupations;
					angular.extend(path, clone);
				    $modalInstance.close();
				};

			  $scope.cancel = function () {
			    $modalInstance.dismiss('cancel');
			  };

			  $scope.showLevel = function(occupation) {
					var selected = [];
					if(occupation.level) {
						selected = $filter('filter')($scope.levels, {value: occupation.level});
					}
					return selected.length ? selected[0].text : 'Not Set';
				};

				$scope.saveOccupation = function(data, oid) {
					console.log("save occupation called");
					angular.extend(data, {id: oid});
				};

				$scope.addOccupation = function() {
					console.log("add occupation called of controller");
					$scope.occupations.push({name: "", level : null, oid : $scope.occupations.length + 1});
				};

				$scope.removeOccupation = function(index) {
					$scope.occupations.splice(index, 1);
				};
			},
			size : 'lg',
			resolve : {
				path : function() {
					return path;
				}
			}
		});
	};
});

app.controller('LoginController', function($scope, $rootScope, AUTH_EVENTS, AuthService) {
	$scope.credentials = {
		username : "",
		password : ""
	};
	$scope.login = function(credentials) {
		AuthService.login(credentials).then(function(user) {
			$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
			$scope.setCurrentUser = user;
		}, function() {
			$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
		});
	};
});















