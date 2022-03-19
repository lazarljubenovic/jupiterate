import { Ender } from '../core/types'


/**
 * @short
 * Get the *nth* yielded value.
 *
 * @categories
 * ender
 *
 * @description
 * Iterate through the values and return the nth value. If there's no value
 * at that index, `undefined` will be returned.
 *
 * @parameter
 * n
 * number
 * The n.
 *
 * @returns
 * Ender<T, T | undefined>
 *
 * @example
 * j.pipe(
 *   'jupiter',
 *   j.e.nth(0),
 * )
 * // => 'j'
 *
 * @example
 * j.pipe(
 *   'jupiter',
 *   j.e.nth(99),
 * )
 * // => undefined
 *
 * @example
 * j.pipe(
 *   'jupiter',
 *   -1,
 * )
 * // => undefined
 */
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

export function second<T> (): Ender<T, T | undefined> {
  return nth(1)
}
