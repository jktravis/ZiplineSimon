var chai = require('chai'),
  assert = chai.assert,
  Simon = require('../static/js/simon.js').simon;

describe('Simon', function () {

  it('should have a pattern property', function () {
    assert.isTrue(Simon.hasOwnProperty('pattern'), 'Has pattern property.');
    assert.isArray(Simon.pattern, "Pattern is an array.");
  });

  describe('getNextInPattern', function () {
    it('should return an integer between 0 and 3', function () {
      var next;
      for (var i = 0; i < 100; i++) {
        next = Simon.getNextInPattern();
        assert(next >= 0 && next < 4);
      }
    });
  });

  describe('printPattern', function () {
    it('should return the pattern', function () {
      for (var i = 0; i < 20; i++) {
        Simon.pattern.push(Simon.getNextInPattern());
      }
      assert.isAtLeast(Simon.pattern.length, 20, 'At least 20 entries.');
      Simon.printPattern();
    });
  });

  describe('compareSelection', function () {
    Simon.pattern.push(0);
    Simon.pattern.push(1);
    Simon.pattern.push(2);
    Simon.pattern.push(3);

    it('should return true when the selection is the same.', function () {
      assert(Simon.compareSelection(0, 0) === true);
      assert(Simon.compareSelection(1, 1) === true);
      assert(Simon.compareSelection(3, 3) === true);
    });

    it('should return false when the selection is not the same.', function () {
      assert(Simon.compareSelection(2, 3) === false);
    });
  })
});