app.service('numberDataService', function (){
var client = new WindowsAzure
	.MobileServiceClient('https://sorteiaai.azure-mobile.net/',
		'MnYlGvSJdtEuWfqOgPTgbgLeQVizvc73');

	function getAll(){
		var table = client.getTable('number');

		table.read().then(function(data){
			console.log(data);
		});
	}

	function insert(){
		var table = client.getTable('number');

		table.insert({
			alias: 'my-teste',
			data: '{result:[1,2,3], auto: true}'
		});
	}

	return {
		get: getAll,
		insert: insert
	};
});