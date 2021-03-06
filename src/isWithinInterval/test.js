// @flow
/* eslint-env mocha */

import assert from 'power-assert'
import isWithinInterval from '.'

describe('isWithinInterval', function() {
  it('returns true if the given date in within the given interval', function() {
    var result = isWithinInterval(
      /* 1393/8/9 */ new Date(2014, 9 /* Oct */, 31),
      {
        start: /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1),
        end: /* 1393/10/10 */ new Date(2014, 11 /* Dec */, 31)
      }
    )
    assert(result === true)
  })

  it('returns true if the given date has same time as the left boundary of the interval', function() {
    var result = isWithinInterval(
      /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1),
      {
        start: /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1),
        end: /* 1393/10/10 */ new Date(2014, 11 /* Dec */, 31)
      }
    )
    assert(result === true)
  })

  it('returns true if the given date has same time as the right boundary of the interval', function() {
    var result = isWithinInterval(
      /* 1393/10/10 */ new Date(2014, 11 /* Dec */, 31),
      {
        start: /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1),
        end: /* 1393/10/10 */ new Date(2014, 11 /* Dec */, 31)
      }
    )
    assert(result === true)
  })

  it('returns true if the given date and the both boundaries are the same', function() {
    var result = isWithinInterval(
      /* 1393/10/10 */ new Date(2014, 11 /* Dec */, 31),
      {
        start: /* 1393/10/10 */ new Date(2014, 11 /* Dec */, 31),
        end: /* 1393/10/10 */ new Date(2014, 11 /* Dec */, 31)
      }
    )
    assert(result === true)
  })

  it('returns false if the given date is outside of the interval', function() {
    var result = isWithinInterval(
      /* 1392/11/22 */ new Date(2014, 1 /* Feb */, 11),
      {
        start: /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1),
        end: /* 1393/10/10 */ new Date(2014, 11 /* Dec */, 31)
      }
    )
    assert(result === false)
  })

  it('accepts a timestamp', function() {
    var result = isWithinInterval(
      /* 1393/8/9 */ new Date(2014, 9 /* Oct */, 31).getTime(),
      {
        start: /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1).getTime(),
        end: /* 1393/10/10 */ new Date(2014, 11 /* Dec */, 31).getTime()
      }
    )
    assert(result === true)
  })

  it('throws an exception if the start date is after the end date', function() {
    var block = isWithinInterval.bind(
      null,
      /* 1393/8/9 */ new Date(2014, 9 /* Oct */, 31),
      {
        start: /* 1393/10/10 */ new Date(2014, 11 /* Dec */, 31),
        end: /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1)
      }
    )
    assert.throws(block, RangeError)
  })

  it('throws an exception if the interval is undefined', function() {
    var block = isWithinInterval.bind(
      null,
      /* 1393/8/9 */ new Date(2014, 9 /* Oct */, 31),
      // $ExpectedMistake
      undefined
    )
    assert.throws(block, RangeError)
  })

  it('returns false if the given date is `Invalid Date`', function() {
    var result = isWithinInterval(new Date(NaN), {
      start: /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1),
      end: /* 1393/10/10 */ new Date(2014, 11 /* Dec */, 31)
    })
    assert(result === false)
  })

  it('throws an exception if the start date is `Invalid Date`', function() {
    var block = isWithinInterval.bind(
      null,
      /* 1393/8/9 */ new Date(2014, 9 /* Oct */, 31),
      {
        start: new Date(NaN),
        end: /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1)
      }
    )
    assert.throws(block, RangeError)
  })

  it('throws an exception if the end date is `Invalid Date`', function() {
    var block = isWithinInterval.bind(
      null,
      /* 1393/8/9 */ new Date(2014, 9 /* Oct */, 31),
      {
        start: /* 1393/10/10 */ new Date(2014, 11 /* Dec */, 31),
        end: new Date(NaN)
      }
    )
    assert.throws(block, RangeError)
  })

  it('throws TypeError exception if passed less than 2 arguments', function() {
    assert.throws(isWithinInterval.bind(null), TypeError)
    assert.throws(isWithinInterval.bind(null, 1), TypeError)
  })
})
