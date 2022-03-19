import { Operator } from '../core/types'


export function takeWhile<T, R extends T> (guard: (t: T, i: number) => t is R): Operator<T, R>
export function takeWhile<T> (predicate: (t: T, i: number) => boolean): Operator<T, T>
export function takeWhile<T> (predicate: (t: T, i: number) => boolean): Operator<T, T> {
  return function *(iterable: Iterable<T>): IterableIterator<T> {
    let index = 0
    for (const item of iterable) {
      if (predicate(item, index++)) {
        yield item
      } else {
        return
      }
    }
  }
}
