app.service('listDataService', ['$http', function ($http){

	var url = document.location.host.indexOf('localhost') === 0 ?
		"http://localhost/sorteiaaiapi/api/List/" :
		"http://sorteiaai.com.br/api/List/";

	
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