import * as chai from 'chai'
import * as j from '../src'


describe(`Static`, () => {

  describe(`intersection`, () => {

    it(`returns an empty iterator when no arguments are given`, () => {
      const actual = j.s.intersection()
      const expected: never[] = []
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`returns the same iterator when given only one argument`, () => {
      const actual = j.s.intersection([1, 2, 3])
      const expected = [1, 2, 3]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`returns the intersection of two iterables`, () => {
      const actual = j.s.intersection([0, 5, 10, 15, 20], [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20])
      const expected = [0, 10, 20]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`returns the intersection of three iterables`, () => {
      const actual = j.s.intersection([1, 2, 3, 4, 5], [2, 3, 4, 5, 6], [3, 4, 5, 6, 7])
      const expected = [3, 4, 5]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

  })

  describe(`getSingleOrThrow`, () => {

    it(`works when iterable has a single item`, () => {
      const actual = j.s.getSingleOrThrow([1])
      chai.assert.equal(actual, 1)
    })

    it(`throws when iterable has no items`, () => {
      const fn = () => {
        j.s.getSingleOrThrow([])
      }
      chai.assert.throws(fn, `Expected exactly one item, but got zero.`)
    })

    it(`throws when iterable has more than one item`, () => {
      const fn = () => {
        j.s.getSingleOrThrow([1, 2])
      }
      chai.assert.throws(fn, `Expected only one item, but found more than one.`)
    })

  })

})
