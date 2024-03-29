import { Unary } from '../core/types'
import { gt, lt } from '../utils'


function ExtremeBy<T> (
  iterable: Iterable<T>,
  project: Unary<T, number>,
  compare: (a: number, b: number) => boolean,
): T {
  let extreme: T | undefined
  let mappedExtreme: number | undefined
  for (const item of iterable) {
    const mappedItem = project(item)
    if (mappedExtreme == null || compare(mappedItem, mappedExtreme)) {
      extreme = item
      mappedExtreme = mappedItem
    }
  }
  if (extreme == null) {
    throw new Error(`Cannot do MinBy or MaxBy on an empty iterable.`)
  }
  return extreme
}

/**
 * @short
 * Get *min* yielded value, guided *by* a comparison function.
 *
 * @categories
 * static mapped
 *
 * @description
 * The function finds the minimum value among the yielded values. The values
 * are compared after being mapped via the provided function `project`.
 *
 * This is a generalization of {@link Min}.
 *
 * @parameter
 * project
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
export function MinBy<T> (iterable: Iterable<T>, project: Unary<T, number>): T {
  return ExtremeBy(iterable, project, lt)
}

/**
 * @short
 * Get *max* yielded value, guided *by* a comparison function.
 *
 * @categories
 * static mapped
 *
 * @description
 * The operator finds the maximum value among the yielded values. The values
 * are compared after being mapped via the provided function.
 *
 * This is a generalization of {@link Max}.
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
 *   j.MaxBy(x => Math.abs(5 - x))
 * )
 * // => 9
 *
 * @example
 * j.pipe(
 *   'jupiter',
 *   j.MaxBy(x => x.charAt(0)),
 * )
 * // => 't'
 */
export function MaxBy<T> (iterable: Iterable<T>, map: Unary<T, number>): T {
  return ExtremeBy(iterable, map, gt)
}

/**
 * @short
 * Get *min* yielded value
 *
 * @categories
 * static
 *
 * @description
 * The function finds the minimum value among the yielded values.
 *
 * This is a specialization of {@link MinBy}.
 *
 * @parameter
 * project
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
export function Min (iterable: Iterable<number>): number {
  const array = Array.from(iterable)
  if (array.length == 0) throw new Error(`Cannot find min of an empty iterable.`)
  return Math.min(...array)
}

/**
 * @short
 * Get *max* yielded value.
 *
 * @categories
 * static
 *
 * @description
 * The operator finds the maximum value among the yielded values.
 *
 * This is a specialization of {@link MaxBy}.
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
 *   j.MaxBy(x => Math.abs(5 - x))
 * )
 * // => 9
 *
 * @example
 * j.pipe(
 *   'jupiter',
 *   j.MaxBy(x => x.charAt(0)),
 * )
 * // => 't'
 */
export function Max (iterable: Iterable<number>): number {
  const array = Array.from(iterable)
  if (array.length == 0) throw new Error(`Cannot find max of an empty iterable.`)
  return Math.max(...array)
}
