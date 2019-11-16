import { Operator } from '../core/types'

export function map<T, V> (mapper: (item: T) => V): Operator<T, V> {
  return function* (iterable: Iterable<T>): IterableIterator<V> {
    for (const item of iterable) {
      yield mapper(item)
    }
  }
}
