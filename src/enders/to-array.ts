import { Ender } from '../core/types'

export function toArray<T> (): Ender<T, Array<T>> {
  return function (iterable: Iterable<T>): Array<T> {
    return Array.from(iterable)
  }
}

export function toReadonlyArray<T> (): Ender<T, ReadonlyArray<T>> {
  return function (iterable: Iterable<T>): ReadonlyArray<T> {
    return Array.from(iterable)
  }
}
