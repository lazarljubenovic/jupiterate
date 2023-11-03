import * as chai from 'chai'
import * as j from '../src'


const isNumber = (x: unknown): x is number => typeof x == 'number'

describe(`Static`, () => {

  describe(`Concat`, () => {

    it(`concatenates several empty iterables`, () => {
      const actual = j.Concat([], [], [], [])
      const expected = [] as unknown[]
      chai.assert.sameOrderedMembers([...actual], [...expected])
    })

    it(`concatenates several iterables`, () => {
      const actual = j.Concat([1, 2, 3], [4, 5], [6], [], [7], [8, 9])
      const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      chai.assert.sameOrderedMembers([...actual], [...expected])
    })

    it(`returns an empty iterable when no iterables are given`, () => {
      const actual = j.Concat()
      const expected = [] as unknown[]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`@example 1`, () => {
      const actual = j.Concat([1, 2, 3], [4, 5, 6], [7, 8, 9])
      const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 2`, () => {
      const actual = j.Concat([1], [2, 3], [], [], [4])
      const expected = [1, 2, 3, 4]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 3`, () => {
      const actual = j.Concat()
      const expected: unknown[] = []
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

  })

  describe(`Contains`, () => {

    it(`returns true when an element exists, no comparison given`, () => {
      const input = [1, 2, 3, 4]
      const actual = j.Contains(input, 2)
      chai.assert.isTrue(actual)
    })

    it(`returns false when no element exists, no comparison given`, () => {
      const input = [1, 2, 3, 4]
      const actual = j.Contains(input, 6)
      chai.assert.isFalse(actual)
    })

    it(`@example 1`, () => {
      const actual = j.Contains([1, 2, 3, 4], 2)
      chai.assert.isTrue(actual)
    })

    it(`@example 2`, () => {
      const actual = j.Contains([1, 2, 3, 4], 6)
      chai.assert.isFalse(actual)
    })

    it(`@example 3`, () => {
      const input = [
        { id: 1, name: 'foo' },
        { id: 2, name: 'bar' },
      ]
      const actual = j.Contains(input, { id: 1 }, (a, b) => a.id == b.id)
      chai.assert.isTrue(actual)
    })

    it(`@example 4`, () => {
      const actual = j.pipe(
        [1, 2, 3, 4],
        j.andFinally(j.Contains, 2),
      )
      chai.assert.isTrue(actual)
    })

  })

  describe(`Count`, () => {

    it(`@example 1`, () => {
      const actual = j.Count([1, 2, 3])
      const expected = 3
      chai.assert.equal(actual, expected)
    })

    it(`@example 2`, () => {
      const actual = j.Count([])
      const expected = 0
      chai.assert.equal(actual, expected)
    })

    it(`@example 3`, () => {
      const actual = j.Count([1, 2, 3, 4], a => a % 2 == 0)
      const expected = 2
      chai.assert.equal(actual, expected)
    })

  })

  describe(`CreateString`, () => {

    it(`@example 1`, () => {
      const actual = j.CreateString(['a', 'b', 'c'])
      const expected = 'abc'
      chai.assert.equal(actual, expected)
    })

  })

  describe(`Every`, () => {

    it(`returns true when every item satisfies the given condition`, () => {
      const input = [1, 2, 3]
      const visited: number[] = []
      const predicate = (x: any) => {
        visited.push(x)
        return x > 0
      }
      const actual = j.Every(input, predicate)
      chai.assert.isTrue(actual)
      chai.assert.sameOrderedMembers(visited, [1, 2, 3], `Visited [${visited.join(', ')}] instead of [1, 2, 3].`)
    })

    it(`returns false when at least one item doesn't satisfy the given condition`, () => {
      const input = [0, 1, 2, 3]
      const visited: number[] = []
      const predicate = (x: any) => {
        visited.push(x)
        return x % 2 == 0
      }
      const actual = j.Every(input, predicate)
      chai.assert.isFalse(actual)
      chai.assert.sameOrderedMembers(visited, [0, 1], `Visited [${visited.join(', ')}] instead of [0, 1].`)
    })

    it(`@example 1`, () => {
      const actual = j.Every([1, 2, 3, 4], x => x > 0)
      chai.assert.isTrue(actual)
    })

    it(`@example 2`, () => {
      const actual = j.Every([1, 2, 3, 4], x => x % 2 == 0)
      chai.assert.isFalse(actual)
    })

    it(`@example 3`, () => {
      const actual = j.pipe(
        [1, 2, 3, 4],
        j.andFinally(j.Every, x => x > 0),
      )
      chai.assert.isTrue(actual)
    })

  })

  describe(`Just`, () => {

    it(`creates an iterable from a single value`, () => {
      const actual = j.Just(21)
      const expected = [21]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

  })

  describe(`Size`, () => {

    it(`works`, () => {
      const actual = j.Size([1, 2, 3])
      const expected = 3
      chai.assert.equal(actual, expected)
    })

  })

  describe(`Union`, () => {

    it(`returns an empty iterator when none is given`, () => {
      const actual = j.Union()
      const expected = [] as unknown[]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`returns an empty iterator when an empty one is given`, () => {
      const actual = j.Union([])
      const expected = [] as unknown[]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`returns an empty iterator when several empty ones are given`, () => {
      const actual = j.Union([], [], [])
      const expected = [] as unknown[]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`returns the same iterator when only one is given`, () => {
      const actual = j.Union([1, 2, 3])
      const expected = [1, 2, 3]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`removes duplicates from two non-disjunct iterators`, () => {
      const actual = j.Union([1, 2, 3], [2, 3, 4])
      const expected = [1, 2, 3, 4]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

  })

  describe(`Intersection`, () => {

    it(`returns an empty iterator when no arguments are given`, () => {
      const actual = j.Intersection()
      const expected = [] as unknown[]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`returns the same iterator when given only one argument`, () => {
      const actual = j.Intersection([1, 2, 3])
      const expected = [1, 2, 3]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`returns the intersection of two iterables`, () => {
      const actual = j.Intersection([0, 5, 10, 15, 20], [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20])
      const expected = [0, 10, 20]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`returns the intersection of three iterables`, () => {
      const actual = j.Intersection([1, 2, 3, 4, 5], [2, 3, 4, 5, 6], [3, 4, 5, 6, 7])
      const expected = [3, 4, 5]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

  })

  describe(`Integers`, () => {

    it(`@example 1`, () => {
      const actual = j.pipe(
        j.Integers(),
        j.takeFirst(4),
      )
      const expected = [0, 1, 2, 3]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 2`, () => {
      const actual = j.pipe(
        j.Integers(3),
        j.takeFirst(4),
      )
      const expected = [3, 4, 5, 6]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 3`, () => {
      const actual = j.Integers(5, 8)
      const expected = [5, 6, 7]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

  })

  describe(`GetSingleOrThrow`, () => {

    it(`works when iterable has a single item`, () => {
      const actual = j.GetSingleOrThrow([1])
      chai.assert.equal(actual, 1)
    })

    it(`throws when iterable has no items`, () => {
      const fn = () => {
        j.GetSingleOrThrow([])
      }
      chai.assert.throws(fn, `Expected exactly one item, but got zero.`)
    })

    it(`throws when iterable has more than one item`, () => {
      const fn = () => {
        j.GetSingleOrThrow([1, 2])
      }
      chai.assert.throws(fn, `Expected only one item, but found more than one.`)
    })

  })

  describe(`Find`, () => {

    it(`finds the first matching item`, () => {
      const input = [4, 6, -1, 4]
      const actual = j.Find(input, x => x < 0)
      const expected = -1
      chai.assert.equal(actual, expected)
    })

    it(`returns undefined when no matching item is found`, () => {
      const input = [4, 6, 2, 1]
      const actual = j.Find(input, x => x > 100)
      chai.assert.isUndefined(actual)
    })

  })

  describe(`FindOrThrow`, () => {

    it(`returns the value of the first matching item`, () => {
      const input = ['a', 'b', 'c', 'c', 'd']
      const actual = j.FindOrThrow(input, x => x == 'c')
      const expected = 'c'
      chai.assert.equal(actual, expected)
    })

    it(`throws if no matching item is found`, () => {
      const input = ['a', 'b', 'c']
      const operation = () => j.FindOrThrow(input, x => x == 'g')
      chai.assert.throws(operation)
    })

  })

  describe(`FindLast`, () => {

    it(`returns the value of the last matching item`, () => {
      const input = ['a', 'b', 'c1', 'c2', 'd']
      const actual = j.FindLast(input, x => x.startsWith('c'))
      const expected = 'c2'
      chai.assert.equal(actual, expected)
    })

    it(`returns undefined when no matching item is found`, () => {
      const input = ['a', 'b', 'c']
      const actual = j.FindLast(input, x => x == 'g')
      const expected = undefined
      chai.assert.equal(actual, expected)
    })

  })

  describe(`FindLastOrThrow`, () => {

    it(`returns the value of the last matching item`, () => {
      const input = ['a', 'b', 'c1', 'c2', 'd']
      const actual = j.FindLastOrThrow(input, x => x.startsWith('c'))
      const expected = 'c2'
      chai.assert.equal(actual, expected)
    })

    it(`throws when no matching item is found`, () => {
      const input = ['a', 'b', 'c']
      const operation = () => j.FindLastOrThrow(input, x => x == 'g')
      chai.assert.throws(operation)
    })

  })

  describe(`FindIndex`, () => {

    it(`returns the index of the first matching item`, () => {
      const input = ['a', 'b', 'c', 'c', 'd']
      const actual = j.FindIndex(input, x => x == 'c')
      const expected = 2
      chai.assert.equal(actual, expected)
    })

    it(`returns -1 when no matching item is found`, () => {
      const input = ['a', 'b', 'c']
      const actual = j.FindIndex(input, x => x == 'g')
      const expected = -1
      chai.assert.equal(actual, expected)
    })

  })

  describe(`FindIndexOrThrow`, () => {

    it(`returns the index of the first matching item`, () => {
      const input = ['a', 'b', 'c', 'c', 'd']
      const actual = j.FindIndexOrThrow(input, x => x == 'c')
      const expected = 2
      chai.assert.equal(actual, expected)
    })

    it(`returns -1 when no matching item is found`, () => {
      const input = ['a', 'b', 'c']
      const operation = () => j.FindIndexOrThrow(input, x => x == 'g')
      chai.assert.throws(operation)
    })

  })

  describe(`FindLastIndex`, () => {

    it(`returns the index of the last matching item`, () => {
      const input = ['a', 'b', 'c', 'c', 'd']
      const actual = j.FindLastIndex(input, x => x == 'c')
      const expected = 3
      chai.assert.equal(actual, expected)
    })

    it(`returns -1 when no matching item is found`, () => {
      const input = ['a', 'b', 'c']
      const actual = j.FindLastIndex(input, x => x == 'g')
      const expected = -1
      chai.assert.equal(actual, expected)
    })

  })

  describe(`FindLastIndexOrThrow`, () => {

    it(`returns the index of the last matching item`, () => {
      const input = ['a', 'b', 'c1', 'c2', 'd']
      const actual = j.FindLastIndexOrThrow(input, x => x.startsWith('c'))
      const expected = 3
      chai.assert.equal(actual, expected)
    })

    it(`throws when no matching item is found`, () => {
      const input = ['a', 'b', 'c']
      const operation = () => j.FindLastIndexOrThrow(input, x => x == 'g')
      chai.assert.throws(operation)
    })

  })

  describe(`FindWithIndex`, () => {

    it(`returns the value and index of the first matching item`, () => {
      const input = ['a', 'b', 'c1', 'c2', 'd']
      const actual = j.FindWithIndex(input, x => x.startsWith('c'))
      const expected = { value: 'c1', index: 2 }
      chai.assert.deepEqual(actual, expected)
    })

    it(`returns null when no matching item is found`, () => {
      const input = ['a', 'b', 'c']
      const actual = j.FindWithIndex(input, x => x == 'g')
      const expected = null
      chai.assert.deepEqual(actual, expected)
    })

  })

  describe(`FindWithIndexOrThrow`, () => {

    it(`returns the value and index of the first matching item`, () => {
      const input = ['a', 'b', 'c1', 'c2', 'd']
      const actual = j.FindWithIndexOrThrow(input, x => x.startsWith('c'))
      const expected = { value: 'c1', index: 2 }
      chai.assert.deepEqual(actual, expected)
    })

    it(`returns -1 when no matching item is found`, () => {
      const input = ['a', 'b', 'c']
      const operation = () => j.FindWithIndexOrThrow(input, x => x == 'g')
      chai.assert.throws(operation)
    })

  })

  describe(`FindLastWithIndex`, () => {

    it(`returns the value and index of the last matching item`, () => {
      const input = ['a', 'b', 'c1', 'c2', 'd']
      const actual = j.FindLastWithIndex(input, x => x.startsWith('c'))
      const expected = { value: 'c2', index: 3 }
      chai.assert.deepEqual(actual, expected)
    })

    it(`returns null when no matching item is found`, () => {
      const input = ['a', 'b', 'c']
      const actual = j.FindLastWithIndex(input, x => x == 'g')
      const expected = null
      chai.assert.deepEqual(actual, expected)
    })

  })

  describe(`FindLastWithIndexOrThrow`, () => {

    it(`returns the index of the last matching item`, () => {
      const input = ['a', 'b', 'c1', 'c2', 'd']
      const actual = j.FindLastWithIndexOrThrow(input, x => x.startsWith('c'))
      const expected = { value: 'c2', index: 3 }
      chai.assert.deepEqual(actual, expected)
    })

    it(`throws when no matching item is found`, () => {
      const input = ['a', 'b', 'c']
      const operation = () => j.FindLastWithIndexOrThrow(input, x => x == 'g')
      chai.assert.throws(operation)
    })

  })

  describe(`ForEach`, () => {

    it(`iterates over every item in the iterator`, () => {
      const input = [1, 'a', true]
      const collected: Array<{ element: unknown, index: number }> = []
      j.ForEach(input, (element, index) => {
        collected.push({ element, index })
      })
      const expected: Array<{ element: unknown, index: number }> = [
        { element: 1, index: 0 },
        { element: 'a', index: 1 },
        { element: true, index: 2 },
      ]
      chai.assert.deepEqual(collected, expected)
    })

  })

  describe(`GetSingleOrThrow`, () => {

    it(`gets the only item in the iterable`, () => {
      const input = ['a']
      const actual = j.GetSingleOrThrow(input)
      const expected = 'a'
      chai.assert.equal(actual, expected)
    })

    it(`throws when the iterable is empty`, () => {
      const input = [] as any[]
      const operation = () => j.GetSingleOrThrow(input)
      chai.assert.throws(operation)
    })

    it(`throws when the iterable has more than one item`, () => {
      const input = ['a', 'b', 'c']
      const operation = () => j.GetSingleOrThrow(input)
      chai.assert.throws(operation)
    })

  })

  describe(`First`, () => {

    it(`returns the first item`, () => {
      const input = [1, 2, 3]
      const actual = j.First(input)
      const expected = 1
      chai.assert.equal(actual, expected)
    })

    it(`returns undefined when empty iterable`, () => {
      const input = [] as unknown[]
      const actual = j.First(input)
      chai.assert.isUndefined(actual)
    })

  })

  describe(`FirstOrThrow`, () => {

    it(`returns the first item`, () => {
      const input = [1, 2, 3]
      const actual = j.FirstOrThrow(input)
      const expected = 1
      chai.assert.equal(actual, expected)
    })

    it(`returns undefined when empty iterable`, () => {
      const input = [] as unknown[]
      const operation = () => j.FirstOrThrow(input)
      chai.assert.throws(operation)
    })

  })

  describe(`Last`, () => {

    it(`returns the last item of the iterable`, () => {
      const input = [1, 2, 3]
      const actual = j.Last(input)
      const expected = 3
      chai.assert.equal(actual, expected)
    })

    it(`returns undefined if the iterable doesn't yield anything`, () => {
      const input: number[] = []
      const actual = j.Last(input)
      chai.assert.isUndefined(actual)
    })

  })

  describe(`Min`, () => {

    it(`returns the smallest number`, () => {
      const input = [2, 1, 0, 3]
      const actual = j.Min(input)
      const expected = 0
      chai.assert.equal(actual, expected)
    })

    it(`throws on attempt to find min of an empty iterable`, () => {
      const operation = () => j.Min([])
      chai.assert.throws(operation)
    })

  })

  describe(`Max`, () => {

    it(`returns the largest number`, () => {
      const input = [2, 1, 0, 3]
      const actual = j.Max(input)
      const expected = 3
      chai.assert.equal(actual, expected)
    })

    it(`throws on attempt to find max of an empty iterable`, () => {
      const operation = () => j.Max([])
      chai.assert.throws(operation)
    })

  })

  describe(`MinBy`, () => {

    it(`returns the element with the smallest value of the given function`, () => {
      const input = ['Q', 'W', 'E', 'R', 'T', 'Y']
      const actual = j.MinBy(input, char => char.charCodeAt(0))
      const expected = 'E'
      chai.assert.equal(actual, expected)
    })

    it(`throws on attempt to find min of an empty iterable`, () => {
      const operation = () => j.MinBy([], v => v)
      chai.assert.throws(operation)
    })

    it(`@example 1`, () => {
      const actual = j.MinBy([2, 3, 9, 6], x => Math.abs(5 - x))
      chai.assert.equal(actual, 6)
    })

  })

  describe(`MaxBy`, () => {

    it(`returns the element with the largest value of the given function`, () => {
      const input = ['Q', 'W', 'E', 'R', 'T', 'Y']
      const actual = j.MaxBy(input, char => char.charCodeAt(0))
      const expected = 'Y'
      chai.assert.equal(actual, expected)
    })

    it(`throws on attempt to find max of an empty iterable`, () => {
      const operation = () => j.MaxBy([], v => v)
      chai.assert.throws(operation)
    })

  })

  describe(`Nth`, () => {

    it(`returns the nth item of the iterable`, () => {
      const input = ['a', 'b', 'c', 'd']
      const actual = j.Nth(input, 2)
      const expected = 'c'
      chai.assert.equal(actual, expected)
    })

    it(`returns undefined when the iterable doesn't have that many items`, () => {
      const input = ['a', 'b', 'c']
      const actual = j.Nth(input, 99)
      chai.assert.isUndefined(actual)
    })

  })

  describe(`Partition`, () => {

    it(`returns two iterables`, () => {
      const input = [1, 2, 3, 'a', 4, 'b', 5, 'c']
      const [left, right] = j.Partition(input, isNumber) // TODO: test types
      chai.assert.sameOrderedMembers([...left], [1, 2, 3, 4, 5])
      chai.assert.sameOrderedMembers([...right], ['a', 'b', 'c'])
    })

  })

  describe(`Size`, () => {

    it(`returns 0 for an empty iterable`, () => {
      const input = [] as unknown[]
      const actual = j.Size(input)
      const expected = 0
      chai.assert.equal(actual, expected)
    })

    it(`counts the elements`, () => {
      const input = [true, false, true, true]
      const actual = j.Size(input)
      const expected = 4
      chai.assert.equal(actual, expected)
    })

  })

  describe(`Sum`, () => {

    it(`returns zero for an empty iterator`, () => {
      const input = [] as number[]
      const actual = j.Sum(input)
      const expected = 0
      chai.assert.equal(actual, expected)
    })

    it(`returns the sum of all yielded values`, () => {
      const input = [2, 1, 0, 3]
      const actual = j.Sum(input)
      const expected = 6
      chai.assert.equal(actual, expected)
    })

  })

  describe(`Some`, () => {

    it(`returns true when at least one item satisfies the given condition`, () => {
      const input = [1, 2, 3, 4]
      const actual = j.Some(input, x => x % 2 == 0)
      chai.assert.isTrue(actual)
    })

    it(`returns false when no item satisfies the given condition`, () => {
      const input = [1, 2, 3]
      const actual = j.Some(input, x => x > 10)
      chai.assert.isFalse(actual)
    })

  })

  describe(`CreateArray`, () => {

    it(`creates an empty array from an empty iterable`, () => {
      const input = [] as unknown[]
      const actual = j.CreateArray(input)
      chai.assert.isArray(actual)
      chai.assert.lengthOf(actual, 0)
    })

    it(`creates an array`, () => {
      const input = [1, 2, 3]
      const actual = j.CreateArray(input)
      chai.assert.isArray(actual)
      chai.assert.sameOrderedMembers(actual, [1, 2, 3])
    })

  })

  describe(`CreateSet`, () => {

    it(`creates an empty set from an empty iterable`, () => {
      const input = [] as unknown[]
      const actual = j.CreateSet(input)
      chai.assert.instanceOf(actual, Set)
      chai.assert.equal(actual.size, 0)
    })

    it(`creates a set`, () => {
      const input = [1, 2, 3]
      const actual = j.CreateSet(input)
      chai.assert.instanceOf(actual, Set)
      chai.assert.deepEqual([...actual], [1, 2, 3])
    })

    it(`doesn't mind duplicates in the array`, () => {
      const input = [1, 1, 1]
      const actual = j.CreateSet(input)
      chai.assert.instanceOf(actual, Set)
      chai.assert.deepEqual([...actual], [1])
    })

  })

  describe(`CreateMap`, () => {

    it(`creates an empty map from an empty iterable`, () => {
      const input = [] as ReadonlyArray<[unknown, unknown]>
      const actual = j.CreateMap(input)
      chai.assert.instanceOf(actual, Map)
      chai.assert.equal(actual.size, 0)
    })

    it(`creates a map`, () => {
      const input: ReadonlyArray<readonly [string, number]> = [
        ['a', 1],
        ['b', 2],
      ]
      const actual = j.CreateMap(input)
      chai.assert.instanceOf(actual, Map)
      chai.assert.deepEqual([...actual], [['a', 1], ['b', 2]])
    })

  })

  describe(`CreateObject`, () => {

    it(`creates an empty object`, () => {
      const input: Array<readonly [string, unknown]> = []
      const actual = j.CreateObject(input)
      const expected = {}
      chai.assert.deepEqual(actual, expected)
    })

    it(`creates an object`, () => {
      const input: Array<readonly [string, number]> = [['a', 1], ['b', 2]]
      const actual = j.CreateObject(input)
      const expected = { a: 1, b: 2 }
      chai.assert.deepEqual(actual, expected)
    })

  })

  describe(`JoinWith`, () => {

    it(`returns an empty iterable for no input`, () => {
      const actual = j.JoinWith(0, [] as number[])
      const expected = [] as unknown[]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`returns the single item for a one-value iterable`, () => {
      const actual = j.JoinWith(0, [1])
      const expected = [1]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`returns the joiner between each item`, () => {
      const actual = j.JoinWith(0, [1, 2, 3])
      const expected = [1, 0, 2, 0, 3]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

  })

  describe(`WithoutLast`, () => {

    it(`returns an empty iterable for no input`, () => {
      const actual = j.WithoutLast([])
      const expected = [] as unknown[]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`returns an empty iterable for a one-value iterable`, () => {
      const actual = j.WithoutLast([0])
      const expected = [] as unknown[]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`returns all but the last item`, () => {
      const actual = j.WithoutLast([1, 2, 3, 4])
      const expected = [1, 2, 3]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

  })

  describe(`Reduce`, () => {

    it(`sums up an array of numbers`, () => {
      const actual = j.Reduce([1, 2, 3, 4], (sum, value) => sum + value)
      const expected = 10
      chai.assert.equal(actual, expected)
    })

    it(`acknowledges the seed`, () => {
      const actual = j.Reduce([1], (sum, value) => sum + value, 999)
      const expected = 1000
      chai.assert.equal(actual, expected)
    })

    it(`throws when it tries reducing an empty iterable without a given seed`, () => {
      let input = [] as number[]
      const operation = () => j.Reduce(input, (sum, value) => sum + value)
      chai.assert.throws(operation)
    })

    it(`simply returns the seed when the iterable is empty`, () => {
      const actual = j.Reduce([], (sum, value) => sum + value, 2103)
      const expected = 2103
      chai.assert.equal(actual, expected)
    })

    it(`passes in the correct index when seed is given`, () => {
      const indexes = [] as number[]
      j.Reduce([100, 101, 102], (sum, value, index) => {
        indexes.push(index)
        return sum + value
      }, 0)
      const expected = [0, 1, 2]
      chai.assert.sameOrderedMembers(indexes, expected)
    })

    it(`passes in the correct index when seed is not given`, () => {
      const indexes = [] as number[]
      j.Reduce([100, 101, 102], (sum, value, index) => {
        indexes.push(index)
        return sum + value
      })
      const expected = [1, 2]
      chai.assert.sameOrderedMembers(indexes, expected)
    })

    it(`throws an error when trying to invoke with less than two or more than three arguments`, () => {
      chai.assert.throws(() => (j.Reduce as any)(1))
      chai.assert.throws(() => (j.Reduce as any)(1, 2, 3, 4))
    })

  })

  describe(`Unfold`, () => {

    it(`@example 1`, () => {
      const actual = j.pipe(
        j.Unfold(1, x => 2 * x),
        j.takeFirst(6),
      )
      const expected = [1, 2, 4, 8, 16, 32]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

    it(`@example 2`, () => {
      const actual = j.pipe(
        j.Unfold(1, 1, (a, b) => a + b),
        j.takeFirst(8),
      )
      const expected = [1, 1, 2, 3, 5, 8, 13, 21]
      chai.assert.sameDeepOrderedMembers([...actual], [...expected])
    })

  })

  describe(`Zip`, () => {

    it(`works with iterables with same item count`, () => {
      const iterables = [
        [1, 2, 3],
        ['a', 'b', 'c'],
        [true, false, true],
      ]
      const actual = j.Zip(...iterables)
      const expected = [
        [1, 'a', true],
        [2, 'b', false],
        [3, 'c', true],
      ]
      chai.assert.deepEqual([...actual], expected)
    })

    it(`works with iterables with different item count`, () => {
      const iterables = [
        [1, 2, 3, 4, 5, 6],
        ['a', 'b'],
        [true, false, true, true, false, false, false],
      ]
      const actual = j.Zip(...iterables)
      const expected = [
        [1, 'a', true],
        [2, 'b', false],
        [3, undefined, true],
        [4, undefined, true],
        [5, undefined, false],
        [6, undefined, false],
        [undefined, undefined, false],
      ]
      chai.assert.deepEqual([...actual], expected)
    })

  })

  describe(`ZipStrict`, () => {

    it(`works with iterables with same item count`, () => {
      const iterables = [
        [1, 2, 3],
        ['a', 'b', 'c'],
        [true, false, true],
      ]
      const actual = j.ZipStrict(...iterables)
      const expected = [
        [1, 'a', true],
        [2, 'b', false],
        [3, 'c', true],
      ]
      chai.assert.deepEqual([...actual], expected)
    })

    it(`throws with iterables with different item count`, () => {
      const iterables = [
        [1, 2, 3, 4, 5, 6],
        ['a', 'b'],
        [true, false, true, true, false, false, false],
      ] as const
      const getActual = () => [...j.ZipStrict(...iterables)]
      chai.assert.throws(getActual)
    })

  })

})

