/**
 * @short
 * Creates an *empty* iterable.
 *
 * @categories
 * static generator
 *
 * @description
 * Creates an iterable which completes without yielding any value.
 *
 * @returns
 * Iterable<T>
 *
 * @example
 * j.Empty()
 * // => []
 */
export function *Empty<T> (): Iterable<T> {
}
