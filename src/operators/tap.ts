import { Operator } from '../core/types'


export function tap<T> (fn: (t: T, index: number) => void): Operator<T, T> {
  return function *(iterable: Iterable<T>): IterableIterator<T> {
    let index = 0
    for (const item of iterable) {
      fn(item, index)
      yield item
      index++
    }
  }
}
