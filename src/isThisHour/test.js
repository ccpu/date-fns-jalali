// @flow
/* eslint-env mocha */

import assert from 'assert'
import sinon from 'sinon'
import isThisHour from '.'

describe('isThisHour', () => {
  let clock
  beforeEach(() => {
    clock = sinon.useFakeTimers(
      /* 1393/7/3 */ new Date(2014, 8 /* Sep */, 25, 18, 30, 15, 500).getTime()
    )
  })

  afterEach(() => {
    clock.restore()
  })

  it('returns true if the given date and the current date have the same hour', () => {
    const date = /* 1393/7/3 */ new Date(2014, 8 /* Sep */, 25, 18)
    assert(isThisHour(date) === true)
  })

  it('returns false if the given date and the current date have different hours', () => {
    const date = /* 1393/7/3 */ new Date(2014, 8 /* Sep */, 25, 19)
    assert(isThisHour(date) === false)
  })

  it('accepts a timestamp', () => {
    const date = /* 1393/7/3 */ new Date(
      2014,
      8 /* Sep */,
      25,
      18,
      45
    ).getTime()
    assert(isThisHour(date) === true)
  })

  it('throws TypeError exception if passed less than 1 argument', () => {
    assert.throws(isThisHour.bind(null), TypeError)
  })
})
