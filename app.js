(function() {
	var app = angular.module('sorteiaai', ['ngRoute']);
	app.service('sorteiaaiService', function () {
		
		var s = {};

		
		s.nums = [];		
		s.remove = false;
		s.total = 0;
		s.speed = 1;
		

		var _config;

		function shuffle(arr) {
			var N = arr.length;
			if(N === 1) return;

			for (var i = 0; i < N; i++) {
				var r = random(i + 1);
				swap(arr, i, r);
			};
		}

		function swap(arr, i, j) {
			if(i !== j){
				var temp = arr[i];
				arr[i] = arr[j];
				arr[j] = temp;
			}
		}

		function random(min, max) {
			if(max)
				return Math.floor(Math.random() * (max - min) + min);
			else
				return randomUnic(min);			
		}

		function randomUnic(unit) {

			return Math.floor(Math.random() * unit);
		}

		var _reset = function () {
			_config = undefined;			
			s.speed = 1;									
			s.nums = [];
			s.total = 0;
		};

		var _setup = function (config) {

			config.enableButton = !config.enableButton;

			for(var i = config.begin; i <= config.end; i++){
				s.nums.push(i);
			}
			s.total = s.nums.length;
			config.show = false;

			_config = config;
		};

		var _next = function (config) {			
			config.enableButton = false;
			_config = config;
			s.speed = 1;		
			var index;
			var min;
			var max = s.nums.length;
			if(max !== 1){
				min = 1;
				shuffle(s.nums);
			}else
			var min = 0;
			search(min, max);
		};

		function incrementSpeed() {
			s.ticks -= s.speed;
			s.speed += 2;
			return s.speed;
		}

		function search(min, max){
			if(s.speed <= 100){
				setTimeout(function (){
					_config.last = s.nums[random(min, max)];				
					search(min, max);
				},  incrementSpeed());
			}else{
				var index = random(min, max);		
				_config.last = _config.repeat ? s.nums[index] : s.nums.splice(index, 1).pop();
				_config.results.push(_config.last);

				var limit = _config.autoLimit;
				limit--;
				s.enableButton = true;
				if(_config.auto &&  limit > 0){
					_config.autoLimit = limit;
					setTimeout(function(){
						_next();
					}, _config.ticksPerSecond * 1000);

				}
			}

		}

		return {
			setup: _setup,
			reset: _reset,
			next: _next
		}
	});

app.config(function ($routeProvider) {

	$routeProvider.when("/home", {
		controller: "HomeController",
		templateUrl: "views/home.html"
	});

	$routeProvider.when("/number", {
		controller: "NumberController",
		templateUrl: "views/number.html"
	});

	$routeProvider.otherwise({ redirectTo: "/home" });

});

app.controller('NumberController', ['sorteiaaiService', function(service){
	var number = this;

	number.begin = 1;
	number.end = 10;
	number.repeat = false;
	number.show = true;
	number.auto = false;
	number.autoLimit = 2;
	number.enableButton = false;
	number.ticksPerSecond = 1;
	number.last = '--';
	number.results = [];

	number.next = function () {
		number.last = 2222;
		service.next(number);		
	}

	number.start = function () {
		number.show = false;
		service.setup(number);
	}

	/*$http.get('/store-products.json')
	.success(function(data){
		store.products = data;
	});*/

}]);

app.controller('HomeController', ['$http', function($http){
	var home = this;

}]);

	/*app.controller('NumberController', ['$scope','$http', function($scope, $http){
		var numbers = this;

		$http.get('/store-products.json')
		.success(function(data){
			store.products = data;
		});
}]);*/

app.controller('ListController', function() {
	this.review = {};

	this.addReview = function(product) {
		product.reviews.push(this.review);

		this.review = {};
	};
});
}());