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
      type Test1 = AssertTrue<IsExact<typeof result, IterableIterator<string>>>
    })

    it(`works with two operators`, () => {
      const result = j.pipe(input, j.map(numberToString), j.map(stringToBoolean))
      type Test1 = AssertTrue<IsExact<typeof result, IterableIterator<boolean>>>
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
      type Test1 = AssertTrue<IsExact<typeof result, IterableIterator<string>>>
      type Test2 = AssertFalse<IsExact<typeof result, IterableIterator<number>>>
    })

    it(`works with two operators as array`, () => {
      const result = j.pipe(input, [j.map(numberToString), j.map(stringToBoolean)])
      type Test1 = AssertTrue<IsExact<typeof result, IterableIterator<boolean>>>
    })

    it(`works with a finalizer only`, () => {
      const result = j.pipe(input, j.andFinally((j.Find<number>), x => x == 1))
      type Test = AssertTrue<IsExact<typeof result, number | undefined>>
    })

    it(`works with an operator and a finalizer`, () => {
      const result = j.pipe(input, j.map(numberToString), j.andFinally(j.Last))
      type Test = AssertTrue<IsExact<typeof result, string | undefined>>
    })

  })

})

describe(`Operators`, () => {

  describe(`chunk`, () => {

    it(`creates chunks of size 3`, () => {
      const actual = j.pipe(
        [1, 2, 3, 4, 5, 6, 7],
        j.chunk(3),
      )
      const expected = [[1, 2, 3], [4, 5, 6], [7]]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`throws a RangeError when chunk size is not an integer`, () => {
      chai.assert.throws(() => j.chunk(1.5), RangeError)
    })

    it(`throws a RangeError when chunk size is zero`, () => {
      chai.assert.throws(() => j.chunk(0), RangeError)
    })

    it(`throws a RangeError when chunk size is less than zero`, () => {
      chai.assert.throws(() => j.chunk(-1), RangeError)
    })

    it(`@example 1`, () => {
      const actual = j.pipe(
        [1, 2, 3, 4],
        j.chunk(2),
      )
      const expected = [[1, 2], [3, 4]]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 2`, () => {
      const actual = j.pipe(
        [1, 2, 3, 4, 5],
        j.chunk(2),
      )
      const expected = [[1, 2], [3, 4], [5]]
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
        j.concat([3, 4], [5], [], [6, 7, 8]),
      )
      const expected = [1, 2, 3, 4, 5, 6, 7, 8]
      chai.assert.sameOrderedMembers([...actual], [...expected])
    })

    it(`concatenates no arrays`, () => {
      const actual = j.pipe(
        [1, 2],
        j.concat(),
      )
      const expected = [1, 2]
      chai.assert.sameOrderedMembers([...actual], [...expected])
    })

    it(`@example 1`, () => {
      const actual = j.pipe(
        [1, 2],
        j.concat([3, 4]),
      )
      const expected = [1, 2, 3, 4]
      chai.assert.sameOrderedMembers([...actual], [...expected])
    })

    it(`@example 2`, () => {
      const actual = j.pipe(
        [1],
        j.concat([2], [3, 4], [], [5]),
      )
      const expected = [1, 2, 3, 4, 5]
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
      const actual = j.pipe(
        [1, 2, 3],
        j.differenceUsing([], qqq),
      )
      const expected = [1, 2, 3]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`@example 1`, () => {
      const actual = j.pipe(
        [1, 2, 3, 4, 5],
        j.differenceUsing([4, 2, 6], qqq),
      )
      const expected = [1, 3, 5]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`@example 2`, () => {
      const actual = j.pipe(
        [300, 301, 302, 303, 304, 305, 306, 307],
        j.differenceUsing([2, 4], (t, u) => t % 5 == u),
      )
      const expected = [300, 301, 303, 305, 306]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

  })

  describe(`differenceBy`, () => {

    it(`@example 1`, () => {
      const actual = j.pipe(
        [1, 2, 3, 4, 5],
        j.differenceBy([4, 2, 6], t => t),
      )
      const expected = [1, 3, 5]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`@example 2`, () => {
      const actual = j.pipe(
        [300, 301, 302, 303, 304, 305, 306, 307],
        j.differenceBy([2, 4], t => t % 5),
      )
      const expected = [300, 301, 303, 305, 306]
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

  describe(`endWith`, () => {

    it(`@example 1`, () => {
      const actual = j.pipe(
        [1, 2, 3, 4],
        j.endWith(5),
      )
      const expected = [1, 2, 3, 4, 5]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 2`, () => {
      const actual = j.pipe(
        [2, 4, 6],
        j.endWith(8, 10),
      )
      const expected = [2, 4, 6, 8, 10]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`doesn't impact the source iterable when there are no additional values to yield`, () => {
      const input = [1, 2, 3, 4]
      const actual = j.pipe(input, j.endWith<number>())

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
      const actual = j.pipe(
        [1, 2, 3, 4, 5],
        j.filter(x => x % 2 == 0),
      )
      const expected = [2, 4]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`@example 2`, () => {
      const actual = j.pipe(
        'abCdEFG',
        j.filter(x => x.toLowerCase() == x),
      )
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

    it(`@example 1`, () => {
      const actual = j.pipe(
        [1, 2, 3, 4, 5],
        j.filterIndex(x => x % 2 == 0),
      )
      const expected = [1, 3]
      chai.assert.sameOrderedMembers([...actual], [...expected])
    })

    it(`@example 2`, () => {
      const actual = j.pipe(
        'abCdEFG',
        j.filterIndex(c => c.toLowerCase() == c),
      )
      const expected = [0, 1, 3]
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

    it(`@example 1`, () => {
      const actual = j.pipe(
        [1, 2, 3],
        j.flatMap(t => [t, t]),
      )
      const expected = [1, 1, 2, 2, 3, 3]
      chai.assert.sameOrderedMembers([...actual], [...expected])
    })

    it(`@example 2`, () => {
      const actual = j.pipe(
        'yes! no!',
        j.flatMap(t => t == '!' ? [] : [t, t, t]),
      )
      const expected = 'yyyeeesss   nnnooo'
      chai.assert.sameOrderedMembers([...actual], [...expected])
    })

    it(`@example 3`, () => {
      const actual = j.pipe(
        [1, 2, 3],
        j.flatMap(t => [t - 1, t + 1]),
      )
      const expected = [0, 2, 1, 3, 2, 4]
      chai.assert.sameOrderedMembers([...actual], [...expected])
    })

    it(`@example 4`, () => {
      const actual = j.pipe(
        [10, 20],
        j.flatMap(t => [1, 2, t]),
      )
      const expected = [1, 2, 10, 1, 2, 20]
      chai.assert.sameOrderedMembers([...actual], [...expected])
    })

  })

  describe(`flatten`, () => {

    it(`throws when depth is less than zero`, () => {
      const operation = () => [...j.pipe([[1]], j.flatten(-1))]
      chai.assert.throws(operation)
    })

    it(`@example 1`, () => {
      const actual = j.pipe(
        [[1, 2], [3], [4, 5, 6]],
        j.flatten<number>(1),
      )
      const expected = [1, 2, 3, 4, 5, 6]
      chai.assert.sameOrderedMembers([...actual], [...expected])
    })

    it(`@example 2`, () => {
      const actual = j.pipe(
        [
          [
            [111, 112],
            [121],
            [131, 132],
          ],
          [
            [211, 212, 213],
            [],
          ],
        ],
        j.flatten<Iterable<number>>(1),
      )
      const expected = [
        [111, 112],
        [121],
        [131, 132],
        [211, 212, 213],
        [],
      ]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 3`, () => {
      const actual = j.pipe(
        [
          [
            [111, 112],
            [121],
            [131, 132],
          ],
          [
            [211, 212, 213],
            [],
          ],
        ],
        j.flatten<number>(2),
      )
      const expected = [
        111, 112,
        121,
        131, 132,
        211, 212, 213,
      ]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

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

      it(`throws when one of the inner items is not an iterable`, () => {
        const input = [
          [1, 2],
          3,
          [4, 5],
        ] as any
        const operation = () => [...j.pipe(input, j.flatten(1))]
        chai.assert.throws(operation)
      })

    })

  })

  describe(`intersectionUsing`, () => {

    it(`works`, () => {
      const actual = j.pipe(
        [1, 2, 3, 4, 5],
        j.intersectionUsing([4, 2, 5, 0, 10, 1], qqq),
      )
      const expected = [1, 2, 4, 5]
      chai.assert.sameOrderedMembers([...actual], [...expected])
    })

    it(`@example 1`, () => {
      const actual = j.pipe(
        [1, 2, 3, 4],
        j.intersectionUsing([1, 3, 5, 7], (t, u) => t == u),
      )
      const expected = [1, 3]
      chai.assert.sameOrderedMembers([...actual], [...expected])
    })

    it(`@example 2`, () => {
      const actual = j.pipe(
        'jupiterate',
        j.intersectionUsing('aeiou', (t, u) => t == u),
      )
      const expected = 'uieae'
      chai.assert.sameOrderedMembers([...actual], [...expected])
    })

    it(`@example 3`, () => {
      const actual = j.pipe(
        ['foo', 'bar', 'baz', 'qux', 'quux'],
        j.intersectionUsing(['a', 'b', 'c'], (t, u) => t.startsWith(u)),
      )
      const expected = ['bar', 'baz']
      chai.assert.sameOrderedMembers([...actual], [...expected])
    })

    it(`@example 4`, () => {
      const actual = j.pipe(
        ['a', 'aa', 'aaa', 'aaaa', 'b', 'bb', 'bbb', 'bbbb', 'c', 'cc', 'ccc', 'cccc'],
        j.intersectionUsing([1, 6, 11], (t, u) => t.length == u % 5),
      )
      const expected = ['a', 'b', 'c']
      chai.assert.sameOrderedMembers([...actual], [...expected])
    })

  })

  describe(`intersectionBy`, () => {

    it(`works`, () => {
      const t = <T> (t: T) => ({ t })
      const a = [1, 2, 3, 4, 5].map(t)
      const b = [4, 2, 5, 0, 10, 1].map(t)
      const actual = j.pipe(a, j.intersectionBy(b, ({ t }) => t))
      const expected = [1, 2, 4, 5].map(t)
      chai.assert.sameDeepOrderedMembers([...actual], expected)
    })

    it(`@example 1`, () => {
      const actual = j.pipe(
        [1, 2, 3, 4],
        j.intersectionBy([1, 3, 5, 7], t => t),
      )
      const expected = [1, 3]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 2`, () => {
      const actual = j.pipe(
        'jupiterate',
        j.intersectionBy('aeiou', t => t),
      )
      const expected = 'uieae'
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

  })

  describe(`intersection`, () => {

    it(`works`, () => {
      const a = [1, 2, 3, 4, 5]
      const b = [4, 2, 5, 0, 10, 1]
      const actual = j.pipe(a, j.intersection(b))
      const expected = [1, 2, 4, 5]
      chai.assert.sameDeepOrderedMembers([...actual], expected)
    })

    it(`@example 1`, () => {
      const actual = j.pipe(
        [1, 2, 3, 4],
        j.intersection([1, 3, 5, 7]),
      )
      const expected = [1, 3]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 2`, () => {
      const actual = j.pipe(
        'jupiterate',
        j.intersection('aeiou'),
      )
      const expected = 'uieae'
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

  })

  describe(`join`, () => {

    it(`@example 1`, () => {
      const actual = j.pipe(
        [1, 2, 3],
        j.join(0),
      )
      const expected = [1, 0, 2, 0, 3]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
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
        j.map((c, i) => i % 2 == 0 ? c.toLowerCase() : c.toUpperCase()),
      )
      const expected = 'jUpItErAtE'
      chai.assert.sameOrderedMembers([...actual], [...expected])
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

    it(`chooses “order not important” and “no repetition” when no options are given`, () => {
      const input = ['a', 'b', 'c', 'd']
      const expected = [
        ['a', 'b'],
        ['a', 'c'],
        ['a', 'd'],
        ['b', 'c'],
        ['b', 'd'],
        ['c', 'd'],
      ]
      const actual = j.pipe(input, j.pairs())
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

    it(`@example 1`, () => {
      const actual = j.pipe(
        [1, 2, 3, 4, 5],
        j.pairwise(),
      )
      const expected = [[1, 2], [2, 3], [3, 4], [4, 5]]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 2`, () => {
      const actual = j.pipe(
        [1],
        j.pairwise(),
      )
      const expected: number[][] = []
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 3`, () => {
      const actual = j.pipe(
        [],
        j.pairwise(),
      )
      const expected: number[][] = []
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
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

    it(`@example 1`, () => {
      const actual = j.pipe(
        [1, 2, 3, 4, 5],
        j.pairwiseCyclic(),
      )
      const expected = [[1, 2], [2, 3], [3, 4], [4, 5], [5, 1]]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 2`, () => {
      const actual = j.pipe(
        [1],
        j.pairwiseCyclic(),
      )
      const expected = [[1, 1]]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 3`, () => {
      const actual = j.pipe(
        [],
        j.pairwiseCyclic(),
      )
      const expected: unknown[][] = []
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

  })

  describe(`passThrough`, () => {

    it(`@example 1`, () => {
      const actual = j.pipe(
        [1, 2, 3],
        j.passThrough(),
      )
      const expected = [1, 2, 3]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

  })

  describe(`reverse`, () => {

    it(`returns an empty iterable given an empty iterable`, () => {
      const actual = j.pipe([], j.reverse())
      chai.assert.sameDeepOrderedMembers([...actual], [])
    })

    it(`@example 1`, () => {
      const actual = j.pipe(
        [1, 2, 3, 4],
        j.reverse(),
      )
      const expected = [4, 3, 2, 1]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 2`, () => {
      const actual = j.pipe(
        'live',
        j.reverse(),
      )
      const expected = 'evil'
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

  })

  describe(`scan`, () => {

    it(`@example 1`, () => {
      const actual = j.pipe(
        [1, 2, 3, 4],
        j.scan((a, b) => a + b),
      )
      const expected = [1, 3, 6, 10]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 2`, () => {
      const actual = j.pipe(
        [1, 2, 3, 4],
        j.scan((a, b) => a + b, 0),
      )
      const expected = [1, 3, 6, 10]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 3`, () => {
      const actual = j.pipe(
        [] as number[],
        j.scan((a, b) => a + b),
      )
      const expected = [] as number[]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 4`, () => {
      const actual = j.pipe(
        ['one', 'two', 'three'],
        j.scan((result, value) => result + value.length, 0),
      )
      const expected = [3, 6, 11]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`throws an error when trying to invoke with none or more than two arguments`, () => {
      chai.assert.throws(() => (j.scan as any)())
      chai.assert.throws(() => (j.scan as any)(1, 2, 3))
    })

  })

  describe(`segmentizeBy`, () => {

    it(`works`, () => {
      const input = [1, 2, 3, -4, -5, -6, -7, -8, 9, -10, NaN, NaN, 13]
      const actual = j.pipe(input, j.segmentizeBy(x => Math.sign(x)))
      const expected = [
        [1, 2, 3],
        [-4, -5, -6, -7, -8],
        [9],
        [-10],
        [NaN, NaN],
        [13],
      ]
      chai.assert.deepEqual([...actual], expected)
    })

    it(`@example 1`, () => {
      const actual = j.pipe(
        [1, 5, 3, -1, -2, 1, -4],
        j.segmentizeBy(n => Math.sign(n)),
      )
      const expected = [
        [1, 5, 3],
        [-1, -2],
        [1],
        [-4],
      ]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 2`, () => {
      const actual = j.pipe(
        ['foo', 'bar', 'Foo', 'bar', 'Bar'],
        j.segmentizeBy(n => n[0] == n[0].toUpperCase()),
      )
      const expected = [
        ['foo', 'bar'],
        ['Foo'],
        ['bar'],
        ['Bar'],
      ]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 3`, () => {
      const actual = j.pipe(
        [10, 20, 30, 40, 50, 60, 70, 80, 90],
        j.segmentizeBy((n, i) => Math.floor(i / 4)),
      )
      const expected = [
        [10, 20, 30, 40],
        [50, 60, 70, 80],
        [90],
      ]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`doesn't leave the last segment empty`, () => {
      const actual = j.pipe(
        [10, 20, 30, 40, 50, 60, 70, 80],
        j.segmentizeBy((n, i) => Math.floor(i / 4)),
      )
      const expected = [
        [10, 20, 30, 40],
        [50, 60, 70, 80],
      ]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`works with a single item`, () => {
      const actual = j.pipe(
        [1],
        j.segmentizeBy((n, i) => n),
      )
      const expected = [
        [1],
      ]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`works with no items`, () => {
      const actual = j.pipe(
        [],
        j.segmentizeBy(() => null),
      )
      const expected: never[] = []
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

  })

  describe(`segmentize`, () => {

    it(`@example 1`, () => {
      const actual = j.pipe(
        [1, 1, 2, 2, 2, 3],
        j.segmentize(),
      )
      const expected = [
        [1, 1],
        [2, 2, 2],
        [3],
      ]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

  })

  describe(`skip`, () => {

    it(`@example 1`, () => {
      const input = [1, 2, 3, 4]
      const actual = j.pipe(input, j.skip(2))
      const expected = [3, 4]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`@example 2`, () => {
      const input = [1, 2, 3, 4]
      const actual = j.pipe(input, j.skip(10))
      const expected: number[] = []
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

    it(`@example 1`, () => {
      const actual = j.pipe(
        [-4, -2, 1, 3, 8, -5, 1],
        j.skipUntil(v => v > 0),
      )
      const expected = [1, 3, 8, -5, 1]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 2`, () => {
      const actual = j.pipe(
        '    leading spaces',
        j.skipUntil(v => v != ' '),
      )
      const expected = 'leading spaces'
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

  })

  describe(`skipWhile`, () => {

    it(`should work`, () => {
      const input = [1, 2, 5, 3, 0, 6, 3, 2, 1]
      const actual = j.pipe(input, j.skipWhile(x => x > 0))
      const expected = [0, 6, 3, 2, 1]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`@example 1`, () => {
      const actual = j.pipe(
        [-4, -2, 1, 3, 8, -5, 1],
        j.skipWhile(v => v < 0),
      )
      const expected = [1, 3, 8, -5, 1]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 2`, () => {
      const actual = j.pipe(
        '    leading spaces',
        j.skipWhile(v => v == ' '),
      )
      const expected = 'leading spaces'
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

  })

  describe(`slice`, () => {

    it(`doesn't do anything without any arguments`, () => {
      const input = [1, 2, 3]
      const actual = j.pipe(input, j.slice())
      const expected = [1, 2, 3]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`slices from the start only`, () => {
      const input = 'abcdefgh'
      const actual = j.pipe(input, j.slice(2))
      const expected = 'cdefgh'.split('')
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`slices fom the start and end`, () => {
      const input = 'abcdefgh'
      const actual = j.pipe(input, j.slice(3, 5))
      const expected = ['d', 'e']
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`reports an error when an impossible start-end combination is given`, () => {
      const input = 'abc'
      const operation = () => [...j.pipe(input, j.slice(2, 1))]
      chai.assert.throws(operation)
    })

    it(`doesn't mind a start too little`, () => {
      const input = 'abcdefgh'
      const actual = j.pipe(input, j.slice(-666, 4))
      const expected = 'abcd'
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`doesn't mind an end too great`, () => {
      const input = 'abcdefgh'
      const actual = j.pipe(input, j.slice(3, 666))
      const expected = 'defgh'
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 1`, () => {
      const actual = j.pipe(
        [0, 1, 2, 3, 4, 5],
        j.slice(1, 4),
      )
      const expected = [1, 2, 3]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 2`, () => {
      const actual = j.pipe(
        [0, 1, 2, 3, 4, 5],
        j.slice(2, 2),
      )
      const expected: number[] = []
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

  })

  describe(`sortUsing`, () => {

    it(`@example 1`, () => {
      const input = [5, 2, 6, 3, 1, 6]
      const actual = j.pipe(input, j.sortUsing((a, b) => a - b))
      const expected = [1, 2, 3, 5, 6, 6]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 2`, () => {
      const input = [
        { name: 'foo-1', age: 19 },
        { name: 'bar', age: 21 },
        { name: 'foo-2', age: 19 },
        { name: 'baz', age: 18 },
      ]
      const actual = j.pipe(input, j.sortUsing((a, b) => b.age - a.age))
      const expected = [
        { name: 'bar', age: 21 },
        { name: 'foo-1', age: 19 },
        { name: 'foo-2', age: 19 },
        { name: 'baz', age: 18 },
      ]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

  })

  describe(`sortBy`, () => {

    it(`works with a function`, () => {
      const input = [{ x: 1, y: 2 }, { x: 5, y: 3 }, { x: 2, y: 1 }]
      const actual = j.pipe(input, j.sortBy(item => item.x, 'desc'))
      const expected = [{ x: 5, y: 3 }, { x: 2, y: 1 }, { x: 1, y: 2 }]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`works with a prop`, () => {
      const input = [{ x: 1, y: 2 }, { x: 5, y: 3 }, { x: 2, y: 1 }]
      const actual = j.pipe(input, j.sortBy('y', 'asc'))
      const expected = [{ x: 2, y: 1 }, { x: 1, y: 2 }, { x: 5, y: 3 }]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 1`, () => {
      const input = [5, 2, 6, 3, 1, 6]
      const actual = j.pipe(input, j.sortBy(t => t, 'asc'))
      const expected = [1, 2, 3, 5, 6, 6]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 2`, () => {
      const input = [
        { name: 'foo-1', age: 19 },
        { name: 'bar', age: 21 },
        { name: 'foo-2', age: 19 },
        { name: 'baz', age: 18 },
      ]
      const actual = j.pipe(input, j.sortBy(t => t.age, 'desc'))
      const expected = [
        { name: 'bar', age: 21 },
        { name: 'foo-1', age: 19 },
        { name: 'foo-2', age: 19 },
        { name: 'baz', age: 18 },
      ]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

  })

  describe(`sort`, () => {

    it(`works for ascending order`, () => {
      const input = [1, 3, 2, 5, 4]
      const actual = j.pipe(input, j.sort('asc'))
      const expected = [1, 2, 3, 4, 5]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`works for descending order`, () => {
      const input = [1, 3, 2, 5, 4]
      const actual = j.pipe(input, j.sort('desc'))
      const expected = [5, 4, 3, 2, 1]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`@example 1`, () => {
      const input = [5, 2, 6, 3, 1, 6]
      const actual = j.pipe(input, j.sort('asc'))
      const expected = [1, 2, 3, 5, 6, 6]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

  })

  describe(`startWith`, () => {

    it(`@example 1`, () => {
      const actual = j.pipe(
        [1, 2, 3, 4],
        j.startWith(0),
      )
      const expected = [0, 1, 2, 3, 4]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 2`, () => {
      const actual = j.pipe(
        [6, 8, 10],
        j.startWith(2, 4),
      )
      const expected = [2, 4, 6, 8, 10]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
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

    it(`throws if you try to take a negative number of items`, () => {
      chai.assert.throws(() => j.takeFirst(-2))
    })

    it(`throws if you try to take half an item`, () => {
      chai.assert.throws(() => j.takeFirst(0.5))
    })

    it(`@example 1`, () => {
      const actual = j.pipe(
        'jupiterate',
        j.takeFirst(7),
      )
      const expected = 'jupiter'
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
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

    it(`@example 1`, () => {
      const actual = j.pipe(
        [1, 2, 3, 4],
        j.takeWhile(x => x < 3),
      )
      const expected = [1, 2]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

  })

  describe(`takeUntil`, () => {

    it(`works`, () => {
      const input = [1, 2, 3, 2, 3, 2, 1]
      const actual = j.pipe(input, j.takeUntil(x => x == 3))
      chai.assert.sameOrderedMembers([...actual], [1, 2])
    })

    it(`@example 1`, () => {
      const actual = j.pipe(
        [1, 2, 3, 4],
        j.takeUntil(x => x >= 3),
      )
      const expected = [1, 2]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

  })

  describe(`flatten`, () => {

    it(`works without argument`, () => {
      const input: any = [[1, 2], [5], [6, 7, [8, 9]]]
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
      const expected = j.Integers(1, 10)
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

  })

  describe(`flattenDeep`, () => {

    it(`works`, () => {
      const input = [1, [2, 3, [4, 5, [6, 7, [8]]], 9]]
      const actual = j.pipe(input, j.flattenDeep())
      const expected = j.Integers(1, 10)
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

  })

  describe(`uniqueBy`, () => {

    it(`works`, () => {
      const input = [
        { a: 1, b: 1 },
        { a: 1, b: 2 },
        { a: 1, b: 3 },
        { a: 2, b: 1 },
        { a: 2, b: 2 },
        { a: 2, b: 3 },
      ]
      const actual = j.pipe(input, j.uniqueBy(t => t.a + t.b))
      const expected = [
        { a: 1, b: 1 },
        { a: 1, b: 2 },
        { a: 1, b: 3 },
        { a: 2, b: 3 },
      ]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 1`, () => {
      const actual = j.pipe(
        [2, 0, 2, 3],
        j.uniqueBy(t => t % 2),
      )
      const expected = [2, 3]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

  })

  describe(`unique`, () => {

    it(`works`, () => {
      const input = [1, 3, 6, 4, 5, 3, 3, 2, 2, 9, 1, 1, 3]
      const actual = j.pipe(input, j.unique())
      const expected = [1, 3, 6, 4, 5, 2, 9]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`@example 1`, () => {
      const actual = j.pipe(
        [2, 0, 2, 3],
        j.unique(),
      )
      const expected = [2, 0, 3]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

  })

  describe(`zip`, () => {

    it(`works with iterables of same item count`, () => {
      const input = [1, 2, 3]
      const iterables = [
        ['a', 'b', 'c'],
        [10, 20, 30],
        [true, false, true],
      ] as const
      const actual = j.pipe(input, j.zip(...iterables))
      const expected = [
        [1, 'a', 10, true],
        [2, 'b', 20, false],
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
        [true, false, true],
      ] as const
      const actual = j.pipe(input, j.zipStrict(...iterables))
      const expected = [
        [1, 'a', 10, true],
        [2, 'b', 20, false],
        [3, 'c', 30, true],
      ]
      chai.assert.deepEqual([...actual], [...expected])
    })

    it(`throws with iterables of different item count (source is not the shortest)`, () => {
      const input = [1, 2, 3, 4]
      const iterables = [
        ['a', 'b', 'c', 'd', 'e', 'f'],
        [10, 20, 30],
        [true],
      ] as const
      const getActual = () => [...j.pipe(input, j.zipStrict(...iterables))]
      chai.assert.throws(getActual)
    })

    it(`throws with iterables of different item count (first is shortest)`, () => {
      const input = [1, 2, 3, 4]
      const iterables = [
        ['a', 'b', 'c', 'd', 'e', 'f'],
        [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        [true, false, true, true, false, false, false, true, true, true, true, true],
      ] as const
      const getActual = () => [...j.pipe(input, j.zipStrict(...iterables))]
      chai.assert.throws(getActual)
    })

  })

  describe(`tap`, () => {

    it(`iterates over every item in the iterator and returns the same items`, () => {
      const input = [1, 'a', true]
      const collected: Array<{ element: unknown, index: number }> = []
      const actual = j.pipe(input, j.tap((element, index) => {
        collected.push({ element, index })
      }))
      const expected = [...input]
      const expectedCollection: Array<{ element: unknown, index: number }> = [
        { element: 1, index: 0 },
        { element: 'a', index: 1 },
        { element: true, index: 2 },
      ]
      chai.assert.deepEqual([...actual], expected)
      chai.assert.deepEqual(collected, expectedCollection)
    })

  })

})
