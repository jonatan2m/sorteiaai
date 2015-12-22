app.service('numberDataService',['$http', function ($http){

	var url = document.location.host.indexOf('localhost') === 0 ?
		"http://localhost/sorteiaaiapi/api/Number/" :
		"http://sorteiaai.com.br/api/Number/";

	
	function get(id){		
		return $http.get(url + id);
	}

	function insert(objSave){
		return $http.post(url, objSave);
	}

	return {
		get: get,
		insert: insert
	};
}]);