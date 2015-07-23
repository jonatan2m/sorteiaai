app.service('listDataService', function (){

	var url = document.location.host.indexOf('localhost') === 0 ?
		"http://localhost/webapiServer/api/List/" :
		"http://sorteiaai.com.br/api/List/";

	
	function get(id){		
		return $.get(url + id);
	}

	function insert(objSave){
		return $.post(url, objSave);
	}

	return {
		get: get,
		insert: insert
	};
});