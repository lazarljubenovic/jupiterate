import { Operator } from '../core/types'

export function tap<T> (fn: (t: T) => void): Operator<T, T> {
  return function* (iterable: Iterable<T>): Iterable<T> {
    for (const item of iterable) {
      fn(item)
      yield item
    }
  }
}
