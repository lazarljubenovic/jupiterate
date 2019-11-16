import { Ender } from '../core/types'

export function nth<T> (n: number): Ender<T, T | undefined> {
  return function (iterable: Iterable<T>): T | undefined {
    let index = 0
    for (const item of iterable) {
      if (n == index) return item
      index++
    }
    return undefined
  }
}
