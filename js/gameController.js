(function(){
	'use strict';
	angular.module("app")
		.controller('GameController', function(appName) {
		  this.score = 100;
		  this.appName = appName;
		});

})();