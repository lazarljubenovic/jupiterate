/**
 * @short
 * Perform an operation *for each* yielded value.
 *
 * @categories
 * static
 *
 * @description
 * Perform the given function for each value yielded from the given iterable.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * iterable
 * Iterable<T>
 * An iterable to iterate over.
 *
 * @parameter
 * fn
 * (item: T, index: number) => void
 * A function to be performed for each yielded value. The first argument is the
 * yielded value, and the second argument is its zero-based index.
 *
 * @returns
 * void
 *
 * @example
 * j.ForEach([1, 2, 3], console.log)
 * // => void
 */
export function ForEach<T> (iterable: Iterable<T>, fn: (item: T, index: number) => void): void {
  let index: number = 0
  for (const item of iterable) {
    fn(item, index++)
  }
}
