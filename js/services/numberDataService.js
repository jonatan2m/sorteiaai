app.service('numberDataService', function (){

	var url = document.location.host.indexOf('localhost') === 0 ?
		"http://localhost/webapiServer/api/Number/" :
		"http://sorteiaai.com.br/api/Number/";

	
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