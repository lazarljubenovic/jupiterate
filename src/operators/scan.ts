import { Operator } from '../core/types'


/**
 * @short
 * Like `reduce`, but reports all intermediate results.
 *
 * @categories
 * operator
 *
 * @description
 * Applies a reducer function against the accumulator and each yielded value
 * from the source iterable to reduce it to a single value. Each time this occurs,
 * the current accumulator value is yielded from the resulting iterable.
 *
 * If a seed is given, then that value will be used as the initial value for
 * the accumulator. It won't be yielded itself; if this behavior is undesirable,
 * {@link startWith} can be used. If the seed is not given, the first yielded
 * value of the source iterable will be used instead. Unlike the explicitly
 * given seed, a seed determined in this manner _will_ be yielded by the resulting
 * iterable.
 *
 * An empty source iterable will simply be propagated as such, regardless of the
 * way the seed had been determined.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * reducer
 * (accumulator: U, item: T, index: number) => U
 * The reducer function invoked for each yielded value.
 *
 * @parameter
 * seed [optional]
 * U
 * The accumulator value to be used for the first iteration. If not given, the first
 * value itself is used as the seed, and the first iteration is skipped.
 *
 * @returns
 * Operator<T, U>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.scan((a, b) => a + b),
 * )
 * // => [1, 3, 6, 10]
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.scan((a, b) => a + b, 0),
 * )
 * // => [1, 3, 6, 10]
 *
 * @example
 * j.pipe(
 *   [],
 *   j.scan((a, b) => a + b),
 * )
 * // => []
 *
 * @example
 * j.pipe(
 *   ['one', 'two', 'three'],
 *   j.scan((result, value) => result + value.length, 0),
 * )
 * // => [3, 6, 11]
 */
export function scan<T, U> (reducer: (result: U, item: T, index: number) => U, seed: U): Operator<T, U>
export function scan<T> (reducer: (result: T, item: T, index: number) => T, seed?: T): Operator<T, T>
export function scan<T> (reducer: (result: T, item: any, index: number) => any, seed?: any): any {
  if (arguments.length == 1) {
    return function* (iterable: Iterable<T>) {
      const iterator = iterable[Symbol.iterator]()
      const seed = iterator.next()
      if (seed.done) {
        return
      }
      let index = 1
      let accumulator = seed.value
      yield accumulator
      while (true) {
        const next = iterator.next()
        if (next.done) {
          return
        }
        accumulator = reducer(accumulator, next.value, index++)
        yield accumulator
      }
    }
  } else if (arguments.length == 2) {
    return function* (iterable: Iterable<T>) {
      let index = 0
      let accumulator = seed
      for (const item of iterable) {
        accumulator = reducer(accumulator, item, index++)
        yield accumulator
      }
    }
  } else {
    throw new TypeError(`Unknown “scan” signature. Please use TypeScript.`)
  }
}
