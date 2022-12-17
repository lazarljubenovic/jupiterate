import * as chai from 'chai'
import * as j from '../src'


describe(`Generators`, () => {

  describe(`Integers`, () => {

    it(`works without arguments`, () => {
      const actual = j.pipe(j.Integers(),
        j.takeFirst(10),
      )
      const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`works with start parameter`, () => {
      const actual = j.pipe(j.Integers(6), j.takeFirst(3))
      const expected = [6, 7, 8]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`works with start and end parameter`, () => {
      const actual = j.Integers(6, 9)
      const expected = [6, 7, 8]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

  })

  describe(`From`, () => {

    it(`works for an array`, () => {
      const actual = j.pipe(j.From([1, 2, 3]))
      const expected = [1, 2, 3]
      chai.assert.sameOrderedMembers([...actual], [...expected])
    })

  })

  describe(`Unfold`, () => {

    it(`works with a single seed`, () => {
      const actual = j.pipe(j.Unfold(1, x => x * 2), j.takeFirst(8))
      const expected = [1, 2, 4, 8, 16, 32, 64, 128]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`works with two seeds`, () => {
      const actual = j.pipe(j.Unfold(1, 1, (a, b) => a + b), j.takeFirst(8))
      const expected = [1, 1, 2, 3, 5, 8, 13, 21]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

  })

})
