app.service('numberDataService', function (){

	var url = document.location.host.indexOf('localhost') === 0 ?
		"http://localhost/webapiServer/api/Number/" :
		"http://sorteiaai.com.br/api/Number/";

	
	function getAll(){		
	}

	function insert(){
		$.post(url, {
			alias: 'my-teste',
			data: '{result:[1,2,3], auto: true}'
		}).done(function(data){
			console.log(data);
		});
	}

	return {
		get: getAll,
		insert: insert
	};
});