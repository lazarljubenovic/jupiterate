import { j } from '../src'
import * as chai from 'chai'

const isNumber = (x: unknown): x is number => typeof x == 'number'

describe(`Operators`, () => {

  describe(`map`, () => {

    it(`maps all values`, () => {
      const input = [1, 2, 3]
      const actual = j.pipe(input,
        j.map(x => x + 1),
      )
      const expected = [2, 3, 4]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

  })

  describe(`filter`, () => {

    it(`should filter and map`, () => {
      const input = [1, 2, null, 3, null, 4]
      const actual = j.pipe(input,
        j.filter(isNumber),
        j.map(x => x ** 2),
      )
      const expected = [1, 4, 9, 16]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

  })

  describe(`takeWhile`, () => {

    it(`should be lazy`, () => {
      const visited: number[] = []
      const input = [-4, -6, -1, 6, -7, -5, 3, 1]
      const actual = j.pipe(input,
        j.takeWhile(x => {
          visited.push(x)
          return x < 0
        }),
      )
      const expected = [-4, -6, -1]
      const expectedVisited = [-4, -6, -1, 6]
      chai.assert.sameOrderedMembers(visited, [])
      chai.assert.sameOrderedMembers([...actual], expected)
      chai.assert.sameOrderedMembers(visited, expectedVisited)
    })

  })

  describe(`first`, () => {

    it(`should work`, () => {
      const input = [1, 2, 3, 4, 5, 6, 7]
      const actual = j.pipe(input, j.first(3))
      const expected = [1, 2, 3]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

  })

  describe(`skipUntil`, () => {

    it(`should work`, () => {
      const input = [1, 2, 5, 3, 0, 6, 3, 2, 1]
      const actual = j.pipe(input, j.skipUntil(x => x == 0))
      const expected = [0, 6, 3, 2, 1]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

  })

  describe(`skip`, () => {
    it(`should work`, () => {
      const input = [1, 2, 3, 4]
      const actual = j.pipe(input, j.skip(2))
      const expected = [3, 4]
      chai.assert.sameOrderedMembers([...actual], expected)
    })
  })

  describe(`restMap`, () => {

    it(`should work`, () => {
      const input = ['a', 'b', 'c', 'd']
      const actual = j.pipe(input, j.restMap())
      const iterator = actual[Symbol.iterator]()
      {
        const { done, value } = iterator.next()
        chai.assert.isFalse(done, `Done for "a" should be false.`)
        chai.assert.equal(value.length, 2)
        chai.assert.equal(value[0], 'a')
        chai.assert.sameOrderedMembers([...value[1]], ['b', 'c', 'd'])
      }
      {
        const { done, value } = iterator.next()
        chai.assert.isFalse(done, `Done for "b" should be false.`)
        chai.assert.equal(value.length, 2)
        chai.assert.equal(value[0], 'b')
        chai.assert.sameOrderedMembers([...value[1]], ['c', 'd'])
      }
      {
        const { done, value } = iterator.next()
        chai.assert.isFalse(done, `Done for "c" should be false.`)
        chai.assert.equal(value.length, 2)
        chai.assert.equal(value[0], 'c')
        chai.assert.sameOrderedMembers([...value[1]], ['d'])
      }
      {
        const { done, value } = iterator.next()
        chai.assert.isFalse(done, `Done for "d" should be false.`)
        chai.assert.equal(value.length, 2)
        chai.assert.equal(value[0], 'd')
        chai.assert.sameOrderedMembers([...value[1]], [])
      }
      {
        const { done, value } = iterator.next()
        chai.assert.isTrue(done, `After "d", done should be true.`)
        chai.assert.isUndefined(value)
      }
    })

  })

})
