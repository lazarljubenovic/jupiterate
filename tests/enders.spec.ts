import * as chai from 'chai'
import * as j from '../src'


const isNumber = (x: unknown): x is number => typeof x == 'number'

describe(`Enders`, () => {

  describe(`contains`, () => {

    it(`returns true when an element exists, no comparison given`, () => {
      const input = [1, 2, 3, 4]
      const actual = j.pipe(input, j.e.contains(2))
      chai.assert.isTrue(actual)
    })

    it(`returns false when no element exists, no comparison given`, () => {
      const input = [1, 2, 3, 4]
      const actual = j.pipe(input, j.e.contains(6))
      chai.assert.isFalse(actual)
    })

    it(`returns true when an element exists, using the comparator`, () => {
      const input = [
        { id: 1, name: 'foo' },
        { id: 2, name: 'bar' },
      ]
      const actual = j.pipe(input, j.e.contains({ id: 1 }, (a, b) => a.id == b.id))
      chai.assert.isTrue(actual)
    })

  })

  describe(`every`, () => {

    it(`returns true when every item satisfies the given condition`, () => {
      const input = [1, 2, 3]
      const visited: number[] = []
      const actual = j.pipe(input, j.e.every(x => {
        visited.push(x)
        return x > 0
      }))
      chai.assert.isTrue(actual)
      chai.assert.sameOrderedMembers(visited, [1, 2, 3], `Visited [${visited.join(', ')}] instead of [1, 2, 3].`)
    })

    it(`returns false when at least one item doesn't satisfy the given condition`, () => {
      const input = [0, 1, 2, 3]
      const visited: number[] = []
      const actual = j.pipe(input, j.e.every(x => {
        visited.push(x)
        return x % 2 == 0
      }))
      chai.assert.isFalse(actual)
      chai.assert.sameOrderedMembers(visited, [0, 1], `Visited [${visited.join(', ')}] instead of [0, 1].`)
    })

  })

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

  describe(`findOrThrow`, () => {

    it(`returns the value of the first matching item`, () => {
      const input = ['a', 'b', 'c', 'c', 'd']
      const actual = j.pipe(input, j.e.findOrThrow(x => x == 'c'))
      const expected = 'c'
      chai.assert.equal(actual, expected)
    })

    it(`throws if no matching item is found`, () => {
      const input = ['a', 'b', 'c']
      const operation = () => j.pipe(input, j.e.findOrThrow(x => x == 'g'))
      chai.assert.throws(operation)
    })

  })

  describe(`findLast`, () => {

    it(`returns the value of the last matching item`, () => {
      const input = ['a', 'b', 'c1', 'c2', 'd']
      const actual = j.pipe(input, j.e.findLast(x => x.startsWith('c')))
      const expected = 'c2'
      chai.assert.equal(actual, expected)
    })

    it(`returns undefined when no matching item is found`, () => {
      const input = ['a', 'b', 'c']
      const actual = j.pipe(input, j.e.findLast(x => x == 'g'))
      const expected = undefined
      chai.assert.equal(actual, expected)
    })

  })

  describe(`findLastOrThrow`, () => {

    it(`returns the value of the last matching item`, () => {
      const input = ['a', 'b', 'c1', 'c2', 'd']
      const actual = j.pipe(input, j.e.findLastOrThrow(x => x.startsWith('c')))
      const expected = 'c2'
      chai.assert.equal(actual, expected)
    })

    it(`throws when no matching item is found`, () => {
      const input = ['a', 'b', 'c']
      const operation = () => j.pipe(input, j.e.findLastOrThrow(x => x == 'g'))
      chai.assert.throws(operation)
    })

  })

  describe(`findIndex`, () => {

    it(`returns the index of the first matching item`, () => {
      const input = ['a', 'b', 'c', 'c', 'd']
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

  describe(`findIndexOrThrow`, () => {

    it(`returns the index of the first matching item`, () => {
      const input = ['a', 'b', 'c', 'c', 'd']
      const actual = j.pipe(input, j.e.findIndexOrThrow(x => x == 'c'))
      const expected = 2
      chai.assert.equal(actual, expected)
    })

    it(`returns -1 when no matching item is found`, () => {
      const input = ['a', 'b', 'c']
      const operation = () => j.pipe(input, j.e.findIndexOrThrow(x => x == 'g'))
      chai.assert.throws(operation)
    })

  })

  describe(`findLastIndex`, () => {

    it(`returns the index of the last matching item`, () => {
      const input = ['a', 'b', 'c', 'c', 'd']
      const actual = j.pipe(input, j.e.findLastIndex(x => x == 'c'))
      const expected = 3
      chai.assert.equal(actual, expected)
    })

    it(`returns -1 when no matching item is found`, () => {
      const input = ['a', 'b', 'c']
      const actual = j.pipe(input, j.e.findLastIndex(x => x == 'g'))
      const expected = -1
      chai.assert.equal(actual, expected)
    })

  })

  describe(`findLastIndexOrThrow`, () => {

    it(`returns the index of the last matching item`, () => {
      const input = ['a', 'b', 'c1', 'c2', 'd']
      const actual = j.pipe(input, j.e.findLastIndexOrThrow(x => x.startsWith('c')))
      const expected = 3
      chai.assert.equal(actual, expected)
    })

    it(`throws when no matching item is found`, () => {
      const input = ['a', 'b', 'c']
      const operation = () => j.pipe(input, j.e.findLastIndexOrThrow(x => x == 'g'))
      chai.assert.throws(operation)
    })

  })

  describe(`findWithIndex`, () => {

    it(`returns the value and index of the first matching item`, () => {
      const input = ['a', 'b', 'c1', 'c2', 'd']
      const actual = j.pipe(input, j.e.findWithIndex(x => x.startsWith('c')))
      const expected = { value: 'c1', index: 2 }
      chai.assert.deepEqual(actual, expected)
    })

    it(`returns null when no matching item is found`, () => {
      const input = ['a', 'b', 'c']
      const actual = j.pipe(input, j.e.findWithIndex(x => x == 'g'))
      const expected = null
      chai.assert.deepEqual(actual, expected)
    })

  })

  describe(`findWithIndexOrThrow`, () => {

    it(`returns the value and index of the first matching item`, () => {
      const input = ['a', 'b', 'c1', 'c2', 'd']
      const actual = j.pipe(input, j.e.findWithIndexOrThrow(x => x.startsWith('c')))
      const expected = { value: 'c1', index: 2 }
      chai.assert.deepEqual(actual, expected)
    })

    it(`returns -1 when no matching item is found`, () => {
      const input = ['a', 'b', 'c']
      const operation = () => j.pipe(input, j.e.findWithIndexOrThrow(x => x == 'g'))
      chai.assert.throws(operation)
    })

  })

  describe(`findLastWithIndex`, () => {

    it(`returns the value and index of the last matching item`, () => {
      const input = ['a', 'b', 'c1', 'c2', 'd']
      const actual = j.pipe(input, j.e.findLastWithIndex(x => x.startsWith('c')))
      const expected = { value: 'c2', index: 3 }
      chai.assert.deepEqual(actual, expected)
    })

    it(`returns null when no matching item is found`, () => {
      const input = ['a', 'b', 'c']
      const actual = j.pipe(input, j.e.findLastWithIndex(x => x == 'g'))
      const expected = null
      chai.assert.deepEqual(actual, expected)
    })

  })

  describe(`findLastWithIndexOrThrow`, () => {

    it(`returns the index of the last matching item`, () => {
      const input = ['a', 'b', 'c1', 'c2', 'd']
      const actual = j.pipe(input, j.e.findLastWithIndexOrThrow(x => x.startsWith('c')))
      const expected = { value: 'c2', index: 3 }
      chai.assert.deepEqual(actual, expected)
    })

    it(`throws when no matching item is found`, () => {
      const input = ['a', 'b', 'c']
      const operation = () => j.pipe(input, j.e.findLastWithIndexOrThrow(x => x == 'g'))
      chai.assert.throws(operation)
    })

  })

  describe(`forEach`, () => {

  })

  describe(`getSingleOrThrow`, () => {

  })

  describe(`indexOf`, () => {

  })

  describe(`joinAsString`, () => {

    it(`works`, () => {
      const input = [1, 2, 3]
      const actual = j.pipe(input, j.e.joinAsString('-'))
      const expected = `1-2-3`
      chai.assert.equal(actual, expected)
    })

  })

  describe(`first`, () => {

    it(`returns the first item`, () => {
      const input = [1, 2, 3]
      const actual = j.pipe(input, j.e.first())
      const expected = 1
      chai.assert.equal(actual, expected)
    })

    it(`returns undefined when empty iterable`, () => {
      const input = [] as number[]
      const actual = j.pipe(input, j.e.first())
      chai.assert.isUndefined(actual)
    })

  })

  describe(`firstOrThrow`, () => {

    it(`returns the first item`, () => {
      const input = [1, 2, 3]
      const actual = j.pipe(input, j.e.firstOrThrow())
      const expected = 1
      chai.assert.equal(actual, expected)
    })

    it(`returns undefined when empty iterable`, () => {
      const input = [] as number[]
      const operation = () => j.pipe(input, j.e.firstOrThrow())
      chai.assert.throws(operation)
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

  describe(`minMax`, () => {

  })

  describe(`nth`, () => {

    it(`returns the nth item of the iterable`, () => {
      const input = ['a', 'b', 'c', 'd']
      const actual = j.pipe(input, j.e.nth(2))
      const expected = 'c'
      chai.assert.equal(actual, expected)
    })

    it(`returns undefined when the iterable doesn't have that many items`, () => {
      const input = ['a', 'b', 'c']
      const actual = j.pipe(input, j.e.nth(99))
      chai.assert.isUndefined(actual)
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

  describe(`size`, () => {

  })

  describe(`some`, () => {

    it(`returns true when at least one item satisfies the given condition`, () => {
      const input = [1, 2, 3, 4]
      const actual = j.pipe(input, j.e.some(x => x % 2 == 0))
      chai.assert.isTrue(actual)
    })

    it(`returns false when no item satisfies the given condition`, () => {
      const input = [1, 2, 3]
      const actual = j.pipe(input, j.e.some(x => x > 10))
      chai.assert.isFalse(actual)
    })

  })

  describe(`toArray`, () => {

  })

  describe(`toSet`, () => {

  })

  describe(`toObject`, () => {

    it(`works`, () => {
      const input: Array<readonly [string, number]> = [['a', 1], ['b', 2]]
      const actual = j.pipe(input, j.e.toObject())
      const expected = { a: 1, b: 2 }
      chai.assert.deepEqual(actual, expected)
    })

  })

})
