import { Operator } from '../core/types'


/**
 * @short
 * *Flattens* the iterable after *mapping*.
 *
 * @categories
 * operator
 *
 * @description
 * The given function takes a value as an argument, and returns an iterable. Instead of simply yielding this “inner
 * iterable”, the values of this iterable itself are iterated over.
 *
 * One way to look at it is to say that `flatMap` allows you to project a single value into multiple values, but
 * without making the structure of the iterable more complex. In other words, the values are “freed” from the iterable
 * they are packed into after passing being projected.
 *
 * This is a similar behavior as `Array#flatMap`.
 *
 * @sine
 * 0.0.1
 *
 * @parameter
 * project
 * (t: T, index: number) => Iterable<U>
 *
 * @returns
 * Operator<T, U>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3]
 *   j.flatMap(t => [t, t])
 * )
 * // => [1, 1, 2, 2, 3, 3]
 *
 * @example
 * j.pipe(
 *   'yes! no!',
 *   j.flatMap(t => t == '!' ? [] : [t, t, t])
 * )
 * // => 'yyyeeesss   nnnooo'
 *
 * @example
 * j.pipe(
 *   [1, 2, 3],
 *   j.flatMap(t => [t - 1, t + 1]),
 * )
 * // => [0, 2, 1, 3, 2, 4]
 *
 * @example
 * j.pipe(
 *   [10, 20],
 *   j.flatMap(t => [1, 2, t]),
 * )
 * // => [1, 2, 10, 1, 2, 20]
 */
export function flatMap<T, U> (project: (t: T, index: number) => Iterable<U>): Operator<T, U> {
  return function *(iterable: Iterable<T>): IterableIterator<U> {
    let index = 0
    for (const item of iterable) {
      yield *project(item, index++)
    }
  }
}
