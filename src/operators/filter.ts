import { Operator } from '../core/types'

export function filter<T, R extends T> (guard: (t: T, i: number) => t is R): Operator<T, R>
export function filter<T> (predicate: (t: T, i: number) => boolean): Operator<T, T>
export function filter<T> (predicate: (t: T, i: number) => boolean): Operator<T, T> {
  return function* (iterable: Iterable<T>): IterableIterator<T> {
    let i = 0
    for (const item of iterable) {
      if (predicate(item, i++)) {
        yield item
      }
    }
  }
}
