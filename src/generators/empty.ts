/**
 * @short
 * Creates an *empty* iterable.
 *
 * @categories
 * generator
 *
 * @description
 * Creates an iterable which completes without yielding any value.
 *
 * @returns
 * Iterable<T>
 *
 * @example
 * j.g.empty()
 * // => []
 */
export function* empty<T> (): Iterable<T> {
}
