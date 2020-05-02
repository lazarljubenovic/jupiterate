import { Operator } from '../core/types'

export function concat<T> (...otherIterables: Array<Iterable<T>>): Operator<T, T> {
  return function* (iterable: Iterable<T>): Iterable<T> {
    yield* iterable
    for (const otherIterable of otherIterables) {
      yield* otherIterable
    }
  }
}
