// @flow
/* eslint-env mocha */

import assert from 'power-assert'
import startOfWeek from '.'

describe('startOfWeek', function() {
  it('returns the date with the time set to 00:00:00 and the date set to the first day of a week', function() {
    var date = /* 1393/6/11 */ new Date(2014, 8 /* Sep */, 2, 11, 55, 0)
    var result = startOfWeek(date)
    assert.deepEqual(result, /* 1393/6/8 */ new Date(2014, 7 /* Aug */, 30))
  })

  it('allows to specify which day is the first day of the week', function() {
    var date = /* 1393/6/11 */ new Date(2014, 8 /* Sep */, 2, 11, 55, 0)
    var result = startOfWeek(date, { weekStartsOn: 1 })
    assert.deepEqual(result, /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1))
  })

  it('allows to specify which day is the first day of the week in locale', function() {
    var date = /* 1393/6/11 */ new Date(2014, 8 /* Sep */, 2, 11, 55, 0)
    var result = startOfWeek(date, {
      // $ExpectedMistake
      locale: {
        options: { weekStartsOn: 1 }
      }
    })
    assert.deepEqual(result, /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1))
  })

  it('`options.weekStartsOn` overwrites the first day of the week specified in locale', function() {
    var date = /* 1393/6/11 */ new Date(2014, 8 /* Sep */, 2, 11, 55, 0)
    var result = startOfWeek(date, {
      weekStartsOn: 1,
      // $ExpectedMistake
      locale: {
        options: { weekStartsOn: 0 }
      }
    })
    assert.deepEqual(result, /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1))
  })

  it('implicitly converts options', function() {
    var date = /* 1393/6/11 */ new Date(2014, 8 /* Sep */, 2, 11, 55, 0)
    // $ExpectedMistake
    var result = startOfWeek(date, { weekStartsOn: '1' })
    assert.deepEqual(result, /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1))
  })

  it('accepts a timestamp', function() {
    var date = /* 1393/6/11 */ new Date(
      2014,
      8 /* Sep */,
      2,
      11,
      55,
      0
    ).getTime()
    var result = startOfWeek(date)
    assert.deepEqual(result, /* 1393/6/8 */ new Date(2014, 7 /* Aug */, 30))
  })

  it('does not mutate the original date', function() {
    var date = /* 1393/6/11 */ new Date(2014, 8 /* Sep */, 2, 11, 55, 0)
    startOfWeek(date)
    assert.deepEqual(
      date,
      /* 1393/6/11 */ new Date(2014, 8 /* Sep */, 2, 11, 55, 0)
    )
  })

  describe('edge cases', function() {
    context('when the given day is before the start of a week', function() {
      it('it returns the start of a week', function() {
        var date = /* 1393/7/14 */ new Date(2014, 9 /* Oct */, 6)
        var result = startOfWeek(date, { weekStartsOn: 3 })
        assert.deepEqual(result, /* 1393/7/9 */ new Date(2014, 9 /* Oct */, 1))
      })
    })

    context('when the given day is the start of a week', function() {
      it('it returns the start of a week', function() {
        var date = /* 1393/7/16 */ new Date(2014, 9 /* Oct */, 8)
        var result = startOfWeek(date, { weekStartsOn: 3 })
        assert.deepEqual(result, /* 1393/7/16 */ new Date(2014, 9 /* Oct */, 8))
      })
    })

    context('when the given day is after the start of a week', function() {
      it('it returns the start of a week', function() {
        var date = /* 1393/7/18 */ new Date(2014, 9 /* Oct */, 10)
        var result = startOfWeek(date, { weekStartsOn: 3 })
        assert.deepEqual(result, /* 1393/7/16 */ new Date(2014, 9 /* Oct */, 8))
      })
    })

    it('handles the week at the start of a year', function() {
      var date = /* 1392/10/11 */ new Date(2014, 0 /* Jan */, 1)
      var result = startOfWeek(date)
      assert.deepEqual(result, /* 1392/10/7 */ new Date(2013, 11 /* Dec */, 28))
    })
  })

  it('returns `Invalid Date` if the given date is invalid', function() {
    var result = startOfWeek(new Date(NaN))
    assert(result instanceof Date && isNaN(result))
  })

  it('throws `RangeError` if `options.weekStartsOn` is not convertable to 0, 1, ..., 6 or undefined', function() {
    var block = startOfWeek.bind(
      null,
      /* 1393/6/11 */ new Date(2014, 8 /* Sep */, 2, 11, 55, 0),
      // $ExpectedMistake
      { weekStartsOn: NaN }
    )
    assert.throws(block, RangeError)
  })

  it('throws TypeError exception if passed less than 1 argument', function() {
    assert.throws(startOfWeek.bind(null), TypeError)
  })
})
