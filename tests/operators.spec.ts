import { j } from '../src'
import * as chai from 'chai'
import { qqq } from '../src/utils'

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
      const actual = j.pipe(input, j.takeFirst(3))
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

  describe(`differenceWith`, () => {

    it(`works`, () => {
      const a = [2, 5, 7, 12, 9, 99]
      const b = [3, 5, 2, 9, 10, 12, 9, 0, 1]
      const actual = j.pipe(a, j.differenceWith(b, qqq))
      const expected = [7, 99]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

  })

  describe(`intersectionWith`, () => {

    it(`works`, () => {
      const a = [1, 2, 3, 4, 5]
      const b = [4, 2, 5, 0, 10, 1]
      const actual = j.pipe(a, j.intersectionWith(b, qqq))
      const expected = [1, 2, 4, 5]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

  })

  describe(`flatten`, () => {

    it(`works without argument`, () => {
      const input = [[1, 2], [5], [6, 7, [8, 9]]]
      const actual = j.pipe(input, j.flatten())
      const expected = [1, 2, 5, 6, 7, [8, 9]]
      chai.assert.sameDeepOrderedMembers([...actual], expected)
    })

    it(`works with argument`, () => {
      const input = [
        [
          [1, 2],
          [3, 4],
          [5],
        ],
        [
          [6, 7, 8],
        ],
        [
          [9],
        ],
      ]
      const actual = j.pipe(input, j.flatten(2))
      const expected = j.g.integers(1, 10)
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

  })

  describe(`flattenDeep`, () => {

    it(`works`, () => {
      const input = [1, [2, 3, [4, 5, [6, 7, [8]]], 9]]
      const actual = j.pipe(input, j.flattenDeep())
      const expected = j.g.integers(1, 10)
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

  })

  describe(`slice`, () => {

    it(`doesn't do anything without any arguments`, () => {
      const input = [1, 2, 3]
      const actual = j.pipe(input, j.slice())
      const expected = [1, 2, 3]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`slices from the start only`, () => {
      const input = 'abcdefgh'
      const actual = j.pipe(input, j.slice(2))
      const expected = 'cdefgh'.split('')
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`slices fom the start and end`, () => {
      const input = 'abcdefgh'
      const actual = j.pipe(input, j.slice(3, 5))
      const expected = ['d', 'e']
      chai.assert.sameOrderedMembers([...actual], expected)
    })

  })

  describe(`unique`, () => {

    it(`works`, () => {
      const input = [1, 3, 6, 4, 5, 3, 3, 2, 2, 9, 1, 1, 3]
      const actual = j.pipe(input, j.unique())
      const expected = [1, 3, 6, 4, 5, 2, 9]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

  })

  describe(`sortedUnque`, () => {

    it(`works`, () => {
      const input = [1, 1, 1, 4, 4, 5, 5, 6, 7, 8, 8, 9, 9, 9]
      const actual = j.pipe(input, j.sortedUnique())
      const expected = [1, 4, 5, 6, 7, 8, 9]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

  })

  describe(`zip`, () => {

    it(`works with iterables of same item count`, () => {
      const input = [1, 2, 3]
      const iterables = [
        ['a', 'b', 'c'],
        [10, 20, 30],
        [true, true, true],
      ] as const
      const actual = j.pipe(input, j.zip(...iterables))
      const expected = [
        [1, 'a', 10, true],
        [2, 'b', 20, true],
        [3, 'c', 30, true],
      ]
      chai.assert.deepEqual([...actual], [...expected])
    })

    it(`works with iterables of different item count`, () => {
      const input = [1, 2, 3, 4]
      const iterables = [
        ['a', 'b', 'c', 'd', 'e', 'f'],
        [10, 20, 30],
        [true],
      ] as const
      const actual = j.pipe(input, j.zip(...iterables))
      const expected = [
        [1, 'a', 10, true],
        [2, 'b', 20, undefined],
        [3, 'c', 30, undefined],
        [4, 'd', undefined, undefined],
        [undefined, 'e', undefined, undefined],
        [undefined, 'f', undefined, undefined],
      ]
      chai.assert.deepEqual([...actual], [...expected])
    })

  })

  describe(`zipStrict`, () => {

    it(`works with iterables of same item count`, () => {
      const input = [1, 2, 3]
      const iterables = [
        ['a', 'b', 'c'],
        [10, 20, 30],
        [true, true, true],
      ] as const
      const actual = j.pipe(input, j.zipStrict(...iterables))
      const expected = [
        [1, 'a', 10, true],
        [2, 'b', 20, true],
        [3, 'c', 30, true],
      ]
      chai.assert.deepEqual([...actual], [...expected])
    })

    it(`throws with iterables of different item count`, () => {
      const input = [1, 2, 3, 4]
      const iterables = [
        ['a', 'b', 'c', 'd', 'e', 'f'],
        [10, 20, 30],
        [true],
      ] as const
      const getActual = () => [...j.pipe(input, j.zipStrict(...iterables))]
      chai.assert.throws(getActual)
    })

  })

  describe(`pairs`, () => {

    it(`works when order is not important, and there's no repetition`, () => {
      const input = ['a', 'b', 'c', 'd']
      const expected = [
        ['a', 'b'],
        ['a', 'c'],
        ['a', 'd'],
        ['b', 'c'],
        ['b', 'd'],
        ['c', 'd'],
      ]
      const actual = j.pipe(input, j.pairs({ orderImportant: false, withRepetition: false }))
      chai.assert.deepEqual([...actual], expected)
    })

    it(`works, when order not important, and there's repetition`, () => {
      const input = ['a', 'b', 'c', 'd']
      const expected = [
        ['a', 'a'],
        ['a', 'b'],
        ['a', 'c'],
        ['a', 'd'],
        ['b', 'b'],
        ['b', 'c'],
        ['b', 'd'],
        ['c', 'c'],
        ['c', 'd'],
        ['d', 'd'],
      ]
      const actual = j.pipe(input, j.pairs({ orderImportant: false, withRepetition: true }))
      chai.assert.deepEqual([...actual], expected)
    })

    it(`works, when order is important, and there's no repetition`, () => {
      const input = ['a', 'b', 'c', 'd']
      const expected = [
        ['a', 'b'],
        ['a', 'c'],
        ['a', 'd'],
        ['b', 'a'],
        ['b', 'c'],
        ['b', 'd'],
        ['c', 'a'],
        ['c', 'b'],
        ['c', 'd'],
        ['d', 'a'],
        ['d', 'b'],
        ['d', 'c'],
      ]
      const actual = j.pipe(input, j.pairs({ orderImportant: true, withRepetition: false }))
      chai.assert.deepEqual([...actual], expected)
    })

    it(`works, when order is important, and there's repetition`, () => {
      const input = ['a', 'b', 'c', 'd']
      const expected = [
        ['a', 'a'],
        ['a', 'b'],
        ['a', 'c'],
        ['a', 'd'],
        ['b', 'a'],
        ['b', 'b'],
        ['b', 'c'],
        ['b', 'd'],
        ['c', 'a'],
        ['c', 'b'],
        ['c', 'c'],
        ['c', 'd'],
        ['d', 'a'],
        ['d', 'b'],
        ['d', 'c'],
        ['d', 'd'],
      ]
      const actual = j.pipe(input, j.pairs({orderImportant: true, withRepetition: true}))
      chai.assert.deepEqual([...actual], expected)
    })

  })

})
