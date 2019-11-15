import { compose } from '../core'
import { takeWhile } from './take-while'

export const first = (count: number) => compose(
  takeWhile((_, i) => i < count),
)
