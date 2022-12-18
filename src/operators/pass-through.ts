import { Operator } from '../core/types'

export function passThrough<T> (): Operator<T, T> {
  return function* (iterable: Iterable<T>): IterableIterator<T> {
    yield* iterable
  }
}
