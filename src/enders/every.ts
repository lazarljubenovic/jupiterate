import { Ender } from '../core/types'

export function every<T> (predicate: (t: T) => boolean): Ender<T, boolean> {
  return function (iterable: Iterable<T>): boolean {
    for (const item of iterable) {
      if (predicate(item)) continue
      return false
    }
    return true
  }
}
