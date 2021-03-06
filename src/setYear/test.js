// @flow
/* eslint-env mocha */

import assert from 'power-assert'
import setYear from '.'

describe('setYear', function() {
  it('sets the year', function() {
    var result = setYear(/* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1), 1392)
    assert.deepEqual(result, /* 1392/6/10 */ new Date(2013, 8 /* Sep */, 1))
  })

  it('accepts a timestamp', function() {
    var result = setYear(
      /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1).getTime(),
      1395
    )
    assert.deepEqual(result, /* 1395/6/10 */ new Date(2016, 7 /* Aug */, 31))
  })

  it('converts a fractional number to an integer', function() {
    var result = setYear(
      /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1),
      1392.987654321
    )
    assert.deepEqual(result, /* 1392/6/10 */ new Date(2013, 8 /* Sep */, 1))
  })

  it('implicitly converts number arguments', function() {
    // $ExpectedMistake
    var result = setYear(/* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1), '1392')
    assert.deepEqual(result, /* 1392/6/10 */ new Date(2013, 8 /* Sep */, 1))
  })

  it('does not mutate the original date', function() {
    var date = /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1)
    setYear(date, 2011)
    assert.deepEqual(date, /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1))
  })

  it('returns `Invalid Date` if the given date is invalid', function() {
    var result = setYear(new Date(NaN), 2013)
    assert(result instanceof Date && isNaN(result))
  })

  it('returns `Invalid Date` if the given amount is NaN', function() {
    var result = setYear(/* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1), NaN)
    assert(result instanceof Date && isNaN(result))
  })

  it('throws TypeError exception if passed less than 2 arguments', function() {
    assert.throws(setYear.bind(null), TypeError)
    assert.throws(setYear.bind(null, 1), TypeError)
  })
})
