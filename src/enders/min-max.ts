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
      let extreme: T | undefined
      let mappedExtreme: number | undefined
      for (const item of iterable) {
        const mappedItem = map(item)
        if (mappedExtreme == null || compare(mappedItem, mappedExtreme)) {
          extreme = item
          mappedExtreme = mappedItem
        }
      }
      if (extreme == null) {
        throw new Error(`Cannot do minBy or maxBy on an empty iterable.`)
      }
      return extreme
    }
  }
}

export function minBy<T> (map: Unary<T, number>): Ender<T, T> {
  return extremeBy<T>(lt)(map)
}

export function maxBy<T> (map: Unary<T, number>): Ender<T, T> {
  return extremeBy<T>(gt)(map)
}
