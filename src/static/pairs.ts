export interface PairOptions {
  withRepetition?: boolean
  orderImportant?: boolean
}

/**
 * @short
 * Collect values into *pairs*.
 *
 * @categories
 * static trigger
 *
 * @since
 * 0.0.1
 *
 * @description
 * Collects yielded values from an iterable into pairs.
 *
 * By default, two pairs whose values are swapped (eg. [1, 2] and [2, 1]) are
 * considered equivalent, and hence only one is included in the resulting
 * iterable. This can be changed by setting `pairOptions.orderImportant` to
 * `true`.
 *
 * By default, pairs where both items are made of a single value (eg. [1, 1])
 * are discarded. They can be included by setting `pairOptions.withRepetition`
 * to `true`.
 *
 * @parameter
 * iterable
 * Iterable<T>
 * The iterable to apply to static operator on.
 *
 * @parameter
 * pairOptions.orderImportant
 * boolean
 * Determines if pairs should be treated as ordered pairs or sets.
 * When true, pairs will be repeated in a different order. When false, no two pairs
 * will have the same items.
 *
 * @parameter
 * pairOptions.withRepetition
 * boolean
 * When set to true, repeating the same element in the pair is allowed.
 *
 * @returns
 * Iterable<[T, T]>
 *
 * @example
 * const opts = {
 *   orderImportant: false,
 *   withRepetition: false,
 * }
 * const it = [1, 2, 3, 4]
 * j.s.pairs(it, opts)
 * // => [
 * //   [1, 2],
 * //   [1, 3],
 * //   [1, 4],
 * //   [2, 3],
 * //   [2, 4],
 * //   [3, 4],
 * // ]
 *
 * @example
 * const opts = {
 *   orderImportant: false,
 *   withRepetition: true,
 * }
 * const it = [1, 2, 3, 4]
 * j.s.pairs(it, opts)
 * // => [
 * //   [1, 1],
 * //   [1, 2],
 * //   [1, 3],
 * //   [1, 4],
 * //   [2, 2],
 * //   [2, 3],
 * //   [2, 4],
 * //   [3, 3],
 * //   [3, 4],
 * //   [4, 4],
 * // ]
 *
 * @example
 * const opts = {
 *   orderImportant: true,
 *   withRepetition: false,
 * }
 * const it = [1, 2, 3, 4]
 * j.s.pairs(it, opts)
 * // => [
 * //   [1, 2],
 * //   [1, 3],
 * //   [1, 4],
 * //   [2, 1],
 * //   [2, 3],
 * //   [2, 4],
 * //   [3, 1],
 * //   [3, 2],
 * //   [3, 4],
 * //   [4, 1],
 * //   [4, 2],
 * //   [4, 3],
 * // ]
 *
 * @example
 * const opts = {
 *   orderImportant: true,
 *   withRepetition: true,
 * }
 * const it = [1, 2, 3, 4]
 * j.s.pairs(it, opts)
 * // => [
 * //   [1, 1],
 * //   [1, 2],
 * //   [1, 3],
 * //   [1, 4],
 * //   [2, 1],
 * //   [2, 2],
 * //   [2, 3],
 * //   [2, 4],
 * //   [3, 1],
 * //   [3, 2],
 * //   [3, 3],
 * //   [3, 4],
 * //   [4, 1],
 * //   [4, 2],
 * //   [4, 3],
 * //   [4, 4],
 * // ]
 */
export function *pairs<T> (
  iterable: Iterable<T>,
  { orderImportant, withRepetition }: PairOptions = {},
): Iterable<[T, T]> {
  const arr = Array.from(iterable)
  if (orderImportant && !withRepetition) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (i == j) continue
        yield [arr[i], arr[j]]
      }
    }
    return
  }
  for (let i = 0; i < arr.length; i++) {
    const start = orderImportant ? 0 : withRepetition ? i : i + 1
    for (let j = start; j < arr.length; j++) {
      yield [arr[i], arr[j]]
    }
  }
}
