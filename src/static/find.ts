/**
 * @short
 * *Find* a value according to some criteria.
 *
 * @categories
 * static
 *
 * @description
 * Check each value yielded from the iterator against the provided condition.
 * The first value which happens to satisfy the condition is returned. If the
 * iterator completes before reaching such value, `undefined` is returned.
 *
 * If the provided condition is a type guard, the value of the result will be
 * scoped accordingly.
 *
 * If you expect to find a value, you can use {@link findOrThrow}. To get
 * index of the value instead the value itself, check out {@link findIndex} or
 * {@link findIndexOrThrow}. To find multiple yielded values, use operator
 * {@link filter}.
 *
 * @operator
 * condition
 * (t: T, i: number) => boolean
 * The criteria used to find a value. A type guard is accepted as well.
 *
 * @returns
 * T | undefined
 *
 * @example
 * j.Find(
 *   [1, 2, 3, 4],
 *   x => x == 2,
 * )
 * // => 2
 *
 * @example
 * j.Find(
 *   [1, 2, 3, 4],
 *   x => x == 6,
 * )
 * // => undefined
 *
 * @example
 * j.pipe(
 *   [-2, -1, 0, 1, 2, 3],
 *   j.andFinally(j.Find, x => x > 0),
 * )
 * // => 1
 */
export function Find<T, V extends T> (iterable: Iterable<T>, guard: (t: T, i: number) => t is V): V | undefined
export function Find<T> (iterable: Iterable<T>, condition: (t: T, i: number) => boolean): T | undefined
export function Find<T> (iterable: Iterable<T>, condition: (t: T, i: number) => boolean): T | undefined {
  let index = 0
  for (const item of iterable) {
    if (condition(item, index)) return item
    index++
  }
}
