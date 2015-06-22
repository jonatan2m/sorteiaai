var app = angular.module('sorteiaai', ['ngRoute']);

app.service('coreService', function (){

    var core = {};
    
    var nums = [],
    total = 0;   


    function swap(arr, i, j) {
        if(i !== j){
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    core.setup = function (begin, end){
        for(var i = begin; i <= end; i++){
            nums.push(i);
        }
        total = nums.length;
    };

    core.reset = function (){
        nums = [];
        total = 0;
    };

    core.shuffle = function() {
        var N = nums.length;
        if(N === 1) return nums;

        for (var i = 0; i < N; i++) {
            var r = core.random(i + 1);
            swap(nums, i, r);
        }
        return nums;
    };    

    core.random = function(min, max) {
        if(max)
            return Math.floor(Math.random() * (max - min) + min);
        else
            return Math.floor(Math.random() * min);        
    };

    core.getRandomInList = function (min, max){
        return nums[core.random(min, max)];                      
    };

    core.getList = function (){
        return nums;
    };

    core.getByIndex = function (index){
        return nums[index];
    };

    core.getAndRemoveByIndex = function (index){
        return nums.splice(index, 1).pop();
    };

    core.getLength = function (){
        return nums.length;       
    };

    return core;
});


app.service('sorteiaaiService', function(coreService, $timeout, $q) {
    var s = {};    
    
    s.remove = false;    
    s.speed = 1;

    var setup;

    var _reset = function () {
        _config = undefined;            
        s.speed = 1;            
        coreService.reset();                                
    };

    var _setup = function (data) {

        data.enableButton = !data.enableButton;

        coreService.setup(data.config.begin, data.config.end);

        data.config.show = false;

        setup = data;
    };

    var _next = function () {
        setup.enableButton = false;         
        s.speed = 1;        
        var index;
        var min;
        var max =  coreService.getLength();
        if(max !== 1){
            min = 1;
            coreService.shuffle();
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
                setup.last = coreService.getRandomInList(min, max);
                search(min, max);
            },  incrementSpeed());
        }else{
            var index = coreService.random(min, max);       
            setup.last = setup.config.repeat ?
coreService.getByIndex(index) : coreService.getAndRemoveByIndex(index);               

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
}]);

app.controller('HomeController', ['$http', function($http){
    var home = this;

}]);

app.controller('ListController', function() {
    this.review = {};

    this.addReview = function(product) {
        product.reviews.push(this.review);

        this.review = {};
    };
});