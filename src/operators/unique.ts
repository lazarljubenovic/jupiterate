import { Eq, Operator, Unary } from '../core/types'
import { compareBy, identity, qqq } from '../utils'

// TODO: eq is not used, fix this.
export function uniqueWith<T> (eq: Eq<T>): Operator<T, T> {
  return function* (iterable: Iterable<T>): Iterable<T> {
    const prevItems = new Set<T>()
    for (const item of iterable) {
      if (prevItems.has(item)) {
        prevItems.add(item)
        continue
      }
      prevItems.add(item)
      yield item
    }
  }
}

export function uniqueBy<T> (map: Unary<T, any>): Operator<T, T> {
  return uniqueWith(compareBy(map, qqq))
}

const _unique = uniqueBy(identity)

export function unique<T> (): Operator<T, T> {
  return _unique
}
