import { j } from '../src'
import * as chai from 'chai'

const isNumber = (x: unknown): x is number => typeof x == 'number'

describe(`Enders`, () => {

  describe(`find`, () => {

    it(`finds the first matching item`, () => {
      const input = [4, 6, -1, 4]
      const actual = j.pipe(input, j.e.find(x => x < 0))
      const expected = -1
      chai.assert.equal(actual, expected)
    })

    it(`returns undefined when no matching item is found`, () => {
      const input = [4, 6, 2, 1]
      const actual = j.pipe(input, j.e.find(x => x > 100))
      chai.assert.isUndefined(actual)
    })

  })

  describe(`findIndex`, () => {

    it(`returns the index of the first matching item`, () => {
      const input = ['a', 'b', 'c', 'd']
      const actual = j.pipe(input, j.e.findIndex(x => x == 'c'))
      const expected = 2
      chai.assert.equal(actual, expected)
    })

    it(`returns -1 when no matching item is found`, () => {
      const input = ['a', 'b', 'c']
      const actual = j.pipe(input, j.e.findIndex(x => x == 'g'))
      const expected = -1
      chai.assert.equal(actual, expected)
    })

  })

  describe(`last`, () => {

    it(`returns the last item of the iterable`, () => {
      const input = [1, 2, 3]
      const actual = j.pipe(input, j.e.last())
      const expected = 3
      chai.assert.equal(actual, expected)
    })

    it(`returns undefined if the iterable doesn't yield anything`, () => {
      const input: number[] = []
      const actual = j.pipe(input, j.e.last())
      chai.assert.isUndefined(actual)
    })

  })

  describe(`nth`, () => {

    it(`returns the nth item of the iterable`, () => {
      const input = ['a', 'b', 'c', 'd']
      const actual = j.pipe(input, j.e.nth(2))
      const expected = 'c'
      chai.assert.equal(actual, expected)
    })

    it(`returns undefined when the iterable doesn't have that many itesm`, () => {
      const input = ['a', 'b', 'c']
      const actual = j.pipe(input, j.e.nth(99))
      chai.assert.isUndefined(actual)
    })

  })

  describe(`some`, () => {

    it(`returns true when at least one item satisfies the given condition`, () => {
      const input = [1, 2, 3, 4]
      const actual = j.pipe(input, j.e.some(x => x % 2 == 0))
      chai.assert.isTrue(actual)
    })

    it(`retuens false when no item satisfies the given condition`, () => {
      const input = [1, 2, 3]
      const actual = j.pipe(input, j.e.some(x => x > 10))
      chai.assert.isFalse(actual)
    })

  })

  describe(`every`, () => {

    it(`returns true when every item satisfies the given condition`, () => {
      const input = [1, 2, 3]
      const actual = j.pipe(input, j.e.every(x => x > 0))
      chai.assert.isTrue(actual)
    })

    it(`returns false when at least one item doesn't satisfy the given condition`, () => {
      const input = [1, 2, 3]
      const actual = j.pipe(input, j.e.every(x => x % 2 == 0))
      chai.assert.isFalse(actual)
    })

  })

  describe(`partition`, () => {

    it(`returns two iterables`, () => {
      const input = [1, 2, 3, 'a', 4, 'b', 5, 'c']
      const [left, right] = j.pipe(input, j.e.partition(isNumber))
      chai.assert.sameOrderedMembers([...left], [1, 2, 3, 4, 5])
      chai.assert.sameOrderedMembers([...right], ['a', 'b', 'c'])
    })

  })

})
