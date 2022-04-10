import { Unary } from '../core/types'
import { gt, lt } from '../utils'


export function ExtremeBy<T> (iterable: Iterable<T>, map: Unary<T, number>, compare: (a: number, b: number) => boolean): T {
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

/**
 * @short
 * Get *min* yielded value, guided *by* the provided function to know what to
 * compare.
 *
 * @categories
 * static mapped
 *
 * @description
 * The function finds the minimum value among the yielded values. The values
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
 * T
 *
 * @example
 * j.MinBy(
 *   [2, 3, 9, 6],
 *   x => Math.abs(5 - x),
 * )
 * // => 6
 *
 * @example
 * j.MinBy(
 *   'jupiter',
 *   x => x.charAt(0),
 * )
 * // => 'e'
 */
export function MinBy<T> (iterable: Iterable<T>, map: Unary<T, number>): T {
  return ExtremeBy(iterable, map, lt)
}

/**
 * @short
 * Get *max* yielded value, guided *by* the provided function to know what to
 * compare.
 *
 * @categories
 * static mapped
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
 * T
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
export function MaxBy<T> (iterable: Iterable<T>, map: Unary<T, number>): T {
  return ExtremeBy(iterable, map, gt)
}

export function Min (iterable: Iterable<number>): number {
  const array = Array.from(iterable)
  if (array.length == 0) throw new Error(`Cannot find min of an empty iterable.`)
  return Math.min(...array)
}

export function Max (iterable: Iterable<number>): number {
  const array = Array.from(iterable)
  if (array.length == 0) throw new Error(`Cannot find max of an empty iterable.`)
  return Math.max(...array)
}
