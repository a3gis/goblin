var assert = require('assert')

var Goblin = require('./../src/goblin')

var goblin = new Goblin()

goblin.source('bool', {
	iterate: function (f) {
		f(true)
		f(false)
	}
})

var test = function (code, result) {
	assert.equal(goblin.evaluate(code), result)
}

describe('Basics', function () {
	it('boolean literals should return their value', function () {
	   test('true', true)
	   test('false', false)
	})	   

	it('boolean values should be equal to themselves', function () {
		test('true == true', true)
		test('false == false', true)
		test('true == false', false)
		test('false == true', false)
	})

	it('negation should inverse a boolean value', function () {
		test('not true', false)
		test('not false', true)
		test('not not true', true)
	})

	it('conjunctions should behave as expected', function () {
		test('true and true', true)
		test('true and false', false)
		test('false and true', false)
		test('false and false', false)
	})

	it('disjunctions should behave as expected', function () {
		test('true or true', true)
		test('true or false', true)
		test('false or true', true)
		test('false or false', false)
	})

	it('conjunctions should be distributive', function () {
		test('forall A, B, C. A and (B or C) == A and B or A and C', true)
		test('forall A, B, C. A or (B and C) == (A or B) and (A or C)', true)
	})

	it('disjunctions should be distributive', function () {
		test('forall A, B, C. A or (B and C) == (A or B) and (A or C)', true)
	})

	it('identities should hold', function () {
		test('forall x. x or x == x', true)
		test('forall x. x and x == x', true)
	})

	it('redundance law should hold', function () {
		test('forall A, B. A or A and B == A', true)
		test('forall A, B. A and (A or B) == A', true)
	})

	it('De Morgan\'s laws should hold', function () {
		test('forall a, b. not (a and b) == not a or not b', true)
		test('forall a, b. not (a or b) == not a and not b', true)
	})

	it('tautologies should always be true', function () {
		test('forall x. x or not x', true)
	})

	it('inconsistencies should always be false', function () {
		test('forall x. x and not x', false)
	})
})
