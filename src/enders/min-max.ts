import { Ender, Unary } from '../core/types'
import { gt, lt } from '../utils'

export function _min (iterable: Iterable<number>): number {
  return Math.min(...iterable)
}

export function _max (iterable: Iterable<number>): number {
  return Math.max(...iterable)
}

export function min (): Ender<number, number> {
  return _min
}

export function max (): Ender<number, number> {
  return _max
}

export function extremeBy<T> (compare: (a: number, b: number) => boolean) {
  return function (map: Unary<T, number>): Ender<T, T> {
    return function (iterable: Iterable<T>): T {
      let min: T | undefined
      let mappedMin: number | undefined
      for (const item of iterable) {
        const mappedItem = map(item)
        if (mappedMin == null || compare(mappedItem, mappedMin)) {
          min = item
          mappedMin = mappedItem
        }
      }
      if (min == null) {
        throw new Error(`Cannot do minBy on an empty iterable.`)
      }
      return min
    }
  }
}

// export function minBy<T> (map: Unary<T, number>): Ender<T, T> {
//   return extremeBy(lt)(map)
// }
//
// export function maxBy<T> (map: Unary<T, number>): Ender<T, T> {
//   return extremeBy(gt)(map)
// }
