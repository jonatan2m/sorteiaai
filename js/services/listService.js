app.service('listService', function (){
	var utils = {};

	utils.convertInputTextToArray = function(input){

		if(input === undefined)
			throw Error('input is undefined');

		return input
			.trim()
			.split('\n')
			.filter(function(value){
				value = value.trim();
				return value.length > 0 &&
						value !== "";
			});
	};

	return utils;
});