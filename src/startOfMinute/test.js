// @flow
/* eslint-env mocha */

import assert from 'power-assert'
import startOfMinute from '.'

describe('startOfMinute', function() {
  it('returns the date with the time set to the first millisecond of a minute', function() {
    var date = /* 1393/9/10 */ new Date(2014, 11 /* Dec */, 1, 22, 15, 45, 400)
    var result = startOfMinute(date)
    assert.deepEqual(
      result,
      /* 1393/9/10 */ new Date(2014, 11 /* Dec */, 1, 22, 15)
    )
  })

  it('accepts a timestamp', function() {
    var date = /* 1393/9/10 */ new Date(2014, 11 /* Dec */, 1, 22, 15).getTime()
    var result = startOfMinute(date)
    assert.deepEqual(
      result,
      /* 1393/9/10 */ new Date(2014, 11 /* Dec */, 1, 22, 15)
    )
  })

  it('does not mutate the original date', function() {
    var date = /* 1393/9/10 */ new Date(2014, 11 /* Dec */, 1, 22, 15, 45, 400)
    startOfMinute(date)
    assert.deepEqual(
      date,
      /* 1393/9/10 */ new Date(2014, 11 /* Dec */, 1, 22, 15, 45, 400)
    )
  })

  it('returns `Invalid Date` if the given date is invalid', function() {
    var result = startOfMinute(new Date(NaN))
    assert(result instanceof Date && isNaN(result))
  })

  it('throws TypeError exception if passed less than 1 argument', function() {
    assert.throws(startOfMinute.bind(null), TypeError)
  })
})
