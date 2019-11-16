import { Operator } from '../core/types'

export function flatMap<T, U> (fn: (t: T) => Iterable<U>): Operator<T, U> {
  return function* (iterable: Iterable<T>): Iterable<U> {
    for (const item of iterable) {
      yield* fn(item)
    }
  }
}
