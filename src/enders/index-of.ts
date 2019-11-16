import { Ender } from '../core/types'
import { findIndex } from './find-index'

export function indexOf<T> (item: T): Ender<T, number> {
  return findIndex(x => x === item)
}
