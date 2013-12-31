'use strict';

var grunt = require('grunt');
var slick = require('slick');


describe('slick', function () {

  function replacer(k, v) {
    if (typeof v === 'function') {
      v = v.toString();
    }
    return v;
  }

  beforeEach(function(){
    this.addMatchers({
      toDeepEqual: function(expected){
        var one = JSON.stringify(this.actual, replacer).replace(/(\\t|\\n)/g,''),
          two = JSON.stringify(expected, replacer).replace(/(\\t|\\n)/g,'');

        return one === two;
      }
    });
  });

  it('should have parse method', function () {
    expect(slick.parse).toBeDefined();
    expect(typeof slick.parse).toEqual('function');
  });

  describe('slick selector object', function() {

    var actual = require('./fixtures/slick.js').selectors.map(slick.parse);
    grunt.file.write('specs/tmp/slick.js', JSON.stringify(actual, null, '  '));
    grunt.log.writeln(JSON.stringify(actual, null, '  '));
    var expected = require('./expected/slick.js').slickSelectorObjects;

    it('should have the same format', function() {
      expect(actual).toDeepEqual(expected);
    });
  });


});