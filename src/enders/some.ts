import { Ender } from '../core/types'

export function some<T> (predicate: (t: T) => boolean): Ender<T, boolean> {
  return function (iterable: Iterable<T>): boolean {
    for (const item of iterable) {
      if (predicate(item)) return true
    }
    return false
  }
}
