var ctrl, ctrlScope, injector, horizonMock;
 
module("angular membership", {
    setup: function () {
        var appModule = angular.module('sorteiaai');
        injector = angular.injector(['ng', 'sorteiaaiService']);
 
        ctrlScope = injector.get('$rootScope').$new();
        ctrl = injector.get('$controller')('NumberController', { $scope: ctrlScope, horizon: horizon });
    },
    teardown: function () {
 
    }
});

test("Ingroup is in group", function() {
    var membership, group;
    membership = { role_1: ['1','2'] };
    group = { id: '1', name: 'group', roles: [] };
    ok(ctrlScope.inGroup(group, membership), "Group is in Membership");
    ok(group.roles.length === 1, 'Group roles OK');
});

/*
injector = angular.injector(['ng', 'sorteiaaiService'])

QUnit.test( "Remove elements on Array", function( assert ) {

	var arr = [1, 2, 3, 4];
	var sorteiaai = new SorteiaAI(arr);
	sorteiaai.remove = true;

	sorteiaai.next();
	assert.ok( arr.length === 3, "Passed!" );
	sorteiaai.next();
	assert.ok( arr.length === 2, "Passed!" );
	sorteiaai.next();
	assert.ok( arr.length === 1, "Passed!" );
	sorteiaai.next();
	assert.ok( arr.length === 0, "Passed!" );
});

QUnit.test( "Get last result", function( assert ) {

	var arr = [1, 1, 1];
	var sorteiaai = new SorteiaAI(arr);
	sorteiaai.remove = true;

	sorteiaai.next();
	assert.ok( sorteiaai.last === 1, "Passed!" );
});

QUnit.test( "Get last result array", function( assert ) {

	var arr = [1, 2, 3];
	var sorteiaai = new SorteiaAI(arr);
	sorteiaai.remove = true;

	sorteiaai.next();
	sorteiaai.next();
	sorteiaai.next();
	assert.ok( sorteiaai.results.length === 3, "Passed!" );
	assert.ok( arr.length === 0, "Passed!" );
});

QUnit.test( "Dont remove elements on Array", function( assert ) {

	var arr = [1, 2, 3];
	var sorteiaai = new SorteiaAI(arr);

	sorteiaai.next();
	sorteiaai.next();
	sorteiaai.next();
	assert.ok( sorteiaai.results.length === 3, "Passed!" );
	assert.ok( arr.length === 3, "Passed!" );
});

QUnit.test( "Passing range", function( assert ) {

	var obj = { min: 1, max: 5 };
	var sorteiaai = new SorteiaAI(obj);

	sorteiaai.next();
	sorteiaai.next();
	sorteiaai.next();
	assert.ok( sorteiaai.results.length === 3, "Passed!" );
});

QUnit.test( "Remove N + 1 elements on Array", function( assert ) {

	var arr = [1, 2, 3, 4];
	var sorteiaai = new SorteiaAI(arr);
	sorteiaai.remove = true;

	sorteiaai.next();
	assert.ok( arr.length === 3, "Passed!" );
	sorteiaai.next();
	assert.ok( arr.length === 2, "Passed!" );
	sorteiaai.next();
	assert.ok( arr.length === 1, "Passed!" );
	var p = sorteiaai.next();
	assert.ok( arr.length === 0, "Passed!" );
});*/