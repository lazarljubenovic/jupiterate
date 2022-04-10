/**
 * @short
 * *Find* a value according to some criteria, *or throw* if nothing is found.
 *
 * @categories
 * static or-throw
 *
 * @description
 * Check each value yielded from the iterator against the provided condition.
 * The first value which happens to satisfy the condition is returned. If the
 * iterator completes before reaching such value, an error is thrown.
 *
 * If the provided condition is a type guard, the value of the result will be
 * scoped accordingly.
 *
 * If you don't want the function to throw if no yielded value matches the given
 * criterion, you can use {@link Find}. To get an index of the value instead,
 * see {@link FindIndexOrThrow} or {@link FindIndex}. To get the last value
 * instead, see {@link FindLastOrThrow}. To find multiple yielded values, see
 * the {@link filter} operator.
 *
 * @operator
 * condition
 * (t: T, i: number) => boolean
 * The criteria used to find a value. A guard is accepted as well.
 *
 * @returns
 * T
 *
 * @example
 * j.FindOrThrow(
 *   [1, 2, 3, 4],
 *   x => x == 2,
 * )
 * // => 2
 *
 * @example
 * j.FindOrThrow(
 *   [1, 2, 3, 4],
 *   x => x == 6,
 * )
 * // => Error
 *
 * @example
 * j.FindOrThrow(
 *   [-2, -1, 0, 1, 2, 3],
 *   x => x > 0,
 * )
 * // => 1
 */
export function FindOrThrow<T, V extends T> (iterable: Iterable<T>, guard: (t: T, i: number) => t is V): V
export function FindOrThrow<T> (iterable: Iterable<T>, condition: (t: T, i: number) => boolean): T
export function FindOrThrow<T> (iterable: Iterable<T>, condition: (t: T, i: number) => boolean): T {
  let index = 0
  for (const item of iterable) {
    if (condition(item, index)) return item
    index++
  }
  throw new Error(`Value not found.`) // TODO: Allow customization of what to throw.
}
