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

        numberDataService.get($routeParams.id)
        .done(function (data){
            result.id = data.id;
            result.created = new Date(data.created);
            result.alias = data.alias;
            var raffleData = JSON.parse(data.data);

            result.config = raffleData.config;
            for (var i = 0; raffleData.result.length > i; i++) {
                result.numbers.push(raffleData.result[i]);
            }            
            $scope.$apply();
        });
    }]);