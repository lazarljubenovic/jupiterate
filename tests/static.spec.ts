import * as chai from 'chai'
import * as j from '../src'


describe(`Static`, () => {

  // describe(`areDisjoint`, () => {
  //
  //   describe(`on a single iterable`, () => {
  //
  //     it(`says “yes” for an empty iterable`, () => {
  //       const input = [] as unknown[]
  //       const actual = j.s.areDisjoint(input)
  //       chai.assert.isTrue(actual)
  //     })
  //
  //     it(`says “no” for a non-empty iterable`, () => {
  //       const input = [1, 2, 3]
  //       const actual = j.s.areDisjoint(input)
  //       chai.assert.isFalse(actual)
  //     })
  //
  //   })
  //
  //   describe(`on two iterables`, () => {
  //
  //     it(`says “no” when there's an overlap`, () => {
  //       const a = [1, 2, 3]
  //       const b = [2, 3, 4]
  //       const actual = j.s.areDisjoint(a, b)
  //       chai.assert.isFalse(actual)
  //     })
  //
  //     it(`says “yes” when there's no overlap`, () => {
  //       const a = [1, 2, 3]
  //       const b = [10, 20, 30]
  //       const actual = j.s.areDisjoint(a, b)
  //       chai.assert.isTrue(actual)
  //     })
  //
  //   })
  //
  //   describe(`on three iterables`, () => {
  //
  //     it(`says “no” when there's an overlap between all of them`, () => {
  //       const a = [1, 2, 3, 4]
  //       const b = [2, 3, 4, 5]
  //       const c = [3, 4, 5, 6]
  //       const actual = j.s.areDisjoint(a, b, c)
  //       chai.assert.isFalse(actual)
  //     })
  //
  //     it(`says “no” when there's an overlap only between two of them`, () => {
  //       const a = [1, 2, 3, 4]
  //       const b = [10, 20, 30, 40]
  //       const c = [4, 5, 6, 7]
  //       const actual = j.s.areDisjoint(a, b, c)
  //       chai.assert.isFalse(actual)
  //     })
  //
  //     it(`says “yes” when there's no overlap`, () => {
  //       const a = [1, 2, 3, 4]
  //       const b = [10, 20, 30, 40]
  //       const c = [100, 200, 300, 400]
  //       const actual = j.s.areDisjoint(a, b, c)
  //       chai.assert.isTrue(actual)
  //     })
  //
  //   })
  //
  // })

  describe(`concat`, () => {

    it(`concatenates several empty iterables`, () => {
      const actual = j.s.concat([], [], [], [])
      const expected = [] as unknown[]
      chai.assert.sameOrderedMembers([...actual], [...expected])
    })

    it(`concatenates several iterables`, () => {
      const actual = j.s.concat([1, 2, 3], [4, 5], [6], [], [7], [8, 9])
      const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      chai.assert.sameOrderedMembers([...actual], [...expected])
    })

    it(`returns an empty iterable when no iterables are given`, () => {
      const actual = j.s.concat()
      const expected = [] as unknown[]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

  })

  describe(`just`, () => {

    it(`creates an iterable from a single value`, () => {
      const actual = j.s.just(21)
      const expected = [21]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

  })

  describe(`size`, () => {

    it(`works`, () => {
      const actual = j.s.size([1, 2, 3])
      const expected = 3
      chai.assert.equal(actual, expected)
    })

  })

  describe(`union`, () => {

    it(`returns an empty iterator when none is given`, () => {
      const actual = j.s.union()
      const expected = [] as unknown[]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`returns an empty iterator when an empty one is given`, () => {
      const actual = j.s.union([])
      const expected = [] as unknown[]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`returns an empty iterator when several empty ones are given`, () => {
      const actual = j.s.union([], [], [])
      const expected = [] as unknown[]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`returns the same iterator when only one is given`, () => {
      const actual = j.s.union([1, 2, 3])
      const expected = [1, 2, 3]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`removes duplicates from two non-disjunct iterators`, () => {
      const actual = j.s.union([1, 2, 3], [2, 3, 4])
      const expected = [1, 2, 3, 4]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

  })

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
