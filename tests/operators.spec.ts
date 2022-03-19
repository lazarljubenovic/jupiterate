import * as chai from 'chai'
import * as j from '../src'
import { qqq } from '../src/utils'
import { AssertFalse, AssertTrue, IsExact } from 'conditional-type-checks'


const isNumber = (x: unknown): x is number => typeof x == 'number'
const stringToNumber = (x: string): number => 0
const numberToString = (x: number): string => ''
const booleanToNumber = (x: boolean): number => 0
const booleanToString = (x: boolean): string => ''
const stringToBoolean = (x: string): boolean => true
const numberToBoolean = (x: number): boolean => true

describe(`pipe`, () => {

  describe(`inherits types correctly`, () => {

    const input: number[] = []

    it(`works with no operators`, () => {
      const result = j.pipe(input)
      type Test1 = AssertTrue<IsExact<typeof result, Iterable<number>>>
      type Test2 = AssertFalse<IsExact<typeof result, Iterable<string>>>
    })

    it(`works with one operator`, () => {
      const result = j.pipe(input, j.map(numberToString))
      type Test1 = AssertTrue<IsExact<typeof result, Iterable<string>>>
    })

    it(`works with two operators`, () => {
      const result = j.pipe(input, j.map(numberToString), j.map(stringToBoolean))
      type Test1 = AssertTrue<IsExact<typeof result, Iterable<boolean>>>
    })

    it(`works with 10 operators`, () => {
      const result = j.pipe(
        input,
        j.map(numberToString),
        j.map(stringToNumber),
        j.map(numberToBoolean),
        j.map(booleanToNumber),
        j.map(numberToBoolean),
        j.map(booleanToString),
        j.map(stringToNumber),
        j.map(numberToBoolean),
        j.map(booleanToNumber),
        j.map(numberToBoolean),
      )
      type Test1 = AssertTrue<IsExact<typeof result, Iterable<boolean>>>
    })

    it(`works with one operator as array`, () => {
      const result = j.pipe(input, [j.map(numberToString)])
      type Test1 = AssertTrue<IsExact<typeof result, Iterable<string>>>
      type Test2 = AssertFalse<IsExact<typeof result, Iterable<number>>>
    })

    it(`works with two operators as array`, () => {
      const result = j.pipe(input, [j.map(numberToString), j.map(stringToBoolean)])
      type Test1 = AssertTrue<IsExact<typeof result, Iterable<boolean>>>
    })

    it(`works with an ender only`, () => {
      const result = j.pipe(input, j.e.find(x => x == 1))
      type Test = AssertTrue<IsExact<typeof result, number | undefined>>
    })

    it(`works with an operator and an ender`, () => {
      const result = j.pipe(input, j.map(numberToString), j.e.last())
      type Test = AssertTrue<IsExact<typeof result, string | undefined>>
    })

  })

})

describe(`Operators`, () => {

  describe(`chunk`, () => {

    it(`creates chunks of size 2`, () => {
      const actual = j.pipe(
        [1, 2, 3, 4, 5, 6, 7],
        j.chunk(2),
      )
      const expected = [[1, 2], [3, 4], [5, 6], [7]]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

  })

  describe(`concat`, () => {

    it(`concatenates one array`, () => {
      const actual = j.pipe(
        [1, 2],
        j.concat([3, 4]),
      )
      const expected = [1, 2, 3, 4]
      chai.assert.sameOrderedMembers([...actual], [...expected])
    })

    it(`concatenates several arrays`, () => {
      const actual = j.pipe(
        [1, 2],
        j.concat([3, 4], [5, 6], [7, 8]),
      )
      const expected = [1, 2, 3, 4, 5, 6, 7, 8]
      chai.assert.sameOrderedMembers([...actual], [...expected])
    })

    it(`concatenates an empty array`, () => {
      const actual = j.pipe(
        [1, 2],
        j.concat([] as number[]),
      )
      const expected = [1, 2]
      chai.assert.sameOrderedMembers([...actual], [...expected])
    })

  })

  describe(`differenceUsing`, () => {

    it(`works`, () => {
      const a = [2, 5, 7, 12, 9, 99]
      const b = [3, 5, 2, 9, 10, 12, 9, 0, 1]
      const actual = j.pipe(a, j.differenceUsing(b, qqq))
      const expected = [7, 99]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`works when the first argument is an empty iterable`, () => {
      const a: number[] = []
      const b = [1]
      const actual = j.pipe(a, j.differenceUsing(b, qqq))
      const expected: number[] = []
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`works when the second argument is an empty iterable`, () => {
      const a = [1, 2, 3]
      const b: number[] = []
      const actual = j.pipe(a, j.differenceUsing(b, qqq))
      const expected = [1, 2, 3]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`@example 1`, () => {
      const a = [1, 2, 3, 4, 5]
      const b = [4, 2, 6]
      const actual = j.pipe(a, j.differenceUsing(b, qqq))
      const expected = [1, 3, 5]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`@example 2`, () => {
      const a = [300, 301, 302, 303, 304, 305, 306, 307]
      const b = [1, 2]
      const actual = j.pipe(a, j.differenceUsing(b, (t, u) => t % 3 == u))
      const expected = [300, 303, 306]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

  })

  describe(`differenceBy`, () => {

    it(`@example 1`, () => {
      const a = [1, 2, 3, 4, 5]
      const b = [4, 2, 6]
      const actual = j.pipe(a, j.differenceBy(b, t => t))
      const expected = [1, 3, 5]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`@example 2`, () => {
      const a = [300, 301, 302, 303, 304, 305, 306, 307]
      const b = [1, 2]
      const actual = j.pipe(a, j.differenceBy(b, t => t % 3))
      const expected = [300, 303, 306]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

  })

  describe(`difference`, () => {

    it(`@example 1`, () => {
      const a = [1, 2, 3, 4, 5]
      const b = [4, 2, 6]
      const actual = j.pipe(a, j.difference(b))
      const expected = [1, 3, 5]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

  })

  describe(`filter`, () => {

    it(`works and correctly infers the type if used with a guard`, () => {
      const input = [1, 2, null, 3, null, 4]
      const actual = j.pipe(
        input,
        j.filter(isNumber),
        j.map(x => x ** 2),
      )
      const expected = [1, 4, 9, 16]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`@example 1`, () => {
      const input = [1, 2, 3, 4, 5]
      const actual = j.pipe(input, j.filter(x => x % 2 == 0))
      const expected = [2, 4]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`@example 2`, () => {
      const input = 'abCdEFG'
      const actual = j.pipe(input, j.filter(x => x.toLowerCase() == x))
      const expected = 'abd'
      chai.assert.sameOrderedMembers([...actual], [...expected])
    })

  })

  describe(`filterIndex`, () => {

    it(`works`, () => {
      const input = [-2, -1, 0, 1, 2]
      const actual = j.pipe(
        input,
        j.filterIndex(x => x > 0),
      )
      const expected = [3, 4]
      chai.assert.sameOrderedMembers([...actual], [...expected])
    })

  })

  describe(`flatMap`, () => {

    it(`works`, () => {
      const input = [1, 2, 3, 4]
      const actual = j.pipe(
        input,
        j.flatMap(n => [n, n ** 2]),
      )
      const expected = [1, 1, 2, 4, 3, 9, 4, 16]
      chai.assert.sameOrderedMembers([...actual], [...expected])
    })

  })

  describe(`flatten`, () => {

    describe(`depth 1`, () => {

      it(`flattens inner arrays`, () => {
        const input = [
          [1, 2],
          [3],
          [4, 5, 6],
        ]
        const actual = j.pipe(
          input,
          j.flatten(1),
        )
        const expected = [1, 2, 3, 4, 5, 6]
        chai.assert.sameOrderedMembers([...actual], [...expected])
      })

      it(`it doesn't flatten depth 2 and forth`, () => {
        const input = [
          [
            [1, 2, 3],
            4,
            [5, 6],
          ],
          [
            7,
            8,
            [9],
          ],
          [
            [10, 11],
          ],
        ]
        const actual = j.pipe(input, j.flatten(1))
        const expected = [
          [1, 2, 3],
          4,
          [5, 6],
          7,
          8,
          [9],
          [10, 11],
        ]
        chai.assert.sameDeepOrderedMembers([...actual], [...expected])
      })

    })

  })

  describe(`map`, () => {

    it(`maps all values`, () => {
      const input = [1, 2, 3]
      const actual = j.pipe(
        input,
        j.map(x => x + 1),
      )
      const expected = [2, 3, 4]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`@example 1`, () => {
      const actual = j.pipe(
        [1, 2, 3],
        j.map(t => t * 10),
      )
      const expected = [10, 20, 30]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`@example 2`, () => {
      const actual = j.pipe(
        'jupiterate',
        j.map((c, i) => i % 2 == 0 ? c.toUpperCase() : c.toLowerCase()),
      )
      const expected = 'JuPiTeRaTe'
      chai.assert.sameOrderedMembers([...actual], [...expected])
    })

  })

  describe(`takeWhile`, () => {

    it(`should be lazy`, () => {
      const visited: number[] = []
      const input = [-4, -6, -1, 6, -7, -5, 3, 1]
      const actual = j.pipe(
        input,
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

  describe(`takeFirst`, () => {

    it(`gives empty iterable when taking first 0 from a non-empty iterable`, () => {
      const input = [1, 2, 3, 4, 5]
      const actual = j.pipe(input, j.takeFirst(0))
      chai.assert.sameOrderedMembers([...actual], [])
    })

    it(`gives empty iterable when taking first 0 from an empty iterable`, () => {
      const actual = j.pipe([], j.takeFirst(0))
      chai.assert.sameOrderedMembers([...actual], [])
    })

    it(`gives max possible iterable when trying to take more than available`, () => {
      const input = [1, 2, 3, 4]
      const actual = j.pipe(input, j.takeFirst(20))
      chai.assert.sameOrderedMembers([...actual], [1, 2, 3, 4])
    })

    it(`gives empty iterable when trying to take a few but the source is empty`, () => {
      const actual = j.pipe([], j.takeFirst(3))
      chai.assert.sameOrderedMembers([...actual], [])
    })

    it(`takes a single value`, () => {
      const input = [1, 2, 3]
      const actual = j.pipe(input, j.takeFirst(1))
      chai.assert.sameOrderedMembers([...actual], [1])
    })

    it(`works for several`, () => {
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

  describe(`intersectionWith`, () => {

    it(`works`, () => {
      const a = [1, 2, 3, 4, 5]
      const b = [4, 2, 5, 0, 10, 1]
      const actual = j.pipe(a, j.intersectionUsing(b, qqq))
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
      const actual = j.pipe(input, j.pairs({ orderImportant: true, withRepetition: true }))
      chai.assert.deepEqual([...actual], expected)
    })

  })

  describe(`pairwise`, () => {

    it(`gives empty iterable for a given empty iterable`, () => {
      const actual = j.pipe([], j.pairwise())
      chai.assert.deepEqual([...actual], [])
    })

    it(`gives empty iterable for a given iterable of size 1`, () => {
      const actual = j.pipe(['a'], j.pairwise())
      chai.assert.deepEqual([...actual], [])
    })

    it(`gives a single pair for a given iterable of size 2`, () => {
      const actual = j.pipe(['a', 'b'], j.pairwise())
      chai.assert.deepEqual([...actual], [['a', 'b']])
    })

    it(`works for 3 items`, () => {
      const actual = j.pipe(['a', 'b', 'c'], j.pairwise())
      chai.assert.deepEqual([...actual], [['a', 'b'], ['b', 'c']])
    })

    it(`works for several items`, () => {
      const actual = j.pipe(['a', 'b', 'c', 'd', 'e', 'f'], j.pairwise())
      const expected = [
        ['a', 'b'],
        ['b', 'c'],
        ['c', 'd'],
        ['d', 'e'],
        ['e', 'f'],
      ]
      chai.assert.deepEqual([...actual], expected)
    })

  })

  describe(`pairwiseCyclic`, () => {

    it(`gives empty iterable for a given empty iterable`, () => {
      const actual = j.pipe([], j.pairwiseCyclic())
      chai.assert.deepEqual([...actual], [])
    })

    it(`gives a pair of the same item for given iterable of size 1`, () => {
      const actual = j.pipe(['a'], j.pairwiseCyclic())
      chai.assert.deepEqual([...actual], [['a', 'a']])
    })

    it(`gives both pairs for a given iterable of size 2`, () => {
      const actual = j.pipe(['a', 'b'], j.pairwiseCyclic())
      chai.assert.deepEqual([...actual], [['a', 'b'], ['b', 'a']])
    })

    it(`works for 3 items`, () => {
      const actual = j.pipe(['a', 'b', 'c'], j.pairwiseCyclic())
      chai.assert.deepEqual([...actual], [['a', 'b'], ['b', 'c'], ['c', 'a']])
    })

    it(`works for several items`, () => {
      const actual = j.pipe(['a', 'b', 'c', 'd', 'e', 'f'], j.pairwiseCyclic())
      const expected = [
        ['a', 'b'],
        ['b', 'c'],
        ['c', 'd'],
        ['d', 'e'],
        ['e', 'f'],
        ['f', 'a'],
      ]
      chai.assert.deepEqual([...actual], expected)
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

  describe(`sortedUnique`, () => {

    it(`works`, () => {
      const input = [1, 1, 1, 4, 4, 5, 5, 6, 7, 8, 8, 9, 9, 9]
      const actual = j.pipe(input, j.sortUnique())
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

})
