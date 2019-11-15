import { Operator } from '../core/types'

export function skipUntil<T> (predicate: (t: T, i: number) => boolean): Operator<T, T> {
  return function* (iterable: Iterable<T>): IterableIterator<T> {
    let index = 0
    let isFound = false
    for (const item of iterable) {
      if (isFound) {
        yield item
      } else {
        if (predicate(item, index++)) {
          isFound = true
          yield item
        }
      }
    }
  }
}
