// @flow
/* eslint-env mocha */

import assert from 'power-assert'
import isSaturday from '.'

describe('isSaturday', function() {
  it('returns true if the given date is Saturday', function() {
    var result = isSaturday(/* 1393/7/5 */ new Date(2014, 8 /* Sep */, 27))
    assert(result === true)
  })

  it('returns false if the given date is not Saturday', function() {
    var result = isSaturday(/* 1393/7/3 */ new Date(2014, 8 /* Sep */, 25))
    assert(result === false)
  })

  it('accepts a timestamp', function() {
    var result = isSaturday(
      /* 1392/11/26 */ new Date(2014, 1 /* Feb */, 15).getTime()
    )
    assert(result === true)
  })

  it('returns false if the given date is `Invalid Date`', function() {
    var result = isSaturday(new Date(NaN))
    assert(result === false)
  })

  it('throws TypeError exception if passed less than 1 argument', function() {
    assert.throws(isSaturday.bind(null), TypeError)
  })
})
