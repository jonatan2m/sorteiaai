app.controller('NumberResultController', ['$routeParams',
    'numberDataService', '$scope', 
    function($routeParams, numberDataService, $scope){
        var result = this;

        result.url = document.location.href;
        result.id = 0;
        result.created = '';
        result.alias = '';
        result.config = {};
        result.numbers = [];
        result.configInfo = "";

        numberDataService.get($routeParams.id)
        .done(function (data){
            result.id = data.id;
            
            result.created = data.created;
            result.alias = data.alias;
            var raffleData = JSON.parse(data.data);

            result.config = raffleData.config;

            result.configInfo = "De {begin} até {end},  {{repeat}} repetição.";

            for (var key in result.config){
                result.configInfo = result.configInfo.replace("{" + key + "}",
                    result.config[key]);
            }

            result.configInfo = result.configInfo.replace("{" + 
            result.config.repeat + "}",
                    result.config.repeat? "com" : "sem");


            
            for (var i = 0; raffleData.result.length > i; i++) {
                result.numbers.push(raffleData.result[i]);
            }            
            $scope.$apply();
        });
    }]);