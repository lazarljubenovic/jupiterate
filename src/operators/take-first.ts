import { compose } from '../core'
import { takeWhile } from './take-while'

export const takeFirst = <T>(count: number) => compose(
  takeWhile<T>((_, i) => i < count),
)
