describe('Core Service', function() {
	
	var service;

	beforeEach(module('sorteiaai'));

	beforeEach(inject(function(coreService){			
		service = coreService;
	}));

	it("should define setup", function() {
		var begin = 1, end = 5;
		service.setup(begin, end);
		expect(5).toBe(service.getLength());
	});

	it("should random number", function() {
		var begin = 1, end = 50;
		var result = service.random(begin, end);
		expect(true).toBe(result <= 50);
		result = service.random(begin, end);
		expect(true).toBe(result <= 50);
		result = service.random(begin, end);
		expect(true).toBe(result <= 50);
		result = service.random(begin, end);
		expect(true).toBe(result <= 50);
		result = service.random(begin, end);
		expect(true).toBe(result <= 50);
	});

	it("should random number in list", function() {
		var begin = 1, end = 3;
		service.setup(begin, end);

		var result = service.getAndRemoveByIndex(0);
		
		expect(1).toBe(result);
		expect(2).toBe(service.getLength());
	});

	it("list should be different when apply shuffle", function() {
		var begin = 1, end = 9;
		service.setup(begin, end);
		service.shuffle();
		expect([1,2,3,4,5,6,7,8,9]).not.toBe(service.getList());		
	});

	it("should clear list when apply reset", function() {
		var begin = 1, end = 9;
		service.setup(begin, end);
		service.shuffle();
		expect(9).toBe(service.getLength());

		service.reset();
		
		expect(0).toBe(service.getLength());		
	});

	it("should define setup with array", function() {
		var begin = [1,2,3,4,5];
		
		service.setup(begin);
		expect(5).toBe(service.getLength());
	});

});