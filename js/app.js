var app = angular.module('sorteiaai', ['ngRoute', 'LocalStorageModule']);

var local = /localhost/;
var serviceBase;

if (local.test(window.location.hostname))
    serviceBase = 'http://localhost/sorteiaaiapi/';
else
    serviceBase = 'http://sorteiaai.com.br/';


app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'self'
});

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);
