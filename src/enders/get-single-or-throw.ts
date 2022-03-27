import { Ender } from '../core/types'
import { getSingleOrThrow as staticGetSingleOrThrow, GetSingleOrThrowErrorFactory } from '../static/get-single-or-throw'


/**
 * @short
 * *Get* the only *single* value from iterable; *throw* if unexpected size.
 *
 * @categories
 * ender has-static-version
 *
 * @description
 * If the iterable's length is 1, its only yielded value is returned.
 * Otherwise, an Error is thrown.
 *
 * To throw custom errors, use the optional parameter.
 *
 * @returns
 * Ender<T, T>
 *
 * @example
 * j.pipe(
 *   [21],
 *   j.e.getSingleOrThrow(),
 * )
 * // => 21
 *
 * @example
 * j.pipe(
 *   [],
 *   j.e.getSingleOrThrow(),
 * )
 * // => throws
 *
 * @example
 * j.pipe(
 *   [1, 2, 3],
 *   j.e.getSingleOrThrow(),
 * )
 * // => throws
 */
export function getSingleOrThrow<T> (
  errorFactory?: GetSingleOrThrowErrorFactory,
): Ender<T, T> {
  return iterable => staticGetSingleOrThrow(iterable, errorFactory)
}
