/**
 * @short
 * *Reduces* yielded values to a single one by repeatedly invoking a reducer.
 *
 * @categories
 * static
 *
 * @description
 * Applies a reducer function against the accumulator and each yielded value
 * from the source iterable to reduce it to a single value. After iteration
 * is done, returns the most recently determined accumulator.
 *
 * If a seed is given, then that value will be used as the initial value for
 * the accumulator. Otherwise, the first yielded value of the source iterable
 * will be used instead.
 *
 * An empty iterable with no given seed with throw an error.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * iterable
 * Iterable<T>
 * The source iterable to be reduced.
 *
 * @parameter
 * reducer
 * (accumulator: U, value: T, index: number) => U
 * The reducer function invoked for each yielded value.
 *
 * @parameter
 * seed [optional]
 * U
 * The accumulator value to be used for the first iteration. If not given, the first
 * value itself is used as the seed, and the first iteration is skipped.
 *
 * @returns
 * U
 *
 * @example
 * const input = [1, 2, 3, 4]
 * const reducer = (a: number, b: number) => a + b
 * j.Reduce(input, reducer)
 * // => 10
 *
 * @example
 * const input = [1, 2, 3, 4]
 * const reducer = (a: number, b: number) => a + b
 * j.Reduce(input, reducer, 0)
 * // => 10
 *
 * @example
 * const reducer = (a: number, b: number) => a + b
 * j.Reduce([], reducer)
 * // (!) TypeError
 *
 * @example
 * const reducer = (a: number, b: number) => a + b
 * j.Reduce([], reducer, 0)
 * // => 0
 */
export function Reduce<T, U> (iterable: Iterable<T>, reducer: (accumulator: U, value: T, index: number) => U, seed: U): U
export function Reduce<T> (iterable: Iterable<T>, reducer: (accumulator: T, value: T, index: number) => T, seed?: T): T
export function Reduce<T> (iterable: Iterable<T>, reducer: (accumulator: T, value: any, index: number) => any, seed?: any): any {
  if (arguments.length == 2) {
    // No seed, so we must find it ourselves.
    const iterator = iterable[Symbol.iterator]()
    const seed = iterator.next()
    if (seed.done) {
      throw new TypeError(`No seed given and no items yielded from the source iterable.`)
    }
    let index = 1
    let result = seed.value
    while (true) {
      const next = iterator.next()
      if (next.done) {
        break
      }
      result = reducer(result, next.value, index++)
    }
    return result
  } else if (arguments.length == 3) {
    // Seed exists, so things are way more consistent between iterations.
    let index = 0
    let result = seed
    for (const item of iterable) {
      result = reducer(result, item, index++)
    }
    return result
  } else {
    throw new TypeError(`Unknown “reduce” signature. Please use TypeScript.`)
  }
}
