import * as chai from 'chai'
import { isIterable } from '../src/utils'

describe(`utils`, () => {

  describe(`isIterable`, () => {

    it(`reports that null is not an iterable`, () => {
      chai.assert.isFalse(isIterable(null))
    })

    it(`reports that arrays, maps and sets are iterables`, () => {
      chai.assert.isTrue(isIterable([]), `an array`)
      chai.assert.isTrue(isIterable(new Map()), `a map`)
      chai.assert.isTrue(isIterable(new Set()), `a set`)
    })

  })

})
