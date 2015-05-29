(function (){
	var _s = {};

	_s.config = {
		begin: ko.observable(1),
		end: ko.observable(10),
		repeat: ko.observable(false),
		show: ko.observable(false),		
		auto: ko.observable(false),
		autoLimit: ko.observable(2),
		ticksPerSecond: ko.observable(1)
	};

	_s.results = ko.observableArray([]);
	_s.nums = ko.observableArray([]);
	_s.last = ko.observable('--');
	_s.remove = ko.observable(false);
	_s.total = ko.observable(0);		
	_s.speed = 1;
	_s.enableButton = ko.observable(true);

	_s.newRaffle = function () {
		_s.config.begin(1);
		_s.config.end(10);
		_s.config.repeat(false);
		_s.config.show(true);				
		_s.speed = 1;
		_s.config.auto(false);
		_s.config.autoLimit(2); 
		_s.config.ticksPerSecond(1);
		_s.enableButton(true);

		_s.results([]);
		_s.nums([]);
		_s.last('--');		
		_s.total(0);
	};

	_s.start = function (){
		for(var i = _s.config.begin(); i <= _s.config.end(); i++){
			_s.nums.push(i);
		}
		_s.total(_s.nums.length);
		_s.config.show(false);
	};


	_s.next = function next(){
		_s.enableButton(false);
		_s.speed = 1;		
		var index;
		var min;
		var max = _s.nums().length;
		if(max !== 1){
			min = 1;
			shuffle(_s.nums());
		}else
		var min = 0;

		search(min, max);
	}

	function incrementSpeed() {
		_s.ticks -= _s.speed;
		_s.speed += 2;
		return _s.speed;
	}

	function search(min, max){
		if(_s.speed <= 100){
			setTimeout(function (){
				_s.last(_s.nums()[random(min, max)]);				
				search(min, max);
			},  incrementSpeed());
		}else{
			var index = random(min, max);		
			_s.last(_s.config.repeat() ? _s.nums()[index] : _s.nums.splice(index, 1).pop());
			_s.results.push(_s.last());

			var limit = _s.config.autoLimit();
			limit--;
			_s.enableButton(true);
			if(_s.config.auto &&  limit > 0){
				_s.config.autoLimit(limit);
				setTimeout(function(){
					_s.next();
				}, _s.config.ticksPerSecond() * 1000);
				
			}
		}

	}

	function shuffle(arr){

		var N = arr.length;

		if(N === 1) return;

		for (var i = 0; i < N; i++) {
			var r = random(i + 1);
			swap(arr, i, r);
		};
	}

	function swap(arr, i, j){
		if(i !== j){
			var temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}
	}

	function random(min, max){

		if(max)
			return Math.floor(Math.random() * (max - min) + min);
		else{
			return randomUnic(min);
		}
	}

	function randomUnic(unit){

		return Math.floor(Math.random() * unit);
	}

	ko.applyBindings(_s);
	console.log('Fique a vontade! :)');
}());