import { Ender } from '../core/types'
import { identity } from '../utils'

export function sum (): Ender<number, number>
export function sum<T> (mapper?: (item: T) => number): Ender<T, number>
export function sum<T = number> (mapper?: (item: T) => number): Ender<T, number> {
  const actualMapper: (t: T) => number = mapper as any ?? identity
  return function (iterable: Iterable<T>): number {
    let sum = 0
    for (const item of iterable) {
      const mapped: number = actualMapper(item)
      sum += mapped
    }
    return sum
  }
}
