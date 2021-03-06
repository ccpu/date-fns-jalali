// @flow
/* eslint-env mocha */

import assert from 'power-assert'
import addMonths from '.'

describe('addMonths', function() {
  it('adds the given number of months', function() {
    var result = addMonths(/* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1), 5)
    assert.deepEqual(result, /* 1393/11/10 */ new Date(2015, 0 /* Jan */, 30))
  })

  it('accepts a timestamp', function() {
    var result = addMonths(
      /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1).getTime(),
      12
    )
    assert.deepEqual(result, /* 1394/6/10 */ new Date(2015, 8 /* Sep */, 1))
  })

  it('converts a fractional number to an integer', function() {
    var result = addMonths(/* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1), 5.75)
    assert.deepEqual(result, /* 1393/11/10 */ new Date(2015, 0 /* Jan */, 30))
  })

  it('implicitly converts number arguments', function() {
    // $ExpectedMistake
    var result = addMonths(/* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1), '5')
    assert.deepEqual(result, /* 1393/11/10 */ new Date(2015, 0 /* Jan */, 30))
  })

  it('does not mutate the original date', function() {
    var date = /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1)
    addMonths(date, 12)
    assert.deepEqual(date, /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1))
  })

  it('works well if the desired month has fewer days and the provided date is in the last day of a month', function() {
    var date = /* 1393/10/30 */ new Date(2015, 0 /* Jan */, 20)
    var result = addMonths(date, 2)
    assert.deepEqual(result, /* 1393/12/29 */ new Date(2015, 2 /* Mar */, 20))
  })

  it.skip('handles dates before 100 AD', function() {
    var initialDate = new Date(0)
    initialDate.setFullYear(0, 0 /* Jan */, 31)
    initialDate.setHours(0, 0, 0, 0)
    var expectedResult = new Date(0)
    expectedResult.setFullYear(0, 1 /* Feb */, 29)
    expectedResult.setHours(0, 0, 0, 0)
    var result = addMonths(initialDate, 1)
    assert.deepEqual(result, expectedResult)
  })

  it('returns `Invalid Date` if the given date is invalid', function() {
    var result = addMonths(new Date(NaN), 5)
    assert(result instanceof Date && isNaN(result))
  })

  it('returns `Invalid Date` if the given amount is NaN', function() {
    var result = addMonths(/* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1), NaN)
    assert(result instanceof Date && isNaN(result))
  })

  it('throws TypeError exception if passed less than 2 arguments', function() {
    assert.throws(addMonths.bind(null), TypeError)
    assert.throws(addMonths.bind(null, 1), TypeError)
  })
})
