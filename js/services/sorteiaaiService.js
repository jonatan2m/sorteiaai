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

        coreService.setup(data.instance.config.begin, data.instance.config.end);

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
            setup.last = setup.instance.config.canRepeatNumber ?
            coreService.getByIndex(index) : coreService
            .getAndRemoveByIndex(index);               

            setup.results.push(setup.last);
            setup.enableButton = true;

            var limit = setup.instance.automaticRun.automaticQuantity;
            limit--;
            s.enableButton = true;
            if(setup.instance.automaticRun.enable &&  limit > 0){
                setup.instance.automaticRun.automaticQuantity = limit;
                $timeout(function(){
                    _next();
                }, setup.instance.automaticRun.automaticInterval * 1000);

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

    $routeProvider.when("/", {        
        templateUrl: "views/index.html"
    });

    $routeProvider.when("/home", {        
        templateUrl: "views/home.html"
    });

    $routeProvider.when("/about", {        
        templateUrl: "views/about.html"
    });

    $routeProvider.when("/number", {        
        templateUrl: "views/number.html"
    });

    $routeProvider.when("/number/:id",{        
        templateUrl: "views/numberResult.html"
    });

    $routeProvider.when("/list", {        
        templateUrl: "views/list.html"
    });

    $routeProvider.when("/list/:id", {        
        templateUrl: "views/ListResult.html"
    });

$routeProvider.otherwise({ redirectTo: "/" });

});

app.controller('ListController', ['sorteiaaiService',
    'listService', 'listDataService', '$http', 'ngAuthSettings', function(service, listService, listDataService, $http, ngAuthSettings){
        var list = this;

        list.instance = undefined;

        list.config = {                    
            show : true            
        };

        list.enableButton = false;    
        list.last = '--';
        list.results = [];
        list.input = [];        
        list.fillText = '';

        list.inputValues = "";

        list.next = function (){
            service.next();
        };

        list.automaticQuantityValidator = function () {
            return listService.convertInputTextToArray(list.inputValues).length || 1;
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
            list.instance.winners = JSON.stringify(list.results);
            list.instance.attendees = JSON.stringify(list.input);
            
            listDataService.insert(list.instance).then(function(id){                
                document.location = document.location.href + '/' + id;
            });
        };

        $http.get(ngAuthSettings.apiServiceBaseUri+"api/List/Metadata").then(function(a) {
            list.instance = a.data;
        });
    }]);

app.controller('NumberController', ['sorteiaaiService',
    'numberDataService', '$http', 'ngAuthSettings' , function(service, numberDataService, $http, ngAuthSettings){
        var number = this;

        number.instance = undefined;
        
        number.config = {            
            show : true            
        };    

        number.enableButton = false;    
        number.last = '--';
        number.results = [];        

        number.next = function () {     
            service.next();     
        };

        number.start = function () {
            number.config.show = false;
            service.number(number);
        };

        number.save = function () {          

            number.instance.result = JSON.stringify(number.results);

            numberDataService.insert(number.instance)
            .then(function(id){                
                document.location = document.location.href + '/' + id.data;
            });
        };

        $http.get(ngAuthSettings.apiServiceBaseUri+"api/Number/Metadata").then(function(a) {
            number.instance = a.data;            
        });
    }]);

app.controller('IndexController', ['$http', 'loginService', 'ngAuthSettings', '$location', function($http, loginService, ngAuthSettings, $location){
    var index = this;

    index.connect = function (provider){
        loginService.authentication(provider);
    };

    $http.get(ngAuthSettings.apiServiceBaseUri+"api/Account/UserInfo")
    .then(function(a)
    {     
        $location.path('home');
    });

}]);

app.controller('HomeController', ['$http', 'loginService', 'ngAuthSettings', '$location', function($http, loginService, ngAuthSettings, $location){
    var home = this;

    $http.get(ngAuthSettings.apiServiceBaseUri+"api/Account/UserInfo");    

    home.connect = function (provider){
        loginService.authentication(provider);
    };

   
}]);