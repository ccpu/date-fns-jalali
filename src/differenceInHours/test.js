// @flow
/* eslint-env mocha */

import assert from 'power-assert'
import differenceInHours from '.'

describe('differenceInHours', function() {
  it('returns the number of hours between the given dates', function() {
    var result = differenceInHours(
      /* 1393/4/11 */ new Date(2014, 6 /* Jul */, 2, 20, 0),
      /* 1393/4/11 */ new Date(2014, 6 /* Jul */, 2, 6, 0)
    )
    assert(result === 14)
  })

  it('returns a negative number if the time value of the first date is smaller', function() {
    var result = differenceInHours(
      /* 1393/4/11 */ new Date(2014, 6 /* Jul */, 2, 6, 0),
      /* 1393/4/11 */ new Date(2014, 6 /* Jul */, 2, 20, 0)
    )
    assert(result === -14)
  })

  it('accepts timestamps', function() {
    var result = differenceInHours(
      /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 18, 0).getTime(),
      /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 6, 0).getTime()
    )
    assert(result === 12)
  })

  describe('edge cases', function() {
    it('the difference is less than an hour, but the given dates are in different calendar hours', function() {
      var result = differenceInHours(
        /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 12),
        /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 11, 59)
      )
      assert(result === 0)
    })

    it('the same for the swapped dates', function() {
      var result = differenceInHours(
        /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 11, 59),
        /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 12)
      )
      assert(result === 0)
    })

    it('the difference is an integral number of hours', function() {
      var result = differenceInHours(
        /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 13, 0),
        /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 12, 0)
      )
      assert(result === 1)
    })

    it('the given dates are the same', function() {
      var result = differenceInHours(
        /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 0, 0),
        /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 0, 0)
      )
      assert(result === 0)
    })

    it('does not return -0 when the given dates are the same', () => {
      function isNegativeZero(x) {
        return x === 0 && 1 / x < 0
      }

      var result = differenceInHours(
        /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 0, 0),
        /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 0, 0)
      )

      var resultIsNegative = isNegativeZero(result)
      assert(resultIsNegative === false)
    })
  })

  it('returns NaN if the first date is `Invalid Date`', function() {
    var result = differenceInHours(
      new Date(NaN),
      /* 1395/10/12 */ new Date(2017, 0 /* Jan */, 1)
    )
    assert(isNaN(result))
  })

  it('returns NaN if the second date is `Invalid Date`', function() {
    var result = differenceInHours(
      /* 1395/10/12 */ new Date(2017, 0 /* Jan */, 1),
      new Date(NaN)
    )
    assert(isNaN(result))
  })

  it('returns NaN if the both dates are `Invalid Date`', function() {
    var result = differenceInHours(new Date(NaN), new Date(NaN))
    assert(isNaN(result))
  })

  it('throws TypeError exception if passed less than 2 arguments', function() {
    assert.throws(differenceInHours.bind(null), TypeError)
    assert.throws(differenceInHours.bind(null, 1), TypeError)
  })
})
