import { Ender } from '../core/types'

export function toArray<T> (): Ender<T, Array<T>> {
  return function (iterable: Iterable<T>): Array<T> {
    return Array.from(iterable)
  }
}
