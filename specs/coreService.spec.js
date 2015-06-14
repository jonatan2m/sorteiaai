describe('Core Service ', function() {
	
	var service;

	beforeEach(module('sorteiaai'));

	beforeEach(inject(function(coreService){			
		service = coreService;
	}));

	it("should be different and apply shuffle", function() {
		var input = [1,2,3,4,5,6,7,8,9];
		expect([1,2,3,4,5,6,7,8,9]).not.toBe(service.shuffle(input));		
	});

	it("should return the same array when exists only item", function() {
		var input = [4];
		expect([4]).not.toBe(service.shuffle(input));		
	});

});