app.controller('ListResultController', ['$routeParams',
    'listDataService', '$scope', 
    function($routeParams, listDataService, $scope){
        var result = this;

        result.url = document.location.href;
        result.id = 0;
        result.created = '';
        result.alias = '';
        result.config = {};
        result.values = [];
        result.configInfo = "";
        result.remaingValues = [];

        listDataService.get($routeParams.id)
        .then(function (data){
            result.id = data.id;
            
            result.created = data.created;
            result.alias = data.alias;
            var raffleData = JSON.parse(data.data);            
            //result.remaingValues = JSON.parse(data.remaingValues).join('\n');
            result.remaingValues = JSON.parse(data.remaingValues).sort();
            result.config = raffleData.config;

            result.configInfo = "{{repeat}} repetição.";

            for (var key in result.config){
                result.configInfo = result.configInfo.replace("{" + key + "}",
                    result.config[key]);
            }

            result.configInfo = result.configInfo.replace("{" + 
                result.config.repeat + "}",
                result.config.repeat? "Com" : "Sem");
            
            for (var i = 0; raffleData.result.length > i; i++) {
                result.values.push(raffleData.result[i]);
            }            

            $scope.$apply();
        });
}]);