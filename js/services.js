var app = angular.module('services',[]);
app.factory('occupationService', function($http) {
	var service = {};
	var occupations = [
		{id : 1, name : "Software engineer"},
		{id : 2, name : "Software engineer II"},
		{id : 3, name : "Sr. Software engineer"},
		{id : 4, name : "Network engineer"},
		{id : 5, name : "Sr. Network engineer"},
		{id : 6, name : "Database engineer"},
		{id : 7, name : "Sr. Database engineer"}
	];

	service.getOccupations = function() {
		return _occupations;
	}

	service.addOccupation = function(occupation) {
		_occupations.push({id : _occupations.length + 1, name : occupation.name});
	}

	return service;
});

app.factory('ladderService', function($http) {
	var service = {};

	var _ladder = {id : 1, title : "", pathways : [{},{},{}]};

	service.getLadder = function() {
		return _ladder;
	}
	service.updateLadder = function(data) {
		_ladder.title = data;
		console.log('title updated to  : ' + _ladder.title);
		return _ladder;
	}
	return service;
});

app.factory('levelService', function($http) {
	var service = {};
	
	var _levels = [
		{value : 1, text: "Level 1"},
		{value : 2, text: "Level 2"},
		{value : 3, text: "Level 3"},
		{value : 4, text: "Level 4"},
		{value : 5, text: "Level 5"}
	];

	service.getLevels = function() {
		return _levels;
	}

	return service;
});

app.service('Session', function() {
	this.create = function(sessionId, userId, userRole) {
		this.id = sessionId;
		this.userId = userId;
		this.userRole = userRole;
	};
	this.destroy = function() {
		this.id = null;
		this.userId = null;
		this.userRole = null;
	};
});

app.factory('AuthService', function($http, Session) {
	var authService = {};

	authService.login = function(credentials) {
		return $http.post('/login', credentials).then(function(res) {
			Session.create({res.id, res.data.user.id, res.data.user.role});
			return res.data.user;
		});
	};

	authService.isAuthenticated = function() {
		return !!Session.userId;
	};

	authService.isAuthorized = function(authorizedRoles) {
		if(!!Angular.isArray(authorizedRoles)){
			authorizedRoles = [authorizedRoles];
		}
		return (authService.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1)
	};

	return authService;
});