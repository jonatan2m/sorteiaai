app.service('loginService', ['$http', '$location', 'ngAuthSettings', 'authService', function ($http, $location, ngAuthSettings, authService){

	function authentication (provider){

        var redirectUri = document.location.host.indexOf('localhost') === 0 ?
        "http://localhost/sorteiaai/authcomplete.html" :
        "http://sorteiaai.com.br/authcomplete.html";

        var externalProviderUrl = ngAuthSettings.apiServiceBaseUri + "api/Account/ExternalLoginRegister?provider=" + provider + "&response_type=token&client_id=self" + "&redirect_uri=" + redirectUri;
        window.Callback = callback;
        window.ForceRefresh = forceRefresh;
        var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
	}

	function callback(fragment) {		
		
   		ngAuthSettings.clientId = fragment.client_id;

   		if (fragment.haslocalaccount == 'False') {
            authService.logOut();

            authService.externalAuthData = {
                provider: fragment.provider,
                name: fragment.external_user_name,
                userName: '',
                externalAccessToken: fragment.external_access_token,
                client_id: fragment.client_id
            };
            //Ao terminar a autenticação, redirecionamento para colher dados adicionais.
            //$location.path('/associate');
            $location.path('home');
        }
        else {
            //Obtain access token and redirect to orders
            var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
            authService.obtainAccessToken(externalData)
            	.then(function (response) {
            		$location.path('home');
            		/*
            		$http.get(ngAuthSettings.apiServiceBaseUri+"api/Account/UserInfo")
						.then(function(a) {
			 				console.log(a);
					});
					*/
            	},
            	function (err) {
            		//$scope.message = err.error_description;
            	});
        }
	}

    function forceRefresh(fragment) {
        callback(fragment);
        //$location.path('home');
    }

	return {
		authentication: authentication,
		callback: callback,
        forceRefresh: forceRefresh
	};
}]);