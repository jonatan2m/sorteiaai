describe('Utils Service', function() {
	
	var list, core;

	beforeEach(module('sorteiaai'));

	beforeEach(inject(function(listService, coreService){			
		utils = listService;
		core = coreService;
	}));

	it("should setup with list of string.", function() {

		var inputText = " A\nB\nC ";
		core.setup(utils.convertInputTextToArray(inputText));
		expect(3).toBe(core.getLength());
	});

	it("should discard empty items on list of string.", function() {

		var inputText = " A\n \nB\nC ";
		core.setup(utils.convertInputTextToArray(inputText));
		expect(3).toBe(core.getLength());
	});
});