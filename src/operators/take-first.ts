import { compose } from '../core'
import { takeWhile } from './take-while'

export const takeFirst = (count: number) => compose(
  takeWhile((_, i) => i < count),
)
