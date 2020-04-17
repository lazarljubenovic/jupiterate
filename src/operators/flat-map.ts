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
 * One way to look at it is to say that `flatMap` allows you to `map` a single value into multiple values, but without
 * making the structure of the iterable more complex.
 *
 * This is similar to `Array#flatMap`.
 *
 * @sine
 * 0.0.1
 *
 * @argument
 * fn
 * (t: T) => Iterable<U>
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
 */
export function flatMap<T, U> (fn: (t: T) => Iterable<U>): Operator<T, U> {
  return function* (iterable: Iterable<T>): Iterable<U> {
    for (const item of iterable) {
      yield* fn(item)
    }
  }
}
