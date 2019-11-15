import { j } from '../src'
import * as chai from 'chai'

describe(`Generators`, () => {

  describe(`naturalNumbers`, () => {

    it(`works without arguments`, () => {
      const actual = j.pipe(j.g.integers(),
        j.first(10)
      )
      const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`works with start parameter`, () => {
      const actual = j.pipe(j.g.integers(6), j.first(3))
      const expected = [6, 7, 8]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

    it(`works with start and end parameter`, () => {
      const actual = j.g.integers(6, 9)
      const expected = [6, 7, 8]
      chai.assert.sameOrderedMembers([...actual], expected)
    })

  })

})
