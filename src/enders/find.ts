import { Ender } from '../core/types'

export function find<T, V extends T> (guard: (t: T, i: number) => t is V): Ender<T, V | undefined>
export function find<T> (condition: (t: T, i: number) => boolean): Ender<T, T | undefined>
export function find<T> (condition: (t: T, i: number) => boolean): Ender<T, T | undefined> {
  return function (iterable: Iterable<T>): T | undefined {
    let index = 0
    for (const item of iterable) {
      if (condition(item, index)) return item
      index++
    }
  }
}
