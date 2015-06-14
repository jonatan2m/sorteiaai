var app = angular.module('sorteiaai', ['ngRoute']);

app.service('coreService', function (){

    var core = {};   

    function swap(arr, i, j) {
        if(i !== j){
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    core.shuffle = function(arr) {
        var N = arr.length;
        if(N === 1) return arr;

        for (var i = 0; i < N; i++) {
            var r = core.random(i + 1);
            swap(arr, i, r);
        }
        return arr;
    };

    function randomUnic(unit) {
        return Math.floor(Math.random() * unit);
    }

    core.random = function(min, max) {
        if(max)
            return Math.floor(Math.random() * (max - min) + min);
        else
            return randomUnic(min);         
    };

    return core;
});


app.service('sorteiaaiService', function(coreService, $timeout, $q) {
    var s = {};    
    s.nums = [];        
    s.remove = false;
    s.total = 0;
    s.speed = 1;

    var setup;

    var _reset = function () {
        _config = undefined;            
        s.speed = 1;                                    
        s.nums = [];
        s.total = 0;
    };

    var _setup = function (data) {

        data.enableButton = !data.enableButton;

        for(var i = data.config.begin; i <= data.config.end; i++){
            s.nums.push(i);
        }
        s.total = s.nums.length;
        data.config.show = false;

        setup = data;
    };

    var _next = function () {
        setup.enableButton = false;         
        s.speed = 1;        
        var index;
        var min;
        var max = s.nums.length;
        if(max !== 1){
            min = 1;
            coreService.shuffle(s.nums);
        }else
        min = 0;
        search(min, max);
    };

    function incrementSpeed() {
        s.ticks -= s.speed;
        s.speed += 2;
        return s.speed;
    }

    function search(min, max){
        if(s.speed <= 100){
            $timeout(function (){
                setup.last = s.nums[coreService.random(min, max)];                      
                search(min, max);
            },  incrementSpeed());
        }else{
            var index = coreService.random(min, max);       
            setup.last = setup.config.repeat ? s.nums[index] : s.nums.splice(index, 1).pop();               
            setup.results.push(setup.last);
            setup.enableButton = true;

            var limit = setup.config.autoLimit;
            limit--;
            s.enableButton = true;
            if(setup.config.auto &&  limit > 0){
                setup.config.autoLimit = limit;
                $timeout(function(){
                    _next();
                }, setup.config.ticksPerSecond * 1000);

            }
        }
    }

    return {
        setup: _setup,
        reset: _reset,
        next: _next
    };
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

    number.config = {
        begin : 1,
        end : 10,
        repeat : false,
        show : true,
        auto : false,
        autoLimit : 2,
        ticksPerSecond : 1
    };

    number.enableButton = false;    
    number.last = '--';
    number.results = [];

    number.next = function () {     
        service.next();     
    };

    number.start = function () {
        number.config.show = false;
        service.setup(number);
    };

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