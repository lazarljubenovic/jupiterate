import { Ender } from '../core/types'

/**
 * @short
 * *Find* a value according to some criteria, *or throw* if nothing is found.
 *
 * @categories
 * ender or-throw
 *
 * @description
 * Check each value yielded from the iterator against the provided condition.
 * The first value which happens to satisfy the condition is returned. If the
 * iterator completes before reaching such value, an error is thrown.
 *
 * If the provided condition is a type guard, the value of the result will be
 * scoped accordingly.
 *
 * If you don't want the ender to throw if no yielded value matches the given
 * criterion, you can use {@link find}. To get an index of the value instead,
 * see {@link findIndexOrThrow} or {@link findIndex}. To find multiple yielded
 * values, use operator {@link filter}.
 *
 * @operator
 * condition
 * (t: T, i: number) => boolean
 * The criteria used to find a value. A guard is accepted as well.
 *
 * @returns
 * Ender<T, T | undefined>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.e.find(x => x == 2),
 * )
 * // => 2
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.e.find(x => x == 6),
 * )
 * // => Error
 *
 * @example
 * j.pipe(
 *   [-2, -1, 0, 1, 2, 3],
 *   j.e.find(x => x > 0),
 * )
 * // => 1
 */
export function findOrThrow<T, V extends T> (guard: (t: T, i: number) => t is V): Ender<T, V>
export function findOrThrow<T> (condition: (t: T, i: number) => boolean): Ender<T, T>
export function findOrThrow<T> (condition: (t: T, i: number) => boolean): Ender<T, T> {
  return function (iterable: Iterable<T>): T {
    let index = 0
    for (const item of iterable) {
      if (condition(item, index)) return item
      index++
    }
    throw new Error(`Value not found.`) // TODO: Allow customization of what to throw.
  }
}
