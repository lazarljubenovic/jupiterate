import { Operator } from '../core/types'


export interface PairOptions {
  withRepetition?: boolean
  orderImportant?: boolean
}

/**
 * @short
 * Collect values into all possible *pairs*.
 *
 * @categories
 * trigger
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
 * Determines if Pairs should be treated as ordered Pairs or sets.
 * When true, Pairs will be repeated in a different order. When false, no two Pairs
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
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.pairs(),
 * )
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
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.pairs({ withRepetition: true }),
 * )
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
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.pairs({ orderImportant: true }),
 * )
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
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.pairs({ orderImportant: true, withRepetition: true }),
 * )
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
export function pairs<T> (
  { orderImportant = false, withRepetition = false }: PairOptions = {},
): Operator<T, [T, T]> {
  return function *(iterable: Iterable<T>): IterableIterator<[T, T]> {
    const array = Array.from(iterable)
    if (orderImportant && !withRepetition) {
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
          if (i == j) continue
          yield [array[i], array[j]]
        }
      }
      return
    }
    for (let i = 0; i < array.length; i++) {
      const start = orderImportant ? 0 : withRepetition ? i : i + 1
      for (let j = start; j < array.length; j++) {
        yield [array[i], array[j]]
      }
    }
  }
}
