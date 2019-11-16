import { Ender } from '../core/types'

export function toSet<T> (): Ender<T, Set<T>> {
  return function (iterable: Iterable<T>): Set<T> {
    return new Set(iterable)
  }
}
