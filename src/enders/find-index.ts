import { Ender } from '../core/types'

export function findIndex<T> (condition: (t: T, i: number) => boolean): Ender<T, number> {
  return function (iterable: Iterable<T>): number {
    let index = 0
    for (const item of iterable) {
      if (condition(item, index)) return index
      index++
    }
    return -1
  }
}
