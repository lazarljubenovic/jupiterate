import { Ender } from '../core/types'

export function count<T> (): Ender<T, number> {
  return function (iterable: Iterable<T>): number {
    let count = 0
    for (const item of iterable) {
      count++
    }
    return count
  }
}
