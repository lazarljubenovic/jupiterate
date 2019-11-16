import { Ender, Unary } from '../core/types'
import { gt, lt } from '../utils'

function _min (iterable: Iterable<number>): number {
  return Math.min(...iterable)
}

function _max (iterable: Iterable<number>): number {
  return Math.max(...iterable)
}

/**
 * @short
 * Get *min* yielded value, guided *by* the provided function to know what to
 * compare.
 *
 * @categories
 * ender mapped
 *
 * @description
 * The ender finds the minimum value among the yielded values. The values
 * are compared after being mapped via the provided function `map`.
 *
 * If you already have an iterable of numbers that you want to compare directly
 * (i.e. if the `map` is an identity function), you can use the simpler version
 * of this operator, `min`.
 *
 * @parameter
 * map
 * (t: T) => number
 *
 * @returns
 * Ender<T, T>
 *
 * @example
 * j.pipe(
 *   [2, 3, 9, 6],
 *   j.e.minBy(x => Math.abs(5 - x))
 * )
 * // => 6
 *
 * @example
 * j.pipe(
 *   'jupiter',
 *   j.e.minBy(x => x.charAt(0)),
 * )
 * // => 'e'
 */
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

/**
 * @short
 * Get *min* yielded value, guided *by* the provided function to know what to
 * compare.
 *
 * @categories
 * ender mapped
 *
 * @description
 * The ender finds the minimum value among the yielded values. The values
 * are compared after being mapped via the provided function `map`.
 *
 * If you already have an iterable of numbers that you want to compare directly
 * (i.e. if the `map` is an identity function), you can use the simpler version
 * of this operator, `min`.
 *
 * @parameter
 * map
 * (t: T) => number
 *
 * @returns
 * Ender<T, T>
 *
 * @example
 * j.pipe(
 *   [2, 3, 9, 6],
 *   j.e.minBy(x => Math.abs(5 - x))
 * )
 * // => 6
 *
 * @example
 * j.pipe(
 *   'jupiter',
 *   j.e.minBy(x => x.charAt(0)),
 * )
 * // => 'e'
 */
export function minBy<T> (map: Unary<T, number>): Ender<T, T> {
  return extremeBy<T>(lt)(map)
}

/**
 * @short
 * Get *max* yielded value, guided *by* the provided function to know what to
 * compare.
 *
 * @categories
 * ender mapped
 *
 * @description
 * The operator finds the maximum value among the yielded values. The values
 * are compared after being mapped via the provided function.
 *
 * If you already have an iterable of numbers that you want to compare directly
 * (i.e. if the `map` is an identity function), you can use the simpler version
 * of this operator, `max`.
 *
 * @parameter
 * map
 * (t: T) => number
 *
 * @returns
 * Ender<T, T>
 *
 * @example
 * j.pipe(
 *   [2, 3, 9, 6],
 *   j.e.maxBy(x => Math.abs(5 - x))
 * )
 * // => 9
 *
 * @example
 * j.pipe(
 *   'jupiter',
 *   j.e.maxBy(x => x.charAt(0)),
 * )
 * // => 't'
 */
export function maxBy<T> (map: Unary<T, number>): Ender<T, T> {
  return extremeBy<T>(gt)(map)
}
