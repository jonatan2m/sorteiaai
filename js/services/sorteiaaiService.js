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



    var number = function (data) {

        data.enableButton = !data.enableButton;

        coreService.setup(data.config.begin, data.config.end);

        data.config.show = false;

        setup = data;
    };

    var list = function (data) {

        data.enableButton = !data.enableButton;

        coreService.setup(data.input);

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
            coreService.getByIndex(index) : coreService
            .getAndRemoveByIndex(index);               

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
        number: number,
        list: list,
        reset: _reset,
        next: _next
    };
});

app.config(function ($routeProvider) {

    $routeProvider.when("/home", {
        controller: "HomeController",
        templateUrl: "views/home.html"
    });

    $routeProvider.when("/about", {        
        templateUrl: "views/about.html"
    });

    $routeProvider.when("/number", {
        controller: "NumberController",
        templateUrl: "views/number.html"
    });

    $routeProvider.when("/number/:id",{
        controller: "NumberResultController",
        templateUrl: "views/numberResult.html"
    });

    $routeProvider.when("/list", {
        controller: "ListController",
        templateUrl: "views/list.html"
    });

    $routeProvider.when("/list/:id", {
        controller: "ListResultController",
        templateUrl: "views/ListResult.html"
    });

$routeProvider.otherwise({ redirectTo: "/home" });

});

app.controller('ListController', ['sorteiaaiService',
    'listService', 'listDataService', function(service, listService, listDataService){
        var list = this;

        list.config = {        
            repeat : false,
            show : true,
            auto : false,
            autoLimit : 1,
            ticksPerSecond : 1
        };

        list.enableButton = false;    
        list.last = '--';
        list.results = [];
        list.input = [];
        list.alias = '-';
        list.fillText = '';

        list.inputValues = "";

        list.next = function (){
            service.next();
        };

        list.start = function (){
            if(list.inputValues === ''){
                list.fillText = 'Não encontramos itens na lista.';
                return;
            }else
                list.fillText = '';


            list.input = listService.convertInputTextToArray(list.inputValues);
            list.config.show = false;
            service.list(list);
        };

        list.save = function (){
            var data = {
                config: list.config,
                result: list.results
            };

            listDataService.insert({
                alias: list.alias,
                data: JSON.stringify(data),
                remaingValues: JSON.stringify(list.input)
            }).done(function(id){                
                document.location = document.location.href + '/' + id;
            });
        };
    }]);

app.controller('NumberController', ['sorteiaaiService',
    'numberDataService', function(service, numberDataService){
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
        number.alias = "-";

        number.next = function () {     
            service.next();     
        };

        number.start = function () {
            number.config.show = false;
            service.number(number);
        };

        number.save = function (){          
            var data = {
                config: number.config,
                result: number.results
            };

            numberDataService.insert({
                alias: number.alias,
                data: JSON.stringify(data)
            })
            .done(function(id){                
                document.location = document.location.href + '/' + id;
            });
        };
    }]);

app.controller('HomeController', ['$http', function($http){
    var home = this;

}]);