import { Ender } from '../core/types'

export function forEach<T> (fn: (t: T) => void): Ender<T, Iterable<T>> {
  return function (iterable: Iterable<T>): Iterable<T> {
    for (const item of iterable) {
      fn(item)
    }
    return iterable
  }
}
