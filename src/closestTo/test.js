// @flow
/* eslint-env mocha */

import assert from 'power-assert'
import closestTo from '.'

describe('closestTo', function() {
  it('returns the date from the given array closest to the given date', function() {
    var date = /* 1393/4/11 */ new Date(2014, 6 /* Jul */, 2)
    var result = closestTo(date, [
      /* 1394/6/9 */ new Date(2015, 7 /* Aug */, 31),
      /* 1391/4/12 */ new Date(2012, 6 /* Jul */, 2)
    ])
    assert.deepEqual(result, /* 1394/6/9 */ new Date(2015, 7 /* Aug */, 31))
  })

  it('works if the closest date from the given array is before the given date', function() {
    var date = /* 1393/4/11 */ new Date(2014, 6 /* Jul */, 2, 6, 30, 4, 500)
    var result = closestTo(date, [
      /* 1393/4/11 */ new Date(2014, 6 /* Jul */, 2, 6, 30, 5, 900),
      /* 1393/4/11 */ new Date(2014, 6 /* Jul */, 2, 6, 30, 3, 900),
      /* 1393/4/11 */ new Date(2014, 6 /* Jul */, 2, 6, 30, 10)
    ])
    assert.deepEqual(
      result,
      /* 1393/4/11 */ new Date(2014, 6 /* Jul */, 2, 6, 30, 3, 900)
    )
  })

  it('accepts timestamps', function() {
    var date = /* 1393/4/11 */ new Date(2014, 6 /* Jul */, 2).getTime()
    var result = closestTo(date, [
      /* 1394/6/9 */ new Date(2015, 7 /* Aug */, 31).getTime(),
      /* 1391/4/12 */ new Date(2012, 6 /* Jul */, 2).getTime()
    ])
    assert.deepEqual(result, /* 1394/6/9 */ new Date(2015, 7 /* Aug */, 31))
  })

  it('returns undefined if the given array is empty', function() {
    var date = /* 1393/4/11 */ new Date(2014, 6 /* Jul */, 2).getTime()
    var result = closestTo(date, [])
    assert(result == null)
  })

  it('returns `Invalid Date` if the given date is `Invalid Date`', function() {
    var date = new Date(NaN)
    var result = closestTo(date, [
      /* 1394/6/9 */ new Date(2015, 7 /* Aug */, 31),
      /* 1391/4/12 */ new Date(2012, 6 /* Jul */, 2)
    ])
    assert(result instanceof Date && isNaN(result))
  })

  it('returns `Invalid Date` if any date in the given array is `Invalid Date`', function() {
    var date = /* 1393/4/11 */ new Date(2014, 6 /* Jul */, 2)
    var result = closestTo(date, [
      /* 1394/6/9 */ new Date(2015, 7 /* Aug */, 31),
      new Date(NaN),
      /* 1391/4/12 */ new Date(2012, 6 /* Jul */, 2)
    ])
    assert(result instanceof Date && isNaN(result))
  })

  it('returns `Invalid Date` if any date in the given array is `Invalid Date`', function() {
    var date = /* 1393/4/11 */ new Date(2014, 6 /* Jul */, 2)
    var result = closestTo(date, [
      /* 1394/6/9 */ new Date(2015, 7 /* Aug */, 31),
      new Date(NaN),
      /* 1391/4/12 */ new Date(2012, 6 /* Jul */, 2)
    ])
    assert(result instanceof Date && isNaN(result))
  })

  it('returns `Invalid Date` if any value in the given array is undefined', function() {
    var date = /* 1393/4/11 */ new Date(2014, 6 /* Jul */, 2)
    var result = closestTo(date, [
      /* 1394/6/9 */ new Date(2015, 7 /* Aug */, 31),
      // $ExpectedMistake
      undefined,
      /* 1391/4/12 */ new Date(2012, 6 /* Jul */, 2)
    ])
    assert(result instanceof Date && isNaN(result))
  })

  it('converts Array-like objects into Array', function() {
    var date = /* 1393/4/11 */ new Date(2014, 6 /* Jul */, 2)
    var object = {
      '0': /* 1394/6/9 */ new Date(2015, 7 /* Aug */, 31),
      '1': /* 1391/4/12 */ new Date(2012, 6 /* Jul */, 2),
      length: 2
    }
    // $ExpectedMistake
    var result = closestTo(date, object)
    assert.deepEqual(result, /* 1394/6/9 */ new Date(2015, 7 /* Aug */, 31))
  })

  it('converts undefined into empty array', function() {
    var date = /* 1393/4/11 */ new Date(2014, 6 /* Jul */, 2).getTime()
    // $ExpectedMistake
    var result = closestTo(date, undefined)
    assert(result == null)
  })

  it('converts null into empty array', function() {
    var date = /* 1393/4/11 */ new Date(2014, 6 /* Jul */, 2).getTime()
    // $ExpectedMistake
    var result = closestTo(date, null)
    assert(result == null)
  })

  it('throws TypeError exception if passed less than 2 arguments', function() {
    assert.throws(closestTo.bind(null), TypeError)
    assert.throws(closestTo.bind(null, 1), TypeError)
  })
})
