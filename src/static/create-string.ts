/**
 * @short
 * *Create a string* from an iterable of strings.
 *
 * @categories
 * static
 *
 * @description
 * Creates a string from the source iterable.
 *
 * @returns
 * string
 *
 * @example
 * j.CreateString(['a', 'b', 'c'])
 * // => 'abc'
 */
export function CreateString (iterable: Iterable<string>): string {
  let result = ''
  for (const value of iterable) {
    result += value
  }
  return result
}
