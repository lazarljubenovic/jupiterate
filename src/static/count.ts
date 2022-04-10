import { all } from '../utils'


/**
 * @short
 * *Count* items which satisfy a condition.
 *
 * @categories
 * static trigger
 *
 * @since
 * 0.0.2
 *
 * @description
 * Returns the number of yielded items from the given iterable which satisfy the given condition.
 *
 * When no condition is given, all items are accounted for, and the function behaves exactly like {@link Size}.
 *
 * @parameter
 * iterable
 * Iterable
 * The iterable we're counting in.
 *
 * @parameter
 * predicate
 * (t: T, i: number) => boolean
 * The function applied to each yielded item, used to determine whether the item will be counted or not.
 *
 * @returns
 * number
 *
 * @example
 * j.Count([1, 2, 3])
 * // => 3
 *
 * @example
 * j.Size([])
 * // => 0
 *
 * @example
 * j.Size(j.Integers())
 * // infinite loop
 */
export function Count<T> (
  iterable: Iterable<T>,
  predicate: (item: T, index: number) => boolean = all,
): number {
  let count = 0
  let index = 0
  for (const item of iterable) {
    if (predicate(item, index++)) {
      count++
    }
  }
  return count
}
