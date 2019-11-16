import * as chai from 'chai'
import * as j from '../src'

describe(`compose`, () => {

  it(`works with no functions`, () => {
    const composed = j.compose()
    chai.assert.equal(composed('a'), 'a')
  })

  it(`works with one function`, () => {
    const inc = (x: number) => x + 1
    const composed = j.compose(inc)
    chai.assert.equal(composed(2), 3)
  })

  it(`works with two functions`, () => {
    const inc = (x: number) => x + 1
    const double = (x: number) => x * 2
    const composed = j.compose(inc, double)
    chai.assert.equal(composed(5), 12)
  })

})
