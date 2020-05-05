import * as chai from 'chai'
import * as j from '../src'

describe(`Generators`, () => {

  describe(`integers`, () => {

    it(`works without arguments`, () => {
      const actual = j.pipe(j.g.integers(),
        j.takeFirst(10),
      )
      const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`works with start parameter`, () => {
      const actual = j.pipe(j.g.integers(6), j.takeFirst(3))
      const expected = [6, 7, 8]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`works with start and end parameter`, () => {
      const actual = j.g.integers(6, 9)
      const expected = [6, 7, 8]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

  })

  describe(`unfold`, () => {

    it(`works with a single seed`, () => {
      const actual = j.pipe(j.g.unfold(x => x * 2, 1), j.takeFirst(8))
      const expected = [1, 2, 4, 8, 16, 32, 64, 128]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`works with two seeds`, () => {
      const actual = j.pipe(j.g.unfold((a, b) => a + b, 1, 1), j.takeFirst(8))
      const expected = [1, 1, 2, 3, 5, 8, 13, 21]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

  })

})
