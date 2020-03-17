import { Ender } from '../core/types'

export function contains<T> (condition: (t: T, i: number) => boolean): Ender<T, boolean> {
  return function (iterable: Iterable<T>): boolean {
    let index = 0
    for (const item of iterable) {
      if (condition(item, index)) return true
      index++
    }
    return false
  }
}
