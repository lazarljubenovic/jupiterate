export type GetSingleOrThrowErrorReason =
  | 'found-more-than-one'
  | 'found-zero'

export type GetSingleOrThrowErrorFactory = (reason: GetSingleOrThrowErrorReason) => Error

const DEFAULT_ERROR_FACTORY = (reason: GetSingleOrThrowErrorReason) => {
  switch (reason) {
    case 'found-more-than-one':
      return new Error(`Expected only one item, but found more than one.`)
    case 'found-zero':
      return new Error(`Expected exactly one item, but got zero.`)
  }
}

/**
 * @short
 * *Get* the only *single* value from iterable; *throw* if unexpected size.
 *
 * @categories
 * static
 *
 * @description
 * If the iterable's length is 1, its only yielded value is returned.
 * Otherwise, an Error is thrown.
 *
 * To throw custom errors, use the optional parameter.
 *
 * @returns
 * T
 *
 * @example
 * j.GetSingleOrThrow([21])
 * // => 21
 *
 * @example
 * j.GetSingleOrThrow([])
 * // => throws
 *
 * @example
 * j.GetSingleOrThrow([1, 2, 3])
 * // => throws
 */
export function GetSingleOrThrow<T> (
  iterable: Iterable<T>,
  errorFactory: GetSingleOrThrowErrorFactory = DEFAULT_ERROR_FACTORY,
): T {
  let theOnlyItem: T
  let count: number = 0
  for (const item of iterable) {
    theOnlyItem = item
    count++
    if (count > 1) {
      throw errorFactory('found-more-than-one')
    }
  }
  if (count == 0) {
    throw errorFactory('found-zero')
  }
  return theOnlyItem!
}
